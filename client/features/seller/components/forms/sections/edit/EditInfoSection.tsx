import { createProductInfoFormData } from "@/shared/data/create-product-form.data";
import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { SectionCard, FormField } from "../../components";

export default function EditInfoSection() {
  const { register } = useEditProductConext();

  return (
    <SectionCard title="Thông tin sản phẩm">
      <FormField label={"Tên sản phẩm"}>
        <textarea
          {...register(`data.info.name`)}
          id={"name"}
          placeholder={"Tên sản phẩm của bạn"}
          className="w-full px-4 py-2.5 h-50 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all"
        />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
        {createProductInfoFormData.map((form) => (
          <FormField key={form.id} label={form.title}>
            <input
              {...register(`data.info.${form.name}`)}
              list={`${form.id}-list`}
              type={form.type}
              id={form.id}
              placeholder={form.message}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all"
            />
            {form.datalist && (
              <datalist id={`${form.id}-list`}>
                {form.datalist.map((data) => (
                  <option value={data.name} key={data.id} />
                ))}
              </datalist>
            )}
          </FormField>
        ))}
      </div>
      <FormField label={"Mô tả sản phẩm"}>
        <textarea
          {...register(`data.info.description`)}
          id={"description"}
          placeholder={"Mô tả sản phẩm của bạn"}
          className="w-full px-4 py-2.5 h-100 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all"
        />
      </FormField>
    </SectionCard>
  );
}
