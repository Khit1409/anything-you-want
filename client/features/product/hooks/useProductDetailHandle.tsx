import useLoading from "@/features/common/hooks/useLoading";
import { ProductDetail } from "../interfaces/read.interface";
import useAppModal from "@/features/common/hooks/useAppModal";
import { useState } from "react";
import useAuth from "@/features/auth/hooks/useAuth";
import { addToCartService } from "@/features/cart/services/cart.service";
import { useRouter } from "next/navigation";

type OptionIds = { name: string; id: string }[];

export default function useProductDetailHandle(product: ProductDetail | null) {
  const { needLoginHandle } = useAuth();
  const { handleLoading } = useLoading();
  const { open } = useAppModal();
  const { replace } = useRouter();
  const [optionIds, setOptionIds] = useState<OptionIds>([]);
  const [imagePreview, setImagePreview] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);

  const onChangeOptionIds = (id: string, name: string) => {
    if (!product) return;
    const exist = optionIds.find((f) => f.name === name);
    if (exist) {
      return setOptionIds((prev) =>
        prev.map((m) => (m.name === name ? { ...m, id } : m)),
      );
    }
    return setOptionIds((prev) => [...prev, { name, id }]);
  };

  const getVariant = () => {
    if (!product) return;
    if (optionIds.length !== product.classifications.length) return;
    const variant = product.variants.find((f) =>
      f.optionIds.every((id) => optionIds.find((fo) => fo.id === id)),
    );
    return variant;
  };

  const maxQuantity = () => {
    const variant = getVariant();
    if (!variant) return;
    const { stock } = variant;
    return stock;
  };

  async function sendCart() {
    if (!product) return;
    const { needLogin, fn } = needLoginHandle();
    if (needLogin && fn) {
      return fn();
    }
    const productId = product._id;
    const correctLengt = product.classifications.length;
    if (correctLengt !== optionIds.length) {
      return open({ message: "Vui lòng chọn đủ lựa chọn!" });
    }
    if (quantity <= 0) {
      return open({ message: "Vui lòng chọn số lượng phù hợp" });
    }
    const variant = getVariant();
    if (!variant) {
      return open({ message: "Không tìm thấy biến thể đã lựa chọn!" });
    }
    const { sku } = variant;

    const res = await handleLoading(addToCartService, {
      sku,
      productId,
      quantity,
    });
    const { message, success } = res;
    return open({ message, success });
  }

  function redirectToOrder() {
    if (!product) return;
    replace(`/orders/buy-now/${product._id}`);
  }

  return {
    redirectToOrder,
    sendCart,
    optionIds,
    maxQuantity,
    setOptionIds,
    imagePreview,
    setImagePreview,
    setQuantity,
    quantity,
    onChangeOptionIds,
  };
}
