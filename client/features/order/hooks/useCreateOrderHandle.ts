import React, { useState } from "react";
import { CreateOrderRequest } from "../interfaces/request.interface";
import { createOrderService } from "../services/order.service";
import { PaymentType } from "@/features/payments/interfaces/read.interface";
import {
  OnChangeSelectOptionParams,
  OrderUseForm,
  SelectOptionIdType,
} from "../interfaces/read.interface";
import { ProductDetailForOrder } from "@/features/product/interfaces/read.interface";
import { Wards } from "@/features/common/services/address.service";
import useLoading from "@/features/common/hooks/useLoading";
import useAppModal from "@/features/common/hooks/useAppModal";
import { useRouter } from "next/navigation";
import { UseFormSetValue } from "react-hook-form";

interface HookProps {
  product: ProductDetailForOrder | null;
  wards: Wards;
  setValue: UseFormSetValue<OrderUseForm>;
  provinceCode: string;
}

export default function useCreateOrderHandle({
  product,
  wards,
  setValue,
  provinceCode,
}: HookProps) {
  const { handleLoading } = useLoading();
  const { open } = useAppModal();
  const { replace } = useRouter();
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
    if (!provinceCode) return [];
    return wards.filter((ft) => ft.province_code === Number(provinceCode));
  };

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
      return replace(`/orders/buy-now/checkout/${orderId}`);
    }
    return open({ message, success });
  }
  return {
    sendOrder,
    maxQuantity,
    getVariant,
    wardListByProvinceCode,
    onChangeProvinceCode,
    onChangeSelectOptions,
    optionIds,
  };
}
