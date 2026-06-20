import { useProductDetailContext } from "../../contexts/ProductDetailContext";
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

  const { shipping } = product;

  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ProductImage />
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <ProductInformation />
            <ProductRatingSection />
            <ShippingSection shipping={shipping} forElement="detail" />
            <ProductClassificationPreview />
            <QuantityAddCart />
            <ProductAction />
          </div>
        </aside>
      </div>

      <div className="mt-8">
        {relateds.length > 0 && <ProductRelated products={relateds} />}
      </div>
    </div>
  );
}
