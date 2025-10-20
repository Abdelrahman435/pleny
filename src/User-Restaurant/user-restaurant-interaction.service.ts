import { Injectable } from '@nestjs/common';
import { AddFollowDto } from './dto/add_interaction.dto';
import {
  UserRestaurant,
  UserRestaurantDocument,
} from './entities/user-restaurant.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRestaurantService {
  constructor(
    @InjectModel(UserRestaurant.name)
    private userRestaurantModel: Model<UserRestaurantDocument>,
  ) {}
  addFollow(addFollowDto: AddFollowDto): Promise<UserRestaurantDocument> {
    const newRestaurant = new this.userRestaurantModel({
      ...addFollowDto,
    });
    return newRestaurant.save();
  }

  findAll() {
    return `This action returns all userRestaurant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRestaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRestaurant`;
  }
}
