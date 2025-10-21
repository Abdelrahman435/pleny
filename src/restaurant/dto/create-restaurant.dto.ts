import {
  IsArray,
  ArrayMinSize,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class GeoJsonLocationDto {
  @ApiProperty({
    description: 'The type of the GeoJSON object.',
    example: 'Point',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'The coordinates of the GeoJSON object.',
    example: [31.2357, 30.0444],
  })
  @IsArray()
  @ArrayMinSize(2)
  coordinates: number[];
}

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'The Arabic name of the restaurant.',
    example: 'كرم الشام',
  })
  @IsString()
  @IsNotEmpty()
  nameAr: string;

  @ApiProperty({
    description: 'The English name of the restaurant.',
    example: 'Karam Al-Sham',
  })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({
    description: 'The slug name of the restaurant.',
    example: 'karam-al-sham',
  })
  @IsString()
  @IsNotEmpty()
  slugName: string;

  @ApiProperty({
    description: 'The cuisines offered by the restaurant.',
    example: ['Fried', 'Burgers'],
  })
  @IsArray()
  @IsString({ each: true })
  cuisines: string[];
  @ApiProperty({
    description: 'The location of the restaurant.',
    example: {
      type: 'Point',
      coordinates: [31.2357, 30.0444],
    },
  })
  @ValidateNested()
  @Type(() => GeoJsonLocationDto)
  location: GeoJsonLocationDto;
}
