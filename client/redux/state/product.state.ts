import { ProductVariants } from "@/interfaces";

export interface ProductInitialState {
  loading: boolean;
  error: string | null;
  updateVariantData: ProductVariants;
}
