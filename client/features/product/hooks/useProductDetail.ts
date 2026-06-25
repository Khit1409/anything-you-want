import { useQuery } from "@tanstack/react-query";
import { getProductDetailService } from "../services/product.service";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useLoading from "@/features/common/hooks/useLoading";
import { addToCartService } from "@/features/cart/services/cart.service";
import useAppModal from "@/features/common/hooks/useAppModal";

export type SelectedClassifications = {
  name: string;
  value: string;
}[];

export default function useProductDetail() {
  const params: { id: string } = useParams();
  const id = params.id;
  const router = useRouter();

  const { data = { product: null, relateds: [] }, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return;
      return await getProductDetailService(id);
    },
    enabled: !!id,
  });
  const { product, relateds } = data;
  const { handleLoading } = useLoading();
  const { open } = useAppModal();
  const [optionIds, setOptionIds] = useState<{ name: string; id: string }[]>(
    [],
  );
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
    const variants = product.variants;
    const variant = variants.find((f) =>
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
    const productId = id;
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
    const { _id } = product;
    router.replace(`/orders/buy-now/${_id}`);
  }

  return {
    product,
    relateds,
    isLoading,
    id,
    onChangeOptionIds,
    setQuantity,
    quantity,
    optionIds,
    imagePreview,
    setImagePreview,
    sendCart,
    maxQuantity,
    redirectToOrder,
    getVariant,
  };
}
