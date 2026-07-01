import { useForm } from "react-hook-form";
import { CreateOrderRequest } from "../interfaces/request.interface";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getProvinces,
  getWards,
} from "@/features/common/services/address.service";
import { useState } from "react";
import { createOrderService } from "../services/order.service";
import { getDetailForOrderService } from "@/productServices/product.service";
import { PaymentType } from "@/features/payments/interfaces/read.interface";
import { ShippingMethod } from "@/features/product/interfaces/read.interface";
import useAppModal from "@/features/common/hooks/useAppModal";
import {
  OnChangeSelectOptionParams,
  OrderUseForm,
  SelectOptionIdType,
} from "../interfaces/read.interface";
import useLoading from "@/features/common/hooks/useLoading";

export default function useCreateOrder() {
  const params: { id: string } = useParams();
  const modalHook = useAppModal();
  const { handleLoading } = useLoading();
  const router = useRouter();
  const productId = params.id;
  const {
    data = {
      wards: [],
      provinces: [],
      product: null,
    },
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const [wards, provinces, product] = await Promise.all([
        getWards(),
        getProvinces(),
        getDetailForOrderService(productId),
      ]);
      return { wards, provinces, product };
    },
  });
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
  const { control, register, watch, setValue, handleSubmit, formState } =
    useForm<OrderUseForm>(useFormDefaultValues);

  const [optionIds, setOptionIds] = useState<SelectOptionIdType[]>([]);

  const onChangeSelectOptions = (params: OnChangeSelectOptionParams) => {
    const { clsName, valueId } = params;
    const existing = optionIds.find((opt) => opt.name === clsName);
    if (existing) {
      return setOptionIds((prev) =>
        prev.map((m) => (m.name === clsName ? { ...m, id: valueId } : m)),
      );
    }
    return setOptionIds((prev) => [...prev, { name: clsName, id: valueId }]);
  };

  const onChangeProvinceCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("is changing...");
    const { dataset } = e.target.selectedOptions[0];
    const code = dataset.code;
    console.log(code);
    if (!code) return;
    setValue("data.address.provinceCode", code);
  };

  const wardListByProvinceCode = () => {
    const provinceCode = watch("data.address.provinceCode");
    console.log(provinceCode);
    if (!provinceCode) return [];
    return wards.filter((ft) => ft.province_code === Number(provinceCode));
  };
  const { provinces, wards, product } = data;

  const getVariant = () => {
    if (!product) return;
    return product.variants.find((f) =>
      f.optionIds.every((evId) => optionIds.find((opt) => opt.id === evId)),
    );
  };

  const maxQuantity = () => {
    const variant = getVariant();
    if (!variant) return 0;
    return variant.stock;
  };

  async function sendOrder(payload: CreateOrderRequest) {
    const res = await handleLoading(createOrderService, payload);
    const { message, success, data } = res;
    const { orderId, paymentType } = data;
    if (paymentType !== PaymentType.DELIVERED) {
      return router.replace(`/orders/buy-now/checkout/${orderId}`);
    }
    return modalHook.open({ message, success });
  }

  return {
    control,
    register,
    watch,
    setValue,
    provinces,
    wards,
    onChangeProvinceCode,
    wardListByProvinceCode,
    formState,
    handleSubmit,
    sendOrder,
    product,
    onChangeSelectOptions,
    getVariant,
    maxQuantity,
    optionIds,
    isLoading,
  };
}
