import { createProductInfoFormData } from "@/data";
import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { SectionCard, FormField } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

export default function EditInfoSection() {
  const { register } = useEditProductConext();

  return (
    <SectionCard title="Thông tin sản phẩm" icon={faInfo}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </SectionCard>
  );
}
