import useCreateProductForm from "./useCreateProductForm";
import useCreateProductHandle from "./useCreateProductHandle";
import useCreateProductQueries from "./useCreateProductQueries";

export default function useCreateProduct() {
  const handles = useCreateProductHandle();
  const queries = useCreateProductQueries();
  const formHook = useCreateProductForm();
  return { ...handles, ...queries, ...formHook };
}
