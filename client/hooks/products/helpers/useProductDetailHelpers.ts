import { CartClassificationRequest } from "@/interfaces/cart.interface";
import { ProductDetail } from "@/interfaces/product.interface";
import { createObjectKey } from "@/lib/helper/strHelper";
import { useState } from "react";

/**
 * Helper hook for product detail UI logic.
 * - Manages `quantity` and selected classifications
 * - Provides utility functions for price calculations and limits
 * @param product Product detail object used to derive classification values
 */
export default function useProductDetailHelpers(product: ProductDetail | null) {
  // Quantity selected by user
  const [quantity, setQuantity] = useState<number>(1);
  // Selected classification values chosen by the user
  const [classificationSelected, setClassificationSelected] = useState<
    CartClassificationRequest[]
  >([]);
  /**
   * Calculate final price based on base price, sale percent and extra prices from classifications
   */
  const finalPrice = (price: number, sale: number) => {
    const finalPrice = price - minusSale(price, sale);
    if (!product) return finalPrice;
    const variantId = getVariantId();
    if (!variantId) return finalPrice;
    const variant = product.variants.find((f) => f.id === variantId);
    if (!variant) return finalPrice;
    return finalPrice + variant.extraPrice;
  };

  /**
   * Determine maximum quantity allowed by the selected classification stocks
   */
  const getMaxQuantity = () => {
    if (classificationSelected.length == 0) {
      return 0;
    }
    if (!product) return 0;
    const variants = [...product.variants];

    const optionSelected: Record<string, string> = {};

    classificationSelected.forEach((classification) => {
      optionSelected[createObjectKey(classification.name)] =
        classification.values.name;
    });

    const variantNeed = variants.find((variant) =>
      Object.keys(optionSelected).every(
        (key) => variant.options[key] === optionSelected[key]
      )
    );
    if (!variantNeed) return 0;

    const maxQuantity = variantNeed.stock;
    return maxQuantity;
  };

  /**
   * Compute amount subtracted from price by sale percent
   */
  const minusSale = (price: number, sale: number) => {
    const minusValue = price * (sale / 100);
    return minusValue;
  };

  /**
   * Update selected classification based on a user selection (name + value)
   * Also resets quantity to 1 to avoid invalid selection after changing classifications
   */
  const onchangeClassification = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    // Reset quantity when classifications change to avoid exceeding new max
    setQuantity(1);

    if (!product) {
      console.log("Product is not define!");
      return;
    }

    const needClassifi = product.classifications.find(
      (classifi) => classifi.name === name
    );

    if (!needClassifi) {
      console.log("Need classifications is not define!");
      return;
    }

    const needClassifiValues = needClassifi.values.find(
      (classifiValue) => classifiValue.name === value
    );

    if (!needClassifiValues) {
      console.log("need classification values is not define!");
      return;
    }

    setClassificationSelected((prev) => {
      const existing = prev.find((classifi) => classifi.name === name);
      if (!existing) {
        return [...prev, { name, values: needClassifiValues }];
      }
      return prev.map((classifi) =>
        classifi.name === name
          ? { ...classifi, values: needClassifiValues }
          : classifi
      );
    });
  };

  /**
   * Lấy id của variant để thực hiện thêm giỏ hàng
   */
  const getVariantId = () => {
    if (!product) return;
    const variants = [...product.variants];

    const optionSelected: Record<string, string> = {};

    classificationSelected.forEach((classification) => {
      optionSelected[createObjectKey(classification.name)] =
        classification.values.name;
    });

    const variantNeed = variants.find((variant) =>
      Object.keys(optionSelected).every(
        (key) => variant.options[key] === optionSelected[key]
      )
    );

    return variantNeed?.id;
  };

  return {
    getVariantId,
    classificationSelected,
    finalPrice,
    getMaxQuantity,
    onchangeClassification,
    setQuantity,
    quantity,
    minusSale,
  };
}
