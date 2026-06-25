import { ApiResponse } from "@/features/common/interfaces/common.interface";
import { Cart } from "./read.interface";

export interface CartApiResponse extends ApiResponse {
  status: number;
  data: Cart[];
}

/**
 * Response cập nhật cart.
 */
export interface CartUpdateResponse extends ApiResponse {
  data: {
    updateCount: number;
  };
}
