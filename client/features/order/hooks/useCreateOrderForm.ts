import { PaymentType } from "@/features/payments/interfaces/read.interface";
import { ShippingMethod } from "@/features/product/interfaces/read.interface";
import { OrderUseForm } from "../interfaces/read.interface";
import { useForm } from "react-hook-form";

export default function useCreateOrderForm(productId: string) {
  const useFormDefaultValues = {
    defaultValues: {
      data: {
        address: {
          detail: "",
          province: "",
          provinceCode: "",
          ward: "",
        },
        contact: {
          phone: "",
          userName: "",
          email: "",
        },
        productId,
        quantity: 1,
        variantId: "",
        paymentType: PaymentType.DELIVERED,
        shipMethod: ShippingMethod.STANDARD,
      },
    },
  };
  const useOrderForm = useForm<OrderUseForm>(useFormDefaultValues);
  return useOrderForm;
}
