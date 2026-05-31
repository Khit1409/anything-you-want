import ActionButtons from "./ActionButtons";
import CategorySection from "./CategorySection";
import ClassificationsSection from "./ClassificationsSection";
import ImageSection from "./ImageSection";
import PhysicalSection from "./PhysicalSection";
import InfoSection from "./InfoSection";
import ShippingSection from "./ShippingSection";

export default function CreateProductForm() {
  return (
    <div className="mx-auto px-4 h-(--h-seller)">
      <CategorySection />
      <InfoSection />
      <ImageSection />
      <ClassificationsSection />
      <PhysicalSection />
      <ShippingSection />
      <ActionButtons />
    </div>
  );
}
