import { IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  state: string;

  @IsString()
  buyer_userId: string;
}
