"use client";

import { addToCartService } from "@/api/cart.api";
import { getProductDetailService } from "@/api/product.api";
import { CartClassificationRequest } from "@/interfaces/request/cart.request";
import { openModal, startLoadingAnimation } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";

import { AppDispatch, RootState } from "@/redux/store";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useProductDetail() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const params: { id: string } | null = useParams();
  const id = params?.id;
  const router = useRouter();
  /***
   * component state
   */
  /**
   * Số lượng
   */
  const [quantity, setQuantity] = useState<number>(1);
  /**
   * State phân loại sản phẩm của người dùng
   */
  const [classificationSelected, setClassificationSelected] = useState<
    CartClassificationRequest[]
  >([]);

  /**
   * react query (api)
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => {
      if (id) return getProductDetailService(id);
    },
    enabled: !!id,
  });
  /**
   * set giá trị mặc định cho các api
   */
  const product = data?.product ?? null;
  const related = data?.related ?? [];
  /**
   * helper
   */
  /**
   * Giá trị cuối cùng của giá sản phẩm
   * @param price
   * @param sale
   * @returns
   */
  const finalPrice = (price: number, sale: number) => {
    const totalExtraPrice = classificationSelected.reduce(
      (sum, item) => (sum += item.values.extraPrice),
      0
    );
    return price - price * (sale / 100) + totalExtraPrice;
  };
  /**
   * ví dụ sản phẩm có 2 phân loại a b c và
   * a : 10 cái
   * b : 16 cái
   * c : 17 cái
   * thì số lượng lớn nhất có thể chọn là 10
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
   *
   * @param price
   * @param sale
   * @returns
   */
  const minusSale = (price: number, sale: number) => {
    const minusValue = price * (sale / 100);
    return minusValue;
  };
  /**
   * Tự set value cho classification selected state bằng name và value từ người dùng click bên giao diện
   * ví dụ
   * Màu Sắc (name) : trắng (value)
   * Kích thước (name): XXL (value)
   * @param param0
   */
  const onchangeClassification = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    /***
     * Tránh xảy ra việc quantity đang ở mức max hoặc min cũ và chuyển sang mức max hoặc min mới
     * ví dụ người dùng đang chon phân loại 1:x và 2 :y có max là 40 chuyển sang phân loại mới 1:x 2 : x là max 30
     * thì thanh chọn số lượng lỗi cho phép thêm tiếp quantity dù max đang bằng quantity
     */
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

  /**
   * add to cart service
   * 1 - Quantity mặc định đã là 1 và đã config không thể nhập số nhỏ hơn 1 nên không cần check.
   * 2 - Tự động chuyển hướng nếu users đang ở trạng thái logout.
   * 3 - Không thể thực hiện khi người dùng chưa chọn phân loại sản phẩm.
   * 4 - Không thể thực hiện khi số lượng phân loại đã chọn khác số lượng phâm loại sản phẩm.
   * @params 0
   */
  const addToCartHandle = async () => {
    if (!isLoggedIn) {
      return router.replace("/login");
    }
    if (!product) {
      console.log("Product is not define!");
      return;
    }
    if (
      classificationSelected.length != product.classification.length ||
      classificationSelected.length == 0
    ) {
      return dispatch(
        openModal({
          message: "Phân loại sản phẩm không được chọn đủ!",
          state: ModalState.WARNING,
        })
      );
    }

    dispatch(startLoadingAnimation());

    const res = await addToCartService({
      classification: classificationSelected,
      productId: product.id ?? id,
      quantity: quantity <= 0 ? 1 : quantity,
    });

    if (res) {
      dispatch(startLoadingAnimation());
      return res.success
        ? dispatch(
            openModal({
              message: "Thêm giỏ hàng thành công",
              state: ModalState.SUCCESS,
            })
          )
        : dispatch(
            openModal({
              message: res.message,
              state: ModalState.ERROR,
            })
          );
    }
  };

  /**
   * result
   */
  return {
    product,
    related,
    error,
    isLoading,
    quantity,
    setQuantity,
    finalPrice,
    minusSale,
    onchangeClassification,
    classificationSelected,
    addToCartHandle,
    getMaxQuantity,
  };
}
