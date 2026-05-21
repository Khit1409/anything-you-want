export interface GetProductQuery {
  page?: number;
  limit?: number;
}

export interface GetProductFilter {
  limit: number;
  skip: number;
  select: string;
}
