import { Test, TestingModule } from '@nestjs/testing';
import { UserRestaurantService } from './user-restaurant.service';

describe('UserRestaurantService', () => {
  let service: UserRestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRestaurantService],
    }).compile();

    service = module.get<UserRestaurantService>(UserRestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
