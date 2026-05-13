import {
  ProductOption,
  ProductVariantOption,
  ProductVariants,
} from "@/interfaces/response/product.response";

/**
 * Tạo chuỗi SKU cho một tổ hợp variant dựa trên object `options`.
 * Ví dụ: options { color: 'red', size: 'M' } -> "sku-colorValue-sizeValue"
 */
export const createVariantSku = (options: ProductVariantOption): string => {
  const result =
    "sku" +
    Object.keys(options).reduce((acc, key) => {
      return acc + "-" + options[key];
    }, "");
  return result;
};

/**
 * Sinh tất cả product variants từ mảng `optionsChose`.
 * - Trả về mảng các biến thể, mỗi biến thể có `sku`, `stock`, `priceExtra` và `options`.
 * - Hàm dùng `createVariantSku` để sinh `sku` dựa trên thuộc tính `options`.
 */
export const createProductVariant = (optionsChose: Array<ProductOption>) => {
  const result = optionsChose.reduce(
    (acc: Array<ProductVariants>, option) => {
      const data: Array<ProductVariants> = [];
      acc.forEach((obj) => {
        option.values.forEach((vl) => {
          let newObject = {
            sku: "",
            stock: 0,
            priceExtra: 0,
            options: { ...(obj.options ?? {}), [option.key]: vl.value },
          };
          newObject = {
            ...newObject,
            sku: createVariantSku(newObject.options),
          };
          data.push(newObject);
        });
      });
      return data;
    },
    [
      {
        sku: "",
        stock: 0,
        priceExtra: 0,
        options: {},
      },
    ]
  );
  return result;
};
