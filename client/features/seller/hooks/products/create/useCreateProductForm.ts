import { CreateProductRequest } from "@/features/product/interfaces/create.interface";
import { ShippingMethod } from "@/features/product/interfaces/read.interface";
import { useForm } from "react-hook-form";

export default function useCreateProductForm() {
  const createUseForm = useForm<{
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
  return { ...createUseForm };
}
