import { getProvinces } from "@/features/address.feature";
import useAppModal from "@/features/common/hooks/useAppModal";
import useLoading from "@/features/common/hooks/useLoading";
import {
  CreateProductInfo,
  CreateProductRequest,
  ShippingMethod,
} from "@/features/product/interfaces/product.interface";
import { getCategoryService } from "@/features/product/services/category.service";
import { createProductService } from "@/features/seller/services/seller.service";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function useCreateProduct() {
  const { handleLoading } = useLoading();
  const appModal = useAppModal();
  const router = useRouter();
  const { data = { categories: [], provinces: [] }, refetch } = useQuery({
    queryKey: ["create-api"],
    queryFn: async () => {
      const [categories, provinces] = await Promise.all([
        getCategoryService(),
        getProvinces(),
      ]);
      return { categories, provinces };
    },
  });

  const { handleSubmit, register, setValue, watch, control } = useForm<{
    data: CreateProductRequest;
  }>({
    defaultValues: {
      data: {
        shipping: {
          methods: [
            {
              enabled: true,
              type: ShippingMethod.STANDARD,
              times: {
                deliveryDays: 1,
                prepareDays: 3,
              },
            },
            {
              enabled: false,
              type: ShippingMethod.EXPRESS,
              times: {
                deliveryDays: 0,
                prepareDays: 0,
              },
            },
            {
              enabled: false,
              type: ShippingMethod.INTERNATIONAL,
              times: {
                deliveryDays: 0,
                prepareDays: 0,
              },
            },
            {
              enabled: false,
              type: ShippingMethod.NEXTDAY,
              times: {
                deliveryDays: 0,
                prepareDays: 0,
              },
              supportedProvinces: [],
            },
            {
              enabled: false,
              type: ShippingMethod.PICKUP,
              supportedProvinces: [],
              times: {
                deliveryDays: 0,
                prepareDays: 0,
              },
            },
            {
              enabled: false,
              type: ShippingMethod.SAMEDAY,
              times: {
                deliveryDays: 0,
                prepareDays: 0,
              },
              supportedProvinces: [],
            },
            {
              enabled: false,
              type: ShippingMethod.SCHEDULED,
              times: {
                deliveryDays: 0,
                prepareDays: 0,
              },
              supportedProvinces: [],
            },
          ],
        },
        info: {
          name: "",
          brand: "",
          category: "",
          description: "",
          origin: "",
          price: 0,
          sale: 0,
        },
        images: {
          details: [],
        },
        classifications: [{ name: "", values: [{ name: "" }] }],
        physical: {
          dimensions: {
            height: 0,
            length: 0,
            width: 0,
          },
          weight: 0,
        },
      },
    },
  });

  const checkBeforeSubmit = (value: CreateProductRequest) => {
    const { classifications, images, info, shipping } = value;
    const isClassificationFalse =
      classifications.length == 0 ||
      classifications.find((f) => f.values.length == 0)
        ? true
        : false ||
            classifications.find((f) => f.name === "" || f.name === undefined)
          ? true
          : false;
    const isImageFalse = images.thumbnail === "" || images.details.length == 0;
    const isInfoFalse = Object.keys(info).find(
      (key) => info[key as keyof CreateProductInfo] === "",
    )
      ? true
      : false || info.price <= 0 || info.sale > 100 || info.sale < 0;
    const isShippingFalse = shipping.methods.find((f) => {
      const { enabled, supportedProvinces, type, times } = f;
      const { deliveryDays, prepareDays } = times;
      if (
        (type === ShippingMethod.SAMEDAY || type === ShippingMethod.PICKUP) &&
        enabled
      ) {
        if (supportedProvinces.length == 0) return true;
      }
      if (deliveryDays == 0 || prepareDays == 0) return true;
    });
    if (isInfoFalse)
      return "Vui lòng kiểm tra lại các thông tin cơ bản của sản phẩm!";

    if (isImageFalse) return "Vui lòng kiểm tra lại phần tạo ảnh sản phẩm!";

    if (isShippingFalse)
      return "Vui lòng kiểm tra lại cấu hình phương thức giao hàng!";

    if (isClassificationFalse)
      return "Vui lòng kiểm tra lại các phân loại và giá trị phân loại!";
  };

  async function submitCreate(req: CreateProductRequest) {
    const isValueFalse = checkBeforeSubmit(req);
    if (isValueFalse) {
      return appModal.open({ message: isValueFalse });
    }
    const res = await handleLoading(createProductService, req);
    const { message, success, data } = res;
    if (success) {
      router.replace(`/seller/products/${data.id}`);
    }

    if (refetch) {
      await refetch();
    }

    return appModal.open({ message, success });
  }

  const { categories, provinces } = data;
  return {
    categories,
    provinces,
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    submitCreate,
  };
}
