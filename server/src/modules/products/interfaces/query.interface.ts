import { RootFilterQuery } from 'mongoose';
import { Product } from '../schemas/products.schema';

export type SearchProducts = RootFilterQuery<Product>;

export type SortProducts = {
  limit: number;
  skip: number;
  select: string;
};

export interface FilterProducts {
  sort: SortProducts;
  search: SearchProducts;
}

export type RelatedsOptions = {
  neId: string;
  categoryId: string;
  select: string;
};
