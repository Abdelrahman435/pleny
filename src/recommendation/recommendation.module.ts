import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import {
  UserRestaurant,
  UserRestaurantSchema,
} from 'src/User-Restaurant/entities/user-restaurant.entity';
import {
  Restaurant,
  RestaurantSchema,
} from 'src/restaurant/entities/restaurant.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserRestaurant.name, schema: UserRestaurantSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
