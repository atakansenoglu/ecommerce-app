import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:email')
  async findOne(@Param('email') email: string): Promise<User | undefined> {
    return this.usersService.findOne(email);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersService.findOne(req.user.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.usersService.update(user.id, updateUserDto);
  }

  @Put('update-user-by-admin')
  async updateUserByAdmin(
    @Body() updateUserByAdminDto: UpdateUserByAdminDto,
  ): Promise<User> {
    return this.usersService.updateUserByAdmin(
      updateUserByAdminDto.id,
      updateUserByAdminDto,
    );
  }
}
