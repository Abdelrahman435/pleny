import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddFollowDto {
  @ApiProperty({
    description: 'The MongoDB ObjectId of the user who is following.',
    example: '650e64b4c7320f7190e3f019',
  })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @ApiProperty({
    description: 'The MongoDB ObjectId of the restaurant being followed.',
    example: '65a45b12d87e0c4a9f3b2d1c',
  })
  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string;
}
