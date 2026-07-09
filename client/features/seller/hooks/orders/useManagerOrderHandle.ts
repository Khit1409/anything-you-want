import { generagetShipping } from "@/features/common/helpers/enum-type.helper";
import {
  GetOrderTableParams,
  OrderShipping,
  OrderStatus,
  PaymentStatus,
} from "@/features/order/interfaces/read.interface";
import { useState } from "react";

export default function useManagerOrderHandle() {
  const [filter, setFilter] = useState<GetOrderTableParams>({
    paymentStatus: PaymentStatus.UNPAID,
    status: OrderStatus.PENDING,
  });

  const onChangeOrderFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const renderShippingCol = (shipping: OrderShipping) => {
    const text = generagetShipping(shipping.type);
    const begin = new Date(shipping.startedAt);
    const beginFormat = begin.getDate() + "/" + begin.getMonth();
    const end = shipping.finishedAt ? new Date(shipping.finishedAt) : undefined;
    const endFormate = end ? end.getDay() + "/" + end.getMonth() : undefined;
    return `${text}-${beginFormat}${endFormate ? `-${endFormate}` : ""}`;
  };

  const renderOrderTime = (createdAt: string, updatedAt: string) => {
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);

    return (
      createdDate.toLocaleDateString("vi-VN") +
      "-" +
      updatedDate.toLocaleDateString("vi-VN")
    );
  };

  return {
    filter,
    setFilter,
    onChangeOrderFilter,
    renderShippingCol,
    renderOrderTime,
  };
}
