import { useForm } from "react-hook-form";
import { CreateOrderRequest } from "../interfaces/request.interface";
import { useParams } from "next/navigation";
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

type SelectOptionIdType = { name: string; id: string };
type OnChangeSelectOptionParams = { clsName: string; valueId: string };
export default function useCreateOrder() {
  const params: { id: string } = useParams();
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
  const { control, register, watch, setValue, handleSubmit, formState } =
    useForm<{
      data: CreateOrderRequest;
    }>({
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
    });
  const [provinceCode, setProvinceCode] = useState<number>();
  const [optionIds, setOptionIds] = useState<SelectOptionIdType[]>([]);

  const onChangeSelectOptions = ({
    clsName,
    valueId,
  }: OnChangeSelectOptionParams) => {
    const existing = optionIds.find((opt) => opt.name === clsName);
    if (existing) {
      return setOptionIds((prev) =>
        prev.map((m) => (m.name === clsName ? { ...m, id: valueId } : m)),
      );
    }
    return setOptionIds((prev) => [...prev, { name: clsName, id: valueId }]);
  };

  const onChangeProvinceCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { dataset } = e.target.selectedOptions[0];
    const code = dataset.code;
    if (!code) return;
    setProvinceCode(Number(code));
  };

  const wardListByProvinceCode = () => {
    if (!provinceCode) return [];
    return wards.filter((ft) => ft.province_code === provinceCode);
  };
  const { provinces, wards, product } = data;

  async function sendOrder(data: CreateOrderRequest) {
    const res = await createOrderService(data);
    console.log(res);
  }

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
