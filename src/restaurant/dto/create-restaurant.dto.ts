import {
  IsString,
  IsNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  IsLatitude,
  IsLongitude,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CreateLocationDto {
  @ApiProperty({ description: 'Latitude of the restaurant location' })
  @IsLatitude()
  @Type(() => Number)
  latitude: number;

  @ApiProperty({ description: 'Longitude of the restaurant location' })
  @IsLongitude()
  @Type(() => Number)
  longitude: number;
}

export class CreateRestaurantDto {
  @ApiProperty({ description: 'اسم المطعم باللغة العربية' })
  @IsString()
  @IsNotEmpty()
  nameAr: string;

  @ApiProperty({ description: 'Name of the restaurant in English' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ description: 'Slug of the restaurant' })
  @IsString()
  @IsNotEmpty()
  slugName: string;

  @ApiProperty({ description: 'Cuisines offered by the restaurant' })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsString({ each: true })
  cuisines: string[];

  @ApiProperty({ description: 'Location of the restaurant' })
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;
}
