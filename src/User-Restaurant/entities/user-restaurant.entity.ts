import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

export type UserRestaurantDocument = UserRestaurant & Document;

@Schema({
  timestamps: true,
})
export class UserRestaurant {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurantId: Types.ObjectId;
}
export interface UserRestaurantModel extends Model<UserRestaurantDocument> {
  getRecommendedRestaurants(similarUserIds: string[]): Promise<any[]>;
}

export const UserRestaurantSchema =
  SchemaFactory.createForClass(UserRestaurant);

UserRestaurantSchema.index({ userId: 1, restaurantId: 1 }, { unique: true });

UserRestaurantSchema.statics.getRecommendedRestaurants = async function (
  similarUserIds: string[],
) {
  const result = await this.aggregate([
    {
      $addFields: {
        restaurantObjectId: {
          $convert: {
            input: '$restaurantId',
            to: 'objectId',
            onError: null,
            onNull: null,
          },
        },
      },
    },
    {
      $match: {
        userId: { $in: similarUserIds.map(String) },
      },
    },
    {
      $group: {
        _id: '$restaurantObjectId',
        followersCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'restaurants',
        localField: '_id',
        foreignField: '_id',
        as: 'restaurant',
      },
    },
    { $unwind: '$restaurant' },
    {
      $project: {
        _id: 0,
        restaurantId: '$_id',
        followersCount: 1,
        nameEn: '$restaurant.nameEn',
        nameAr: '$restaurant.nameAr',
        cuisines: '$restaurant.cuisines',
        location: '$restaurant.location',
      },
    },
    { $sort: { followersCount: -1 } },
  ]);
  return result;
};
