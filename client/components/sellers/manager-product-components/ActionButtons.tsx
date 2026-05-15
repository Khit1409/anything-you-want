interface Props {
  onCancel?: () => void;
  onSave: () => void;
}

export default function ActionButtons({ onCancel, onSave }: Props) {
  return (
    <div className="sticky bottom-0 left-0 right-0 mt-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-4 flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="px-6 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Hủy
        </button>
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
