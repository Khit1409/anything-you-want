export interface SearchProducts {
  'owner.sellerId'?: string;
  'info.category.id'?: string | undefined;
  'info.price'?:
    | {
        $lte: number;
        $gte: number;
      }
    | undefined;
  'info.sale'?:
    | {
        $lte: number;
        $gte: number;
      }
    | undefined;
}

export type SortProducts = {
  limit: number;
  skip: number;
  select: string;
};

export interface FilterProducts {
  sort: SortProducts;
  search: SearchProducts;
}

export interface ProductFindOneOptions {
  'owner.sellerId'?: string;
  _id: string;
}

export type RelatedsOptions = {
  neId: string;
  categoryId: string;
  select: string;
};
