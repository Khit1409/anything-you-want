import { useProductBestSellerContext } from "../../contexts/ProductBestSellerContext";
import { SectionShowDataLoading } from "@/features/common/components";
import NotFoundProduct from "../common/NotFoundProduct";
import ProductCard from "../common/ProductCard";

export default function BestSellerList() {
  const { products, isLoading } = useProductBestSellerContext();

  return (
    <section
      id="product-section"
      className="bg-(--surface) py-6 px-4 min-h-screen dark:bg-(--surface)"
    >
      {isLoading ? (
        <SectionShowDataLoading />
      ) : !products || products.length == 0 ? (
        <NotFoundProduct />
      ) : (
        <div
          id="product-list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-375 mx-auto mb-4"
        >
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </section>
  );
}
