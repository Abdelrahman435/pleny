import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { IsMongoIdPipe } from 'src/pipes/is-mongo-id.pipe';
@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':userId')
  async findAll(@Param('userId', IsMongoIdPipe) userId: string): Promise<any> {
    return await this.recommendationService.getRecommendations(userId);
  }
}
