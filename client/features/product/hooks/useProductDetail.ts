import { useParams } from "next/navigation";
import useProductDetailQuery from "./useProductDetailQuery";
import useProductDetailHandle from "./useProductDetailHandle";

export type SelectedClassifications = {
  name: string;
  value: string;
}[];

export default function useProductDetail() {
  const params: { id: string } = useParams();
  const id = params.id;
  const query = useProductDetailQuery(id);
  const handle = useProductDetailHandle(query.product);
  return {
    id,
    ...query,
    ...handle,
  };
}
