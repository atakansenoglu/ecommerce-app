import { IsInt, IsPositive, IsString } from '@nestjs/class-validator';

export class CreateOrderDto {
  @IsString()
  productName: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsPositive()
  price: number;

  @IsInt()
  userId: number;
}
