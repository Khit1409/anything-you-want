import React, { useState } from "react";
import { CreateProductClassifications } from "@/interfaces/product.interface";

export default function useClassification() {
  const [classifications, setClassifications] =
    useState<CreateProductClassifications>([]);
  const [countClassification, setCountClassification] = useState<number>(1);

  const [countClassificationValue, setCountClassificationValue] = useState<
    { parentIndex: number; size: number }[]
  >([{ parentIndex: 0, size: 1 }]);

  const addNewClassificationInput = () => {
    const maxIndex = classifications.length + 1;
    return setCountClassification((prev) => {
      if (prev == maxIndex) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const addNewClassificationValueInput = (index: number) => {
    const existingClassification = classifications.find((_, i) => i == index);
    if (!existingClassification || !existingClassification.values) return;
    const maxIndex = existingClassification.values.length;
    setCountClassificationValue((prev) => {
      const newCount = [...(prev ?? [])];
      const foundIndex = newCount.findIndex((c) => c.parentIndex === index);
      if (foundIndex != -1) {
        newCount[foundIndex].size = maxIndex + 1;
      } else {
        newCount.push({ parentIndex: index, size: 1 });
      }
      return newCount;
    });
  };

  const removeClassification = (index: number) => {
    if (index == 0) return;
    setCountClassification((prev) => prev - 1);
    return setClassifications((prev) => prev.filter((_, i) => i != index));
  };

  const removeClassificationValue = (index: number, indexValue: number) => {
    if (indexValue == 0) return;
    setCountClassificationValue((prev) => {
      return prev.map((count) =>
        count.parentIndex === index
          ? { ...count, size: count.size == 1 ? count.size : count.size - 1 }
          : count
      );
    });

    return setClassifications((prev) => {
      return prev.map((classification, i) =>
        i === index
          ? {
              ...classification,
              values: classification.values.filter(
                (_, iVl) => iVl != indexValue
              ),
            }
          : classification
      );
    });
  };

  const onchangeClassification = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    const parentIndexDataset = dataset.parentIndex;
    if (parentIndexDataset === undefined) return;
    const parentIndex = Number(parentIndexDataset);
    const valueIndexDataset = dataset.valueIndex;
    setClassifications((prev) => {
      const newClassification = [...(prev ?? [])];
      const classification = { ...(newClassification[parentIndex] ?? {}) };
      if (valueIndexDataset === undefined) {
        classification.name = value;
      } else {
        const valueIndex = Number(valueIndexDataset);
        const newClassificationValues = [...(classification.values ?? [])];
        newClassificationValues[valueIndex] = {
          ...(newClassificationValues[valueIndex] ?? {}),
          [name]:
            name === "extraPrice" || name === "stock"
              ? Number(value) ?? 0
              : value,
        };
        classification.values = newClassificationValues;
      }
      newClassification[parentIndex] = classification;

      return newClassification;
    });
  };

  const blockInputClassificationValue = (index: number) => {
    return classifications.find((_, i) => i === index)?.name ? false : true;
  };

  const validateClassification = (
    classifications: CreateProductClassifications
  ) => {
    const checked: { ok: boolean; message: string } = { ok: true, message: "" };
    classifications.forEach((classification) => {
      if (classification.name === "") {
        checked.ok = false;
        checked.message = "Tên của phân loại sản phẩm không được bỏ trống";
      }
      classification.values.forEach((classificationValue) => {
        if (
          classificationValue.extraPrice < 0 ||
          classificationValue.stock == 0 ||
          classificationValue.stock < 0 ||
          classificationValue.name === ""
        )
          checked.message =
            "Một số thông tin của giá trị phân loại đang bị sai!";
      });
    });
    return checked;
  };

  return {
    classifications,
    setClassifications,
    countClassification,
    setCountClassification,
    addNewClassificationInput,
    removeClassification,
    removeClassificationValue,
    countClassificationValue,
    addNewClassificationValueInput,
    onchangeClassification,
    blockInputClassificationValue,
    validateClassification,
  };
}
