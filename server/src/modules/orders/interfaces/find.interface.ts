import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsWhere,
} from 'typeorm';
import { Order } from '../entities/order.entity';

export interface FindOneByOwner {
  sellerId: string;
  storeId: string;
  userId: string;
}

export interface FindManyByOptions {
  search?: FindOptionsWhere<Order>;
  select?: FindOptionsSelect<Order> | FindOptionsSelectByString<Order>;
  relations?: FindOptionsRelations<Order>;
}

export interface FindOneByOptions {
  search?: FindOptionsWhere<Order>;
  select?: FindOptionsSelect<Order> | FindOptionsSelectByString<Order>;
  relations?: FindOptionsRelations<Order>;
}
