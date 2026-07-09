import { useProductDetailContext } from "@/productContexts/ProductDetailContext";
import ShippingSection from "../common/ShippingSection";
import ProductRelated from "../list/ProductRelated";
import ProductAction from "./ProductAction";
import ProductClassificationPreview from "./ProductClassification";
import ProductImage from "./ProductImage";
import ProductInformation from "./ProductInformation";
import ProductRatingSection from "./ProductRating";
import QuantityAddCart from "./QuantityAddCart";

export default function ProductDetail() {
  const { product, relateds } = useProductDetailContext();
  if (!product) return null;
  const { shipping } = product;

  return (
    <div className="mt-6 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
      <div className="flex flex-col gap-6 p-3 sm:p-5 lg:p-6">
        <div className="w-full max-w-2xl mx-auto">
          <ProductImage />
        </div>

        <div className="flex flex-col gap-5">
          <ProductInformation />
          <ProductRatingSection />
          <ShippingSection shipping={shipping} forElement="detail" />
          <ProductClassificationPreview />
          <QuantityAddCart />
          <ProductAction />
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        {relateds.length > 0 && <ProductRelated products={relateds} />}
      </div>
    </div>
  );
}
