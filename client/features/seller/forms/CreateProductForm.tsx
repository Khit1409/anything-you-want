"use client";

import InfoSection from "./sections/create/InfoSection";
import CategorySection from "./sections/create/CategorySection";
import ImageSection from "./sections/create/ImageSection";
import PhysicalSection from "./sections/create/PhysicalSection";
import ShippingSection from "./sections/create/ShippingSection";
import ClassificationSection from "./sections/create/ClassificationSection";
import ActionSection from "./sections/create/ActionSection";
import { useCreateProductContext } from "../contexts/CreateProductContext";
import { FormLayout } from "./components";

export default function CreateProductForm() {
  const { handleSubmit, submitCreate } = useCreateProductContext();
  return (
    <FormLayout
      title="Tạo sản phẩm mới"
      subtitle="Nhập thông tin chi tiết cho sản phẩm của bạn"
    >
      <form onSubmit={handleSubmit((req) => submitCreate(req.data))}>
        <div className="space-y-6">
          <CategorySection />
          <InfoSection />
          <ImageSection />
          <PhysicalSection />
          <ShippingSection />
          <ClassificationSection />
          <ActionSection />
        </div>
      </form>
    </FormLayout>
  );
}
