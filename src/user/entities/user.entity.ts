import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, type: [String], trim: true })
  favoriteCuisines: string[];
}

export interface UserModelStatic extends Model<User> {
  findSimilarUsers(
    targetUserId: string,
    favoriteCuisines: string[],
  ): Promise<
    { _id: Types.ObjectId; fullName: string; favoriteCuisines: string[] }[]
  >;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.statics.findSimilarUsers = async function (
  targetUserId: string,
  favoriteCuisines: string[],
) {
  const users = await this.find({
    _id: { $ne: targetUserId },
    favoriteCuisines: { $in: favoriteCuisines },
  })
    .select('fullName favoriteCuisines')
    .lean();

  return users as {
    _id: string;
    fullName: string;
    favoriteCuisines: string[];
  }[];
};
