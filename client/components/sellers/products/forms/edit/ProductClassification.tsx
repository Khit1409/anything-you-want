import { ProductClassifications as Classifications } from "@/interfaces/product.interface";
import ProductClassificationValue from "./ProductClassificationValue";
import EditClassificationInput from "../../ui/EditClassificationInput";

interface Props {
  classifications: Classifications;
}

export default function ProductClassification({ classifications }: Props) {
  return (
    <div className="p-4 rounded-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-5">
      {classifications.length === 0 ? (
        <div className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
          Không có phân loại sản phẩm
        </div>
      ) : (
        classifications.map((classifi, index) => (
          <div
            key={index}
            className="border-b border-gray-100 dark:border-gray-800 pb-5 last:border-0 last:pb-0"
          >
            {/* Classification Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="">{index + 1}.</span>
                <div className="flex items-center gap-2">
                  <h5 className="text-base font-semibold text-gray-900 dark:text-gray-100 uppercase">
                    {classifi.name}
                  </h5>
                  <EditClassificationInput
                    typeInput="text"
                    idInput="classification-name"
                    index={index}
                    defaultValue={classifi.name}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {classifi.values.length} biến thể
              </div>
            </div>

            {/* Classification Values */}
            <div className="space-y-2 ml-11 grid grid-cols-4 gap-3">
              {classifi.values.map((classifiValue, indexVl) => (
                <ProductClassificationValue
                  key={indexVl}
                  value={classifiValue}
                  parentIndex={index}
                  indexVl={indexVl}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
