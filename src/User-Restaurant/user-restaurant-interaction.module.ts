import { Module } from '@nestjs/common';
import { UserRestaurantService } from './user-restaurant-interaction.service';
import { UserRestaurantController } from './user-restaurant-interaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserRestaurant,
  UserRestaurantSchema,
} from './entities/user-restaurant.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserRestaurant.name, schema: UserRestaurantSchema },
    ]),
  ],
  controllers: [UserRestaurantController],
  providers: [UserRestaurantService],
})
export class UserRestaurantModule {}
