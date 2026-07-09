import {
  getProvinces,
  Provinces,
} from "@/features/common/services/address.service";
import {
  Categories,
  ProductDetail,
} from "@/features/product/interfaces/read.interface";
import { getCategoryService } from "@/features/product/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { getSellerProductDetailService } from "../../../services/seller.service";
import { useParams } from "next/navigation";

interface QueryResult {
  product: ProductDetail | null;
  provinces: Provinces;
  categories: Categories;
}

export default function useEditProductQueries() {
  const params: { id: string } = useParams();
  const id = params.id;
  const defaultData = { categories: [], provinces: [], product: null };
  const { data = defaultData, isLoading } = useQuery<QueryResult>({
    queryKey: ["editApi", id],
    queryFn: async () => {
      const [categories, provinces, product] = await Promise.all([
        getCategoryService(),
        getProvinces(),
        getSellerProductDetailService(id),
      ]);
      return { categories, provinces, product };
    },
    enabled: !!id,
  });
  return { ...data, isLoading, id };
}
