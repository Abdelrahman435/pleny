import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { RelationshipModule } from './relationship/relationship.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
  imports: [RestaurantModule, UserModule, RelationshipModule, RecommendationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
