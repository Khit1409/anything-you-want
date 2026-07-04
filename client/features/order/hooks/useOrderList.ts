import { useQuery } from "@tanstack/react-query";
import { getUserOrdersService } from "../services/order.service";
import { generateOrderStatus } from "@/features/common/helpers/status.helper";
import { OrderStatus } from "../interfaces/read.interface";
import useAuth from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShippingMethod } from "@/features/product/interfaces/read.interface";
import { generagetShipping } from "@/features/common/helpers/shipping.helper";

export default function useOrderList() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getUserOrdersService();
    },
  });

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    auth.needLogin();
  }, [router, auth]);

  const orders = data;

  const status = (orderStatus: OrderStatus) => generateOrderStatus(orderStatus);
  const shipping = (shipping: ShippingMethod) => generagetShipping(shipping);
  return { orders, isLoading, status, shipping };
}
