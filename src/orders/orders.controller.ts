import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('create')
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req,
  ): Promise<Order> {
    createOrderDto.userId = req.user.userId;
    return this.orderService.create(createOrderDto);
  }

  @Get('')
  async findAll(@Request() req): Promise<Order[]> {
    return this.orderService.findAll(req.user.userId);
  }

  @Get('/userId')
  async findAllByUserId(@Request() req): Promise<Order[]> {
    return this.orderService.findAll(req.user.id);
  }

  @Post('drop-table')
  async dropOrdersTable(): Promise<void> {
    return this.orderService.dropOrdersTable();
  }
}
