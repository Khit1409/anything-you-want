import { useAppDispatch } from "@/shared/redux/selector";
import { LoginRequest } from "../interfaces/auth.interface";
import { useLoginMutation } from "../redux/auth.api";
import { openModal } from "@/features/common/redux/common.slice";
import { ModalState } from "@/features/common/redux/common.state";

export default function useLogin() {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const submitForm = async (req: LoginRequest) => {
    const res = await login(req).unwrap();
    const { message, success } = res;
    dispatch(
      openModal({
        message,
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      }),
    );
  };

  return { submitForm };
}
