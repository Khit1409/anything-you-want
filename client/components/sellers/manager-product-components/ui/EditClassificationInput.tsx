import { faPen, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

interface Props {
  idInput: string;
  index: number;
  parentIndex?: number;
  defaultValue: string | number;
  typeInput: "number" | "text";
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditClassificationInput({
  idInput,
  index,
  parentIndex,
  defaultValue,
  onchange,
  typeInput,
}: Props) {
  const id = idInput + index;
  const checkboxRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
    if (inputRef.current) {
      inputRef.current.value = String(defaultValue);
    }
  };

  const handleSave = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <div className="flex items-center gap-1">
      <input
        type="checkbox"
        id={id}
        className="hidden peer"
        ref={checkboxRef}
      />

      {/* Edit Button */}
      <label
        htmlFor={id}
        className="peer-checked:hidden cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        title="Sửa"
      >
        <FontAwesomeIcon
          icon={faPen}
          className="text-gray-400 dark:text-gray-500 text-xs"
        />
      </label>

      {/* Input & Action Buttons */}
      <div className="hidden peer-checked:flex items-center gap-1">
        <input
          ref={inputRef}
          type={typeInput}
          data-parent-index={parentIndex}
          defaultValue={defaultValue}
          onChange={(e) => (onchange ? onchange(e) : {})}
          className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-xs w-20"
        />
        <button
          onClick={handleSave}
          className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
          title="Lưu"
        >
          <FontAwesomeIcon
            icon={faCheck}
            className="text-green-600 dark:text-green-400 text-xs"
          />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
          title="Hủy"
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="text-red-600 dark:text-red-400 text-xs"
          />
        </button>
      </div>
    </div>
  );
}
