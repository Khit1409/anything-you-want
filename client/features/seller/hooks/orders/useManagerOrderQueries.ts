import {
  GetOrderTableParams,
  Orders,
} from "@/features/order/interfaces/read.interface";
import { useQuery } from "@tanstack/react-query";
import { getSellerOrderService } from "../../services/seller.service";

export default function useManagerOrderQueries(filter: GetOrderTableParams) {
  const defaultData: Orders = [];
  const { data = defaultData, isLoading } = useQuery<Orders>({
    queryKey: ["orders", filter],
    queryFn: async () => {
      return await getSellerOrderService(filter);
    },
  });
  const orders = data;

  return { orders, isLoading };
}
