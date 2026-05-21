import useEditProductHelpers from "../helpers/useEditProductHelpers";
import useSellerProductDetailQueries from "../queries/useSellerProductDetailQueries";

export default function useEditProduct() {
  const { categories, product } = useSellerProductDetailQueries();

  return { categories, product, ...useEditProductHelpers(product) };
}
