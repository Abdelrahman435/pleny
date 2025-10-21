import { Controller, Post, Param } from '@nestjs/common';
import { UserRestaurantService } from './user-restaurant-interaction.service';
import { AddFollowDto } from './dto/add_interaction.dto';

@Controller('interaction')
export class UserRestaurantController {
  constructor(private readonly userRestaurantService: UserRestaurantService) {}

  @Post('follow/:userId/:restaurantId')
  createFollow(
    @Param('userId') userId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    const addFollowDto: AddFollowDto = {
      userId,
      restaurantId,
    };
    return this.userRestaurantService.addFollow(addFollowDto);
  }
}
