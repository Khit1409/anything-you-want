import { ProductDetail } from "@/interfaces/product.interface";

export default function useEditProductHelpers(product: ProductDetail | null) {
  const isSelectedCategory = (category: string) => {
    if (!product) return false;
    const productCategory = product.info.category;
    return productCategory.id === category || productCategory.name === category;
  };
  return { isSelectedCategory };
}
