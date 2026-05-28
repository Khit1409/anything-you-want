import CategorySection from "./CategorySection";
import ProductInfoSection from "./ProductInfoSection";
import ClassificationsSection from "./ClassificationsSection";
import ShippingSection from "./ShippingSection";
import ActionButtons from "./ActionButtons";
import ImageSection from "./ImageSection";

export default function CreateProductForm() {
  return (
    <div className="mx-auto px-4 h-(--h-seller)">
      <CategorySection />
      <ProductInfoSection />
      <ImageSection />
      <ClassificationsSection />
      <ShippingSection />
      <ActionButtons />
    </div>
  );
}
