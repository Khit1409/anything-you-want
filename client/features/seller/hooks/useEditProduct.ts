import { getProvinces } from "@/features/address.feature";
import useAppModal from "@/features/common/hooks/useAppModal";
import useLoading from "@/features/common/hooks/useLoading";
import { EditProductRequest } from "@/features/product/interfaces/product.interface";
import { getCategoryService } from "@/features/product/services/category.service";
import { updateProductService } from "@/features/product/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { getSellerProductDetailService } from "../services/seller.service";
import { useEffect } from "react";
import useSellerCommon from "./useSellerCommon";

export default function useEditProduct() {
  const params: { id: string } = useParams();
  const id = params.id;
  const { handleLoading } = useLoading();
  const appModal = useAppModal();
  const { updateVariants } = useSellerCommon();
  const { data = { categories: [], provinces: [], product: null }, refetch } =
    useQuery({
      queryKey: ["create-api", id],
      queryFn: async () => {
        const [categories, provinces, product] = await Promise.all([
          getCategoryService(),
          getProvinces(),
          getSellerProductDetailService(id),
        ]);
        return { categories, provinces, product };
      },
      enabled: !!id,
    });
  const { categories, provinces, product } = data;

  const { handleSubmit, register, setValue, watch, control, reset, getValues } =
    useForm<{
      data: EditProductRequest;
    }>();

  useEffect(() => {
    console.log(product);
    if (!product) return;
    const { classifications, images, info, physical, shipping, variants } =
      product;
    const { category } = info;
    reset({
      data: {
        classifications,
        images,
        info: { ...info, category: category.id },
        physical,
        shipping,
        variants,
      },
    });
  }, [product, reset]);

  async function submitUpdate(req: EditProductRequest) {
    const res = await handleLoading(updateProductService, id, req);
    const { message, success } = res;

    if (refetch) {
      await refetch();
    }
    return appModal.open({ message, success });
  }

  function addNewVariants() {
    const name = getValues("data.info.name");
    if (!name || name === "") return;
    const classifications = getValues("data.classifications");
    if (!classifications || classifications.length == 0) return;
    const variants = updateVariants({ name, classifications });
    console.log("before", getValues("data.variants"));
    setValue("data.variants", variants);
    console.log("after", getValues("data.variants"));
  }

  return {
    categories,
    provinces,
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    submitUpdate,
    product,
    addNewVariants,
  };
}
