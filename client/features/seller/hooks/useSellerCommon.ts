import {
  replaceVnStr,
  strToObjKey,
  strToSlug,
} from "@/features/common/helpers/str.helper";
import {
  CreateProductVariants,
  ProductClassifications,
  UpdateProductVariants,
} from "@/features/product/interfaces/product.interface";

interface VariantHandleParams {
  name: string;
  classifications: ProductClassifications;
}

export default function useSellerCommon() {
  const createProductCode = (name: string) => {
    const str = replaceVnStr(name);
    const strKey = str.split(" ")[0];
    const randomNum = Math.floor(Math.random() * 1000).toString();
    return `${strKey}-${randomNum}`;
  };

  const createSku = (code: string, value1: string, value2?: string) => {
    let formatValue = `${strToSlug(value1)}`;
    if (value2) {
      formatValue = formatValue + `-${strToSlug(value2)}`;
    }
    return `${code}-${formatValue}`.toUpperCase();
  };

  function createVariants({ name, classifications }: VariantHandleParams) {
    const code = createProductCode(name);
    if (classifications.length == 1) {
      console.log("just 1 class");
      const variants = classifications.reduce(
        (acc: CreateProductVariants, current) => {
          current.values.forEach((value) => {
            acc.push({
              extraPrice: 0,
              options: {
                [strToObjKey(current.name)]: value.name,
              },
              sku: createSku(code, value.name),
              stock: 0,
            });
          });
          return acc;
        },
        [],
      );
      return variants;
    } else {
      console.log("than 1 class");
      const first = classifications[0];
      const variants = classifications
        .filter((_, index) => index > 0)
        .reduce((acc: CreateProductVariants, current) => {
          current.values.forEach((value) => {
            first.values.forEach((firstVl) => {
              const sku = createSku(code, firstVl.name, value.name);
              acc.push({
                sku,
                extraPrice: 0,
                options: {
                  [strToObjKey(first.name)]: firstVl.name,
                  [strToObjKey(current.name)]: value.name,
                },
                stock: 0,
              });
            });
          });
          return acc;
        }, []);
      return variants;
    }
  }
  function updateVariants({ name, classifications }: VariantHandleParams) {
    const code = createProductCode(name);
    if (classifications.length == 1) {
      console.log("just 1 class");
      const variants = classifications.reduce(
        (acc: UpdateProductVariants, current) => {
          current.values.forEach((value) => {
            acc.push({
              id: "",
              extraPrice: 0,
              options: {
                [strToObjKey(current.name)]: value.name,
              },
              sku: createSku(code, value.name),
              stock: 0,
            });
          });
          return acc;
        },
        [],
      );
      return variants;
    } else {
      console.log("than 1 class");
      const first = classifications[0];
      const variants = classifications
        .filter((_, index) => index > 0)
        .reduce((acc: UpdateProductVariants, current) => {
          current.values.forEach((value) => {
            first.values.forEach((firstVl) => {
              const sku = createSku(code, firstVl.name, value.name);
              acc.push({
                sku,
                extraPrice: 0,
                options: {
                  [strToObjKey(first.name)]: firstVl.name,
                  [strToObjKey(current.name)]: value.name,
                },
                stock: 0,
              });
            });
          });
          return acc;
        }, []);
      return variants;
    }
  }

  return { createProductCode, createSku, createVariants, updateVariants };
}
