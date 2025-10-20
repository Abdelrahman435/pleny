import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

export const UserRestaurantSchema =
  SchemaFactory.createForClass(UserRestaurant);

UserRestaurantSchema.index({ userId: 1, restaurantId: 1 }, { unique: true });
