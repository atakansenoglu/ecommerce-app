import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private usersService: UsersService,
    private connection: Connection,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersService.findOneById(createOrderDto.userId);
    const orderAmount = createOrderDto.price * createOrderDto.quantity;

    if (user.balance < orderAmount) {
      throw new BadRequestException('Insufficient balance.');
    }

    user.balance -= orderAmount;
    await this.usersService.updateBalance(user.id, user.balance);

    const order = this.ordersRepository.create({
      ...createOrderDto,
      total: orderAmount,
    });

    return this.ordersRepository.save(order);
  }

  async findAll(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({ where: { userId } });
  }

  async dropOrdersTable(): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(`DROP TABLE IF EXISTS "order"`);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
