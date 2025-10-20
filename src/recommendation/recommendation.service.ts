import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { UserRestaurant } from '../User-Restaurant/entities/user-restaurant.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(UserRestaurant.name)
    private readonly userRestaurantModel: Model<UserRestaurant>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async getRecommendations(userId: string) {
    const targetUserId = new Types.ObjectId(userId);

    //1) Get target user
    const targetUser = await this.userModel.findById(targetUserId).lean();
    if (!targetUser) throw new NotFoundException(`User ${userId} not found`);

    //2) Find similar users based on favorite cuisines
    const similarUsers = await this.userModel
      .find({
        _id: { $ne: targetUserId },
        favoriteCuisines: { $in: targetUser.favoriteCuisines },
      })
      .select('fullName favoriteCuisines')
      .lean();

    if (similarUsers.length === 0)
      return { similarUsers: [], recommendedRestaurants: [] };

    //3) Get User-Restaurant interactions of similar users
    const similarUserIds = similarUsers.map((u) => u._id.toString());

    const allUserRestaurants = await this.userRestaurantModel.find().lean();

    // Filter interactions to those by similar users
    const followedBySimilar = allUserRestaurants.filter((ur) =>
      similarUserIds.includes(ur.userId.toString()),
    );

    //4) Get User-Restaurant interactions of target user
    const followedByTarget = allUserRestaurants.filter(
      (ur) => ur.userId.toString() === targetUserId.toString(),
    );

    const targetRestaurantIds = new Set(
      followedByTarget.map((r) => r.restaurantId.toString()),
    );

    //5) Recommend restaurants followed by similar users that target user hasn't followed yet
    const restaurantIdsToRecommend = [
      ...new Set(
        followedBySimilar
          .map((r) => r.restaurantId.toString())
          .filter((id) => !targetRestaurantIds.has(id)),
      ),
    ];

    if (restaurantIdsToRecommend.length === 0)
      return { similarUsers, recommendedRestaurants: [] };

    //6) Fetch restaurant details
    const recommendedRestaurants = await this.restaurantModel
      .find({
        _id: {
          $in: restaurantIdsToRecommend.map((id) => new Types.ObjectId(id)),
        },
      })
      .select('nameEn nameAr cuisines slugName')
      .lean();

    return { similarUsers, recommendedRestaurants };
  }
}
