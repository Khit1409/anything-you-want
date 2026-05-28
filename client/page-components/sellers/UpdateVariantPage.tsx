import EditProductVariantForm from "@/components/sellers/manager-product-components/form/EditProductVariantForm";
import { useParams } from "next/navigation";


export default function UpdateVariantPage() {
  const params: { id: string } = useParams();
  return <EditProductVariantForm productId={params.id} />;
}
