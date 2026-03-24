import { fakeCategory } from "@/data/fakeData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Variants {
  sku: string;
  stock: number;
  price_extra: number;
  options: { [key: string]: string };
}

interface Options {
  key: string;
  label: string;
  values: Array<{ value: string; display: string; image?: string }>;
}

export default function useCreateProduct() {
  const [category, setCategory] = useState<string>(fakeCategory[0].slug);
  const [productOptions, setProductOption] = useState<Array<Options>>([]);
  const [productVariants, setProductVariants] = useState<Array<Variants>>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["variants", productOptions.length],
    queryFn: () => {
      const sku = "";
      const price_extra = 1000;
      const stock = 100;
      return productOptions.reduce(
        (acc: Array<Variants>, option) => {
          const data: Array<Variants> = [];
          acc.forEach((obj) => {
            option.values.forEach((vl) => {
              data.push({
                sku,
                stock,
                price_extra,
                options: { ...(obj.options ?? {}), [option.key]: vl.value },
              });
            });
          });
          return data;
        },
        [
          {
            sku,
            stock,
            price_extra,
            options: {},
          },
        ]
      );
    },
    enabled: productOptions.length > 0,
  });
  return {
    category,
    setCategory,
    productOptions,
    setProductOption,
    productVariants,
    setProductVariants,
    data,
    isLoading,
    isError,
  };
}
