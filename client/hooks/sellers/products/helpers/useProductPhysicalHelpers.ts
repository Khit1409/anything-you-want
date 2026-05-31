import { CreateProductPhysical } from "@/interfaces";
import React, { useState } from "react";

export default function useProductPhysicalHelper() {
  const [physical, setPhysical] = useState<CreateProductPhysical>({
    dimensions: {
      width: 0,
      height: 0,
      length: 0,
    },
    weight: 0,
  });

  const onchangePhysical = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const finalValue = Number(value);

    if (name !== "weight") {
      return setPhysical((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [name]: finalValue },
      }));
    }
    return setPhysical((prev) => ({ ...prev, weight: finalValue }));
  };

  return { physical, onchangePhysical };
}
