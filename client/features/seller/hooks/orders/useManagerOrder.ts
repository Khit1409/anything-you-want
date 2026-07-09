import useManagerOrderHandle from "./useManagerOrderHandle";
import useManagerOrderQueries from "./useManagerOrderQueries";

export default function useManagerOrder() {
  const handles = useManagerOrderHandle();
  const { filter } = handles;
  const queries = useManagerOrderQueries(filter);

  return { ...queries, ...handles };
}
