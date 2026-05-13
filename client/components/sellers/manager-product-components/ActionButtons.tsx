interface Props {
  onCancel?: () => void;
  onSave: () => void;
}

export default function ActionButtons({ onCancel, onSave }: Props) {
  return (
    <div className="sticky bottom-0 left-0 right-0 mt-8 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-6 flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-8 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium transition-colors hover:bg-gray-50 active:bg-gray-100 flex items-center gap-2"
        >
          <i className="fas fa-times"></i>
          Hủy
        </button>
        <button
          onClick={onSave}
          className="px-8 py-2.5 rounded-lg bg-gray-800 text-white font-medium transition-colors hover:bg-gray-900 active:bg-black flex items-center gap-2"
        >
          <i className="fas fa-check"></i>
          Lưu sản phẩm
        </button>
      </div>
    </div>
  );
}
