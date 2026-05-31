import useCreateProduct from "@/hooks/sellers/products/providers/useCreateProduct";

export default function PhysicalSection() {
  const { helpers } = useCreateProduct();
  const { onchangePhysical} = helpers;

  return (
    <div className="mb-6 bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Kích thước, trọng lượng sản phẩm
      </h3>

      <div className="text-(--text) w-full flex justify-evenly">
        <div className="text-sm flex flex-col gap-2">
          <label htmlFor="">Cân nặng</label>
          <input
            type="number"
            min={0}
            onChange={(e) => onchangePhysical(e)}
            name="weight"
            className="p-1 text-center border border-(--border) rounded outline-0"
            defaultValue={0}
          />
        </div>

        <div className="text-sm flex flex-col gap-2">
          <label htmlFor="">Chiều cao</label>
          <input
            type="number"
            min={0}
            onChange={(e) => onchangePhysical(e)}
            name="height"
            className="p-1 text-center border border-(--border) rounded outline-0"
            defaultValue={0}
          />
        </div>
        <div className="text-sm flex flex-col gap-2">
          <label htmlFor="">Chiều rộng</label>
          <input
            type="number"
            min={0}
            onChange={(e) => onchangePhysical(e)}
            name="width"
            className="p-1 text-center border border-(--border) rounded outline-0"
            defaultValue={0}
          />
        </div>
        <div className="text-sm flex flex-col gap-2">
          <label htmlFor="">Chiều dài</label>
          <input
            type="number"
            min={0}
            onChange={(e) => onchangePhysical(e)}
            name="length"
            className="p-1 text-center border border-(--border) rounded outline-0"
            defaultValue={0}
          />
        </div>
      </div>
    </div>
  );
}
