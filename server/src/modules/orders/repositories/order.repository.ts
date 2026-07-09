import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepositorySave } from '../interfaces/create.interface';
import {
  FindManyByOptions,
  FindOneByOptions,
  FindOneByOwner,
} from '../interfaces/find.interface';
import { Order, OrderStatus } from '../entities/order.entity';

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

  async findOneByOption(
    options: FindOneByOptions = {
      search: {},
      select: {
        store: {
          id: true,
          bankPayment: true,
          bankPaymentConfig: true,
        },
      },
      relations: {
        seller: true,
        store: true,
        user: true,
        payment: true,
        address: true,
        contact: true,
      },
    },
  ) {
    return await this.ormRepo.findOne({
      where: options.search,
      select: options.select,
      relations: options.relations,
    });
  }

  // async findOne(id: string) {
  //   return await this.ormRepo.findOne({
  //     where: { id },
  //     relations: {
  //       seller: true,
  //       store: true,
  //       user: true,
  //       payment: true,
  //       address: true,
  //       contact: true,
  //     },
  //   });
  // }

  async findOneByOrderCode(orderCode: number) {
    return await this.ormRepo.findOne({
      where: { orderCode },
      relations: {
        seller: true,
        store: true,
        user: true,
        payment: true,
        address: true,
        contact: true,
      },
    });
  }

  async findOneIsPending(id: string) {
    return await this.ormRepo.findOne({
      where: { id, status: OrderStatus.PENDING },
      relations: {
        seller: true,
        store: true,
        user: true,
        payment: true,
        address: true,
        contact: true,
      },
    });
  }

  async findMany(find: FindManyByOptions) {
    const { search, select, relations } = find;
    return await this.ormRepo.find({ where: search, select, relations });
  }

  async delete(id: string) {
    return await this.ormRepo.delete({ id });
  }
}
