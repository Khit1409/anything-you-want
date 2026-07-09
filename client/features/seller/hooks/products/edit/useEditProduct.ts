import useEditProductHandle from "./useEditProductHandle";
import useEditProductQueries from "./useEditProductQueries";
import useEditProductForm from "./useEditProductForm";

export default function useEditProduct() {
  const handles = useEditProductHandle();
  const queries = useEditProductQueries();
  const formHook = useEditProductForm();
  return { ...handles, ...queries, ...formHook };
}
