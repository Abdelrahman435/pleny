import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The full name of the user.',
    example: 'Abdelrahman Hassan Abbas',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description:
      'An array of the user\'s favorite cuisines (e.g., ["Asian", "Italian"]).',
    example: ['Burgers', 'Fried'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  favoriteCuisines: string[];
}
