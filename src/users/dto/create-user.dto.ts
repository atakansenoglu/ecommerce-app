import {
  IsEmail,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNumber()
  @Min(0)
  balance: number;
}
