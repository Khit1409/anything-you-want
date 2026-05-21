"use client";

import { ModalActionPayload } from "@/redux/state/app.state";

interface Props {
  open?: boolean;
  deleteHandle?: () => Promise<{
    payload: ModalActionPayload;
    type: "app/openModal";
  }>;
  onClose?: () => void;
}

export default function WarningRemoveProductModal({
  open,
  deleteHandle,
  onClose,
}: Props) {
  return (
    open == true && (
      <div>
        <p>Bạn có chắc muốn xóa không</p>
        <button
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              return;
            }
          }}
        >
          Hủy
        </button>
        <button
          onClick={async () => {
            if (deleteHandle) {
              await deleteHandle();
            } else {
              return;
            }
          }}
        >
          Xác nhận
        </button>
      </div>
    )
  );
}
