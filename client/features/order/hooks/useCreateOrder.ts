import { useForm } from "react-hook-form";
import { CreateOrderRequest } from "../interfaces/request.interface";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getProvinces,
  getWards,
} from "@/features/common/services/address.service";
import { useState } from "react";

export default function useCreateOrder() {
  const params: { id: string } = useParams();
  const productId = params.id;
  const {
    data = {
      wards: [],
      provinces: [],
    },
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const [wards, provinces] = await Promise.all([
        getWards(),
        getProvinces(),
      ]);
      return { wards, provinces };
    },
  });
  const { control, register, watch, setValue } = useForm<{
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
      },
    },
  });
  const [provinceCode, setProvinceCode] = useState<number>();
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
  const { provinces, wards } = data;

  return {
    control,
    register,
    watch,
    setValue,
    provinces,
    wards,
    onChangeProvinceCode,
    wardListByProvinceCode,
  };
}
