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
  @ApiProperty({ example: 'Point' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: [31.2357, 30.0444] })
  @IsArray()
  @ArrayMinSize(2)
  coordinates: number[];
}

export class CreateRestaurantDto {
  @IsString() @IsNotEmpty() nameAr: string;
  @IsString() @IsNotEmpty() nameEn: string;
  @IsString() @IsNotEmpty() slugName: string;
  @IsArray() @IsString({ each: true }) cuisines: string[];

  @ValidateNested()
  @Type(() => GeoJsonLocationDto)
  location: GeoJsonLocationDto;
}
