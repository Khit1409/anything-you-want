import useEditProductHelpers from "../helpers/useEditProductHelpers";
import useSellerProductDetailQueries from "../queries/useProductDetailQueries";

export default function useEditProductActions() {
  const { categories, product } = useSellerProductDetailQueries();

  return { categories, product, ...useEditProductHelpers(product) };
}
