import { EditProductVariantForm } from "@/components/sellers/products";
import { useParams } from "next/navigation";


export default function UpdateVariantPage() {
  const params: { id: string } = useParams();
  return <EditProductVariantForm productId={params.id} />;
}
