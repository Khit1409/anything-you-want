import { useAppDispatch } from "@/shared/redux/selector";
import { ModalState } from "../redux/common.state";
import { openModal } from "../redux/common.slice";
interface OpenModalParams {
  success?: boolean;
  message: string;
}

export default function useAppModal() {
  const dispatch = useAppDispatch();

  function open({ message, success }: OpenModalParams) {
    let state;
    switch (success) {
      case undefined:
        state = ModalState.WARNING;
        break;
      case true:
        state = ModalState.SUCCESS;
        break;
      case false:
        state = ModalState.ERROR;
        break;
      default:
        state = ModalState.ERROR;
        break;
    }
    return dispatch(openModal({ message, state }));
  }

  return { open };
}
