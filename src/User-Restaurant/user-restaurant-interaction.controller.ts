import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.userRestaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRestaurantService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRestaurantService.remove(+id);
  }
}
