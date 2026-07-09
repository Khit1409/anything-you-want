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
import { useEffect } from "react";

export default function EditProductForm() {
  const { isLoading, product, reset, handleSubmit, submitUpdate } =
    useEditProductConext();

  useEffect(() => {
    if (isLoading) return;
    if (!product) return;
    const { classifications, images, info, physical, shipping, variants } =
      product;
    const { category } = info;
    reset({
      data: {
        classifications,
        images,
        info: { ...info, category: category.id },
        physical,
        shipping,
        variants,
      },
    });
  }, [product, reset, isLoading]);

  if (isLoading) {
    return <SectionShowDataLoading />;
  }
  if (!product) {
    return <NotFoundProduct />;
  }

  return (
    <FormLayout
      title="Chỉnh sửa sản phẩm"
      subtitle="Cập nhật thông tin chi tiết cho sản phẩm"
    >
      <form
        onSubmit={handleSubmit((formData) =>
          submitUpdate(formData.data, product._id),
        )}
      >
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
