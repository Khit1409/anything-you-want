import { CartClassificationRequest } from "@/interfaces/cart.interface";
import { ProductDetail } from "@/interfaces/product.interface";
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
    const totalExtraPrice = classificationSelected.reduce(
      (sum, item) => (sum += item.values.extraPrice),
      0
    );
    return price - price * (sale / 100) + totalExtraPrice;
  };

  /**
   * Determine maximum quantity allowed by the selected classification stocks
   */
  const getMaxQuantity = () => {
    if (classificationSelected.length == 0) {
      return 0;
    }

    const maxQuantity = classificationSelected.reduce(
      (min, selected) =>
        selected.values.stock < min ? selected.values.stock : min,
      classificationSelected[0].values.stock
    );
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

    const needClassifi = product.classification.find(
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

  return {
    classificationSelected,
    finalPrice,
    getMaxQuantity,
    onchangeClassification,
    setQuantity,
    quantity,
    minusSale,
  };
}
