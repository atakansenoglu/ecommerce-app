import {
  IsString,
  IsEmail,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
} from '@nestjs/class-validator';

export class UpdateUserByAdminDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number;
}
