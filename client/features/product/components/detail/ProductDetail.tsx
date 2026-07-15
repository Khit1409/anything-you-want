import { useProductDetailContext } from "@/productContexts/ProductDetailContext";
import ShippingSection from "./ShippingSection";
import ProductRelated from "../list/ProductRelated";
import ProductAction from "./ProductAction";
import ProductClassificationPreview from "./ProductClassification";
import ProductImage from "./ProductImage";
import ProductInformation from "./ProductInformation";
import ProductRatingSection from "./ProductRating";
import QuantityAddCart from "./QuantityAddCart";
import ProductDescription from "./ProductDescription";
import HashtagsSection from "./HashtagsSection";

export default function ProductDetail() {
  const { product, relateds } = useProductDetailContext();
  if (!product) return null;
  const { shipping } = product;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
      <div className="overflow-hidden sm:p-6 lg:p-8">
        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="mx-auto w-full max-w-2xl flex-1">
            <div className="mb-3">
              <ProductImage />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 max-w-xl">
            <ProductInformation />
            <ProductRatingSection />
            <ShippingSection shipping={shipping} />
            <ProductClassificationPreview />
            <QuantityAddCart />
            <ProductAction />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <ProductDescription description={product.info.description} />
        <HashtagsSection tags={product.tags} />
      </div>

      <div className="mt-10 sm:mt-12">
        {relateds.length > 0 && <ProductRelated products={relateds} />}
      </div>
    </div>
  );
}
