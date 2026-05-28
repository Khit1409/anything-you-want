import useCreateProduct from "@/hooks/sellers/products/providers/useCreateProduct";

export default function ActionButtons() {
  const { helpers, actions } = useCreateProduct();
  const { validatePayload, images, productInfo, classifications, shipping } =
    helpers;
  const { createProduct } = actions;
  const onSave = async () => {
    validatePayload();
    await createProduct({
      images,
      info: productInfo,
      classifications,
      shipping,
    });
  };
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 mb-6">
      <div className="max-w-4xl mx-auto px-3 flex gap-2 my-6">
        <button
          onClick={onSave}
          className="px-6 py-2 text-sm bg-gray-700 dark:bg-gray-700 text-white rounded hover:bg-gray-800 dark:hover:bg-gray-600"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
