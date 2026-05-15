import React, { useState } from "react";
import { CreateProductInfo } from "@/interfaces/product.interface";

export default function useProductInfo() {
  const [productInfo, setProductInfo] = useState<CreateProductInfo>({
    name: "",
    price: 0,
    sale: 0,
    category: "",
    description: "",
  });

  const onchangeProductInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "price" || name === "sale") {
      return setProductInfo((prev) => ({ ...prev, [name]: Number(value) }));
    }
    return setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateProductInfo = (info: CreateProductInfo) => {
    const checked: { ok: boolean; message: string } = {
      ok: true,
      message: "",
    };
    Object.keys(info).map((key) => {
      if (info[key as keyof CreateProductInfo] === "") {
        checked.ok = false;
        checked.message = "Thông tin sản phẩm không được để trống";
      }
    });
    return checked;
  };

  return {
    productInfo,
    setProductInfo,
    onchangeProductInfo,
    validateProductInfo,
  };
}
