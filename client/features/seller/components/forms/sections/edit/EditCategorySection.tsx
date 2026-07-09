import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { SectionCard, FormField } from "../../components";

export default function EditCategorySection() {
  const { categories, register, product } = useEditProductConext();

  return (
    <SectionCard title="Danh mục sản phẩm">
      <FormField label="Chọn danh mục" required>
        <select
          id="category"
          defaultValue={product?.info.category.id}
          {...register("data.info.category")}
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all cursor-pointer"
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
              {product &&
                product.info.category.id === category.id &&
                " ✓ (Hiện tại)"}
            </option>
          ))}
        </select>
      </FormField>
    </SectionCard>
  );
}
