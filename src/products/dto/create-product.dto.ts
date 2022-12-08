import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsOptional()
  status: string;
}
