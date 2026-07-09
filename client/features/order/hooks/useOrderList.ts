import { useQuery } from "@tanstack/react-query";
import { getUserOrdersService } from "../services/order.service";
import { generagetShipping, generateOrderStatus } from "@/features/common/helpers/enum-type.helper";
import { OrderStatus } from "../interfaces/read.interface";
import useAuth from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShippingMethod } from "@/features/product/interfaces/read.interface";

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
    const { needLogin, fn } = auth.needLoginHandle();
    if (needLogin && fn) fn();
  }, [router, auth]);

  const orders = data;

  const status = (orderStatus: OrderStatus) => generateOrderStatus(orderStatus);
  const shipping = (shipping: ShippingMethod) => generagetShipping(shipping);
  return { orders, isLoading, status, shipping };
}
