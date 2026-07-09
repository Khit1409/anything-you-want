import {
  OrderStatus,
  PaymentStatus,
  PaymentType,
} from "@/features/order/interfaces/read.interface";
import { ShippingMethod } from "@/features/product/interfaces/read.interface";

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

export const generatePaymentStatus = (paymentStatus: PaymentStatus): string => {
  switch (paymentStatus) {
    case PaymentStatus.CANCELLED:
      return "Hủy thanh toán";
    case PaymentStatus.EXPIRED:
      return "Hết hạn thanh toán";
    case PaymentStatus.FAILED:
      return "Thanh toán thất bại";
    case PaymentStatus.PAID:
      return "Đã thanh toán";
    default:
      return "Chưa thanh toán";
  }
};

export function generagetShipping(shipping: ShippingMethod): string {
  switch (shipping) {
    case ShippingMethod.STANDARD:
      return "Giao hàng tiêu chuẩn";

    case ShippingMethod.EXPRESS:
      return "Giao hàng nhanh";

    case ShippingMethod.NEXTDAY:
      return "Giao hàng vào ngày hôm sau";

    case ShippingMethod.SAMEDAY:
      return "Giao hàng trong ngày";

    case ShippingMethod.PICKUP:
      return "Nhận hàng tại kho";

    case ShippingMethod.INTERNATIONAL:
      return "Giao hàng quốc tế";

    default:
      return "Giao hàng theo lịch hẹn";
  }
}

export function generatePaymentType(type: PaymentType) {
  switch (type) {
    case PaymentType.BANKING:
      return "Chuyển khoản";
    case PaymentType.MOMO:
      return "Momo banking";
    case PaymentType.DELIVERED:
      return "Thanh toán khi nhận hàng";
  }
}
