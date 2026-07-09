import useManagerProductListHandle from "./useManagerProductListHandle";
import useManagerProductListQueries from "./useManagerProductListQueries";

export default function useManagerProductList() {
  const handles = useManagerProductListHandle();
  const { filter } = handles;
  const queries = useManagerProductListQueries(filter);

  const { products, isLoading } = queries;

  const isEmpty = !isLoading && products.length == 0;
  const isShow = !isLoading && products.length !== 0;
  console.log("hook", products);

  return {
    isEmpty,
    isShow,
    ...queries,
    ...handles,
  };
}
