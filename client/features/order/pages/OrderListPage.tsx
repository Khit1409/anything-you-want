import { Hero } from "@/features/user/components/layouts";
import OrderListContent from "../components/list/OrderListContent";
import ProductListContent from "@/features/product/components/list/ProductListContent";

export default function OrderListPage() {
  return (
    <>
      <Hero />
      <OrderListContent />
      <ProductListContent />
    </>
  );
}
