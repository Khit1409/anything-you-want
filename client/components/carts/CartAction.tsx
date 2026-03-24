import { CartUpdateDataRequest } from "@/interfaces/request/cart.request";

interface Props {
  submitUpdate: () => void;
  cartId: string;
  updateData?: CartUpdateDataRequest;
  submitDelete: (id: string) => Promise<void>;
}
export default function CartAction({
  submitUpdate,
  updateData,
  cartId,
  submitDelete,
}: Props) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => submitUpdate()}
        disabled={!updateData}
        className="w-full text-gray-600 hover:text-white hover:bg-green-600 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300 hover:border-green-600"
      >
        <i className="fas fa-sync-alt"></i>
        Cập Nhật
      </button>
      <button
        onClick={() => submitDelete(cartId)}
        className="text-gray-600 hover:text-white hover:bg-red-600 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 border border-gray-300 hover:border-red-600"
      >
        <i className="fas fa-trash-alt"></i>
        Xóa
      </button>
    </div>
  );
}
