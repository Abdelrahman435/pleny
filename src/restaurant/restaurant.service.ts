import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import {
  Restaurant,
  RestaurantDocument,
  RestaurantModel,
} from './entities/restaurant.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { FindNearbyDto } from './dto/find-nearby.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument> & RestaurantModel,
  ) {}
  async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<RestaurantDocument> {
    const newRestaurant = new this.restaurantModel({
      nameAr: createRestaurantDto.nameAr,
      nameEn: createRestaurantDto.nameEn,
      slugName: createRestaurantDto.slugName,
      cuisines: createRestaurantDto.cuisines,
      location: {
        type: createRestaurantDto.location.type,
        coordinates: createRestaurantDto.location.coordinates,
      },
    });

    return newRestaurant.save();
  }

  findAll(cuisine?: string) {
    const query: any = {};
    if (cuisine) {
      query.cuisines = cuisine;
    }
    return this.restaurantModel.find(query).exec();
  }

  async findOne(unique: string) {
    let restaurant: RestaurantDocument;

    if (unique.match(/^[0-9a-fA-F]{24}$/)) {
      restaurant = await this.restaurantModel.findById(unique).exec();
    } else {
      restaurant = await this.restaurantModel
        .findOne({ slugName: unique })
        .exec();
    }
    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with identifier ${unique} not found`,
      );
    }
    return restaurant;
  }

  async findNearby(lat: number, lng: number) {
    return this.restaurantModel.getNearbyRestaurants(lat, lng, 1000);
  }
}
