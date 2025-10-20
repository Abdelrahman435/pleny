// File: src/restaurant/dto/find-nearby.dto.ts

import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindNearbyDto {
  @ApiProperty({
    description: "User's current latitude (required for distance calculation)",
    example: 30.0444, // Example coordinate for Cairo
  })
  @IsNotEmpty()
  @IsLatitude() // Ensures value is a valid latitude (-90 to +90)
  @Type(() => Number) // Converts the query string input to a number
  latitude: number;

  @ApiProperty({
    description: "User's current longitude (required for distance calculation)",
    example: 31.2357, // Example coordinate for Cairo
  })
  @IsNotEmpty()
  @IsLongitude() // Ensures value is a valid longitude (-180 to +180)
  @Type(() => Number) // Converts the query string input to a number
  longitude: number;
}
