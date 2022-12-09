import {
  IsArray,
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
  quantity: number;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  categoryId: string;

  @IsString()
  seller_userId: string;

  @IsArray()
  transactionsId: string[];
}
