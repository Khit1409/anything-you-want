import { LoginRequest } from "../interfaces/auth.interface";
import { useLoginMutation } from "../redux/auth.api";
import useAppModal from "@/features/common/hooks/useAppModal";

export default function useLogin() {
  const { open } = useAppModal();
  const [login] = useLoginMutation();

  const submitForm = async (req: LoginRequest) => {
    const res = await login(req).unwrap();
    const { message, success } = res;
    open({ message, success });
  };

  return { submitForm };
}
