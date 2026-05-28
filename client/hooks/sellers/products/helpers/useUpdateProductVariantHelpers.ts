import { ProductVariants, UpdateProductVariants } from "@/interfaces";
import { useState } from "react";

interface HelperProps {
  variants: ProductVariants;
}

export default function useUpdateProductVariantHelpers({
  variants,
}: HelperProps) {
  const [variantUpdated, setVariantUpdated] = useState<UpdateProductVariants>(
    []
  );

  const checkingCorrectValues = (
    oldValues: ProductVariants,
    newValues: UpdateProductVariants
  ): { ok: boolean; message?: string } => {
    console.log("mới", newValues, "cũ", oldValues);
    if (oldValues.length !== newValues.length) {
      return { ok: false, message: "Số lượng biến thể bị thay đổi!" };
    }

    const isZeroStock = newValues.find((f) => f.stock == 0);

    if (isZeroStock) {
      return {
        ok: false,
        message:
          "Số lượng trong kho của biến 1 biến thể nhỏ hơn hoặc bằng 0 vui lòng kiểm tra lại!",
      };
    }
    return { ok: true };
  };

  const onchangeVariants = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (variants.length == 0) return;
    const { name, value, dataset } = e.target;
    const idDataset = dataset.id;
    if (idDataset === undefined) return;
    const id = String(idDataset);
    console.log("id updated", id);
    setVariantUpdated((prev) => {
      const newVariants = [...(prev ?? [])];
      const existing = newVariants.findIndex((f) => f.id === id);
      if (existing !== -1) {
        newVariants[existing] = {
          ...newVariants[existing],
          [name]: Number(value),
        };
      } else {
        newVariants.push({ id, [name]: Number(value) });
      }
      return newVariants;
    });
  };

  return { variantUpdated, onchangeVariants, checkingCorrectValues };
}
