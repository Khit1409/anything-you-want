import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { SectionCard, FormField } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";

export default function EditPhysicalSection() {
  const { register } = useEditProductConext();

  return (
    <SectionCard title="Kích thước và trọng lượng" icon={faRuler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FormField label="Cân nặng (kg)">
          <input
            type="number"
            min={0}
            step={0.1}
            {...register("data.physical.weight")}
            placeholder="0"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all"
          />
        </FormField>

        <FormField label="Chiều cao (cm)">
          <input
            type="number"
            min={0}
            step={0.1}
            {...register("data.physical.dimensions.height")}
            placeholder="0"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all"
          />
        </FormField>

        <FormField label="Chiều rộng (cm)">
          <input
            type="number"
            min={0}
            step={0.1}
            {...register("data.physical.dimensions.width")}
            placeholder="0"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all"
          />
        </FormField>

        <FormField label="Chiều dài (cm)">
          <input
            type="number"
            min={0}
            step={0.1}
            {...register("data.physical.dimensions.length")}
            placeholder="0"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all"
          />
        </FormField>
      </div>
    </SectionCard>
  );
}
