import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  @ApiQuery({
    name: 'cuisine',
    type: String,
    required: false,
    description: 'Optional filter by cuisine',
  })
  findAll(@Query('cuisine') cuisine?: string) {
    return this.restaurantService.findAll(cuisine);
  }

  @Get('unique/:unique')
  findOne(@Param('unique') unique: string) {
    return this.restaurantService.findOne(unique);
  }

  @Get('nearby')
  @ApiQuery({ name: 'lat', required: true, description: 'Latitude' })
  @ApiQuery({ name: 'lng', required: true, description: 'Longitude' })
  async findNearby(@Query('lat') lat: number, @Query('lng') lng: number) {
    return this.restaurantService.findNearby(lat, lng);
  }
}
