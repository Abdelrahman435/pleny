import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindNearbyDto {
  @ApiProperty({
    description: 'User latitude (required for distance calculation)',
    example: 30.0444,
  })
  @IsNotEmpty()
  @IsLatitude()
  @Type(() => Number)
  latitude: number;

  @ApiProperty({
    description: 'User longitude (required for distance calculation)',
    example: 31.2357,
  })
  @IsNotEmpty()
  @IsLongitude()
  @Type(() => Number)
  longitude: number;
}
