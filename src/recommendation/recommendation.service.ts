import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModelStatic } from '../user/entities/user.entity';
import {
  UserRestaurant,
  UserRestaurantModel,
} from '../User-Restaurant/entities/user-restaurant.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User> & UserModelStatic,
    @InjectModel(UserRestaurant.name)
    private readonly userRestaurantModel: Model<UserRestaurant> &
      UserRestaurantModel,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async getRecommendations(userId: string) {
    const user = await this.userModel.findById(userId).lean();
    if (!user) throw new NotFoundException('User not found');

    const similarUsers = await this.userModel.findSimilarUsers(
      userId,
      user.favoriteCuisines,
    );
    const similarUserIds = similarUsers.map((u: any) => u._id.toString());

    const recommendedRestaurants =
      await this.userRestaurantModel.getRecommendedRestaurants(similarUserIds);

    return { similarUsers, recommendedRestaurants };
  }
}
