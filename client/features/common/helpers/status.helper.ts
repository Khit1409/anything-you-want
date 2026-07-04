import { OrderStatus } from "@/features/order/interfaces/read.interface";

export const generateOrderStatus = (originStatus: OrderStatus): string => {
  switch (originStatus) {
    case OrderStatus.CANCELLED:
      return "Đã hủy";
    case OrderStatus.PENDING:
      return "Đang chờ xác nhận";
    case OrderStatus.DELIVERED:
      return "Đã nhận hàng";
    case OrderStatus.SHIPPING:
      return "Đang trên đường vận chuyển";
    default:
      return "Vận chuyển thất bại";
  }
};
