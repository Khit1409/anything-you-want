import { ShippingMethod } from "@/productInterfaces/read.interface";

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
