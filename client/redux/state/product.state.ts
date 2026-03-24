import { IProductPreview } from "@/api/product.api";

export interface IProductInitalState {
  products: Array<IProductPreview>;
  loading: boolean;
  error: string | null;
}
