import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepositorySave } from '../interfaces/create.interface';
import { FindOneByOwner } from '../interfaces/find.interface';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ormRepo: Repository<Order>,
  ) {}

  async findOneByOwner({ userId, sellerId, storeId }: FindOneByOwner) {
    const search = {
      user: { id: userId },
      seller: { id: sellerId },
      store: { id: storeId },
    };
    return await this.ormRepo.findOne({
      where: search,
    });
  }

  async create(data: OrderRepositorySave) {
    return await this.ormRepo.save(data);
  }

  async findOneById(id: string) {
    return await this.ormRepo.findOneBy({ id });
  }
}
