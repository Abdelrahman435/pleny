import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop({ required: true })
  nameAr: string;

  @Prop({ required: true })
  nameEn: string;

  @Prop({ required: true, unique: true, index: true })
  slugName: string;

  @Prop({
    required: true,
    type: [String],
    validate: [
      (v: string[]) => v.length >= 1 && v.length <= 3,
      'Restaurant must have between 1 and 3 cuisines',
    ],
  })
  cuisines: string[];

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };
}

export interface RestaurantModel extends Model<RestaurantDocument> {
  getNearbyRestaurants(
    lng: number,
    lat: number,
    maxDistance: number,
  ): Promise<Restaurant[]>;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({ location: '2dsphere' });
RestaurantSchema.index({ slugName: 1 });

RestaurantSchema.statics.getNearbyRestaurants = async function (
  latitude: number,
  longitude: number,
  maxDistance: number,
) {
  return this.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], maxDistance],
      },
    },
  })
    .select('_id nameEn nameAr cuisines location')
    .lean();
};
