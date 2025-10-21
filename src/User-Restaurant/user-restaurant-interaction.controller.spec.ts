import { Test, TestingModule } from '@nestjs/testing';
import { UserRestaurantController } from './user-restaurant-interaction.controller.js';
import { UserRestaurantService } from './user-restaurant-interaction.service.js';

describe('UserRestaurantController', () => {
  let controller: UserRestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRestaurantController],
      providers: [UserRestaurantService],
    }).compile();

    controller = module.get<UserRestaurantController>(UserRestaurantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
