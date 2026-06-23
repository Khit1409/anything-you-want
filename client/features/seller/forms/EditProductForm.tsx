import {
  ActionSection,
  CategorySection,
  ClassificationSection,
  ImageSection,
  InfoSection,
  PhysicalSection,
  ShippingSection,
} from "./sections/edit";
import EditVariantSection from "./sections/edit/EditVariantSection";
import { FormLayout } from "./components";
import { SectionShowDataLoading } from "@/features/common/components";
import NotFoundProduct from "@/features/product/components/common/NotFoundProduct";
import { useEditProductConext } from "@/sellerContexts/EditProductContext";

export default function EditProductForm() {
  const { handleSubmit, submitUpdate, isLoading, product } =
    useEditProductConext();
  if (isLoading) {
    return <SectionShowDataLoading />;
  }
  if (!product && !isLoading) {
    return <NotFoundProduct />;
  }
  return (
    <FormLayout
      title="Chỉnh sửa sản phẩm"
      subtitle="Cập nhật thông tin chi tiết cho sản phẩm"
    >
      <form onSubmit={handleSubmit((formData) => submitUpdate(formData.data))}>
        <div className="space-y-6">
          <CategorySection />
          <InfoSection />
          <ImageSection />
          <PhysicalSection />
          <ClassificationSection />
          <EditVariantSection />
          <ShippingSection />
          <ActionSection />
        </div>
      </form>
    </FormLayout>
  );
}
