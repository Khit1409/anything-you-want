import React, { useState } from "react";
import { CreateProductShipping } from "@/interfaces/product.interface";

export default function useShipping() {
  const [shipping, setShipping] = useState<CreateProductShipping>({
    flash: false,
    normal: true,
  });

  const onchangeShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    return setShipping((prev) => ({ ...prev, [name]: checked }));
  };

  return { shipping, setShipping, onchangeShipping };
}
