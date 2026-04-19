import useCartList from "@/hooks/carts/useCartList";
import SectionShowDataLoading from "../common/SectionShowDataLoading";
import NotFoundCart from "./NotFoundCart";

export default function CartList() {
  const { carts, isLoading } = useCartList();

  return (
    <div id="cart-list" className="min-h-screen bg-gray-50 px-4 py-6">
      {isLoading ? (
        <SectionShowDataLoading />
      ) : carts.length == 0 ? (
        <NotFoundCart />
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4"></div>
        </div>
      )}
    </div>
  );
}
