export interface GetProductPreviewRequest {
  page: number;
}

export type FilterCost = {
  max: number;
  min: number;
};

export interface GetProductTableQuery extends GetProductPreviewRequest {
  category?: string; //id
  price?: FilterCost;
  sale?: FilterCost;
}
