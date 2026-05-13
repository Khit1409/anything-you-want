import { getCategoryService } from "@/api/category.api";
import { createProductService } from "@/api/product.api";
import {
  CreateProductClassifications,
  CreateProductInfo,
  CreateProductRequest,
  CreateProductShipping,
} from "@/interfaces/product.interface";
import { openModal } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";
import { AppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function useCreateProduct() {
  const dispatch = useDispatch<AppDispatch>();

  const { data = { categories: [] } } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const [categories] = await Promise.all([getCategoryService()]); // có thể gọi thêm 1 số api khác kết hợp
      return { categories };
    },
  });

  const { categories } = data;

  /**
   * Product information handle
   */
  const [productInfo, setProductInfo] = useState<CreateProductInfo>({
    name: "",
    price: 0,
    sale: 0,
    category: "",
    description: "",
  });
  /**
   * Thay đổi product info state
   * @param e
   * @returns
   */
  const onchangeProductInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price" || name === "sale") {
      return setProductInfo((prev) => ({ ...prev, [name]: Number(value) }));
    }
    return setProductInfo((prev) => ({ ...prev, [name]: value }));
  };
  /**
   * Classifications handle
   */
  const [classifications, setClassifications] =
    useState<CreateProductClassifications>([]);
  const [countClassification, setCountClassification] = useState<number>(1);

  const [countClassificationValue, setCountClassificationValue] = useState<
    { parentIndex: number; size: number }[]
  >([]);

  /**
   * Thêm ô nhập liệu classification
   * @returns
   */
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

  /**
   * Thêm mới ô nhập liệu cho classification value bằng index của classification
   * @param index
   * @returns
   */
  const addNewClassificationValueInput = (index: number) => {
    const existingClassification = classifications.find((_, i) => i == index);
    if (!existingClassification) return;
    if (!existingClassification.values) return;
    const maxIndex = existingClassification.values.length + 1;
    setCountClassificationValue((prev) => {
      const newCount = [...(prev ?? [])];
      const foundIndex = newCount.findIndex((c) => c.parentIndex === index);
      if (foundIndex != -1) {
        newCount[foundIndex].size = maxIndex;
      } else {
        newCount.push({ parentIndex: index, size: 1 });
      }
      return newCount;
    });
  };

  /**
   * Xóa 1 classification bằng index của nó
   * @param index
   * @returns
   */
  const removeClassification = (index: number) => {
    if (index == 0) return;
    setCountClassification((prev) => prev - 1);
    return setClassifications((prev) => prev.filter((_, i) => i != index));
  };

  /**
   * xóa classification value bằng index của nó và index của classification đang chứa nó
   * @param index
   * @param indexValue
   * @returns
   */
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
  /**
   * Chỉnh sửa classifications state
   * @param e
   * @returns
   */
  const onchangeClassification = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    const parentIndexDataset = dataset.parentIndex;
    if (parentIndexDataset === undefined) return;
    const parentIndex = Number(parentIndexDataset);
    const valueIndexDataset = dataset.valueIndex; //có thể undifine nếu chỉ change name của classification
    setClassifications((prev) => {
      /**
       * Copy classification cũ thành 1 array mới
       */
      const newClassification = [...(prev ?? [])];
      /**
       * Copy object tại parentIndex của newClassification thực hiện chuyển đổi.
       */
      const classification = { ...(newClassification[parentIndex] ?? {}) };
      /**
       * Đổi tên khi chỉ gửi mỗi dataset của parentIndex tức là input của name classification
       */
      if (valueIndexDataset === undefined) {
        classification.name = value;
      } else {
        /**
         * Đổi value tại vị trí valueIndex của classification tại parentIndex nếu gửi cả dataset của value
         */
        const valueIndex = Number(valueIndexDataset);
        /**
         * copy values cũ
         */
        const newClassificationValues = [...(classification.values ?? [])];
        /**
         * Thay đổi giá trị của values đã copy tại valueIndex
         */
        newClassificationValues[valueIndex] = {
          ...(newClassificationValues[valueIndex] ?? {}),
          [name]:
            name === "extraPrice" || name === "stock" ? Number(value) : value,
        };
        /**
         * Lưu values cũ thành values mới chỉnh sửa
         */
        classification.values = newClassificationValues;
      }
      /**
       * lưu lại toàn bộ classification đã sửa.
       */
      newClassification[parentIndex] = classification;

      return newClassification;
    });
  };

  /**
   * Shipping handle
   */
  const [shipping, setShipping] = useState<CreateProductShipping>({
    flash: false,
    normal: true,
  });
  const onchangeShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    return setShipping((prev) => ({ ...prev, [name]: checked }));
  };
  /**
   * Chặn nhập các trường của giá trị phân loại khi tên phân loại chưa nhập
   */
  const blockInputClassificationValue = (index: number) => {
    return classifications.find((_, i) => i === index)?.name ? false : true;
  };
  /**
   * Validate classifications trước khi thêm sản phẩm
   * @returns
   */
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
  /**
   * Sử lý post data tạo mới sản phẩm.
   */

  async function createProduct() {
    const dataForm: CreateProductRequest = {
      info: productInfo,
      classification: classifications,
      images: { thumbnail: "", details: [""] },
      shipping,
    };
    const checkedInfo = validateProductInfo(dataForm.info);
    if (!checkedInfo.ok) {
      const { message } = checkedInfo;
      return dispatch(openModal({ message, state: ModalState.WARNING }));
    }
    const checkedClassification = validateClassification(
      dataForm.classification
    );
    if (!checkedClassification.ok) {
      const { message } = checkedClassification;
      return dispatch(openModal({ message, state: ModalState.WARNING }));
    }
    if (!shipping.normal) {
      return dispatch(
        openModal({
          message: "Không được tắt vận chuyển thường!",
          state: ModalState.WARNING,
        })
      );
    }
    const result = await createProductService(dataForm);
    const { message, success } = result;
    return dispatch(
      openModal({
        message,
        state: success ? ModalState.ERROR : ModalState.SUCCESS,
      })
    );
  }

  return {
    categories,
    onchangeProductInfo,
    productInfo,
    shipping,
    onchangeShipping,
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
    createProduct,
  };
}
