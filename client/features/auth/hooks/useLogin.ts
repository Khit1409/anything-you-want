import { getSessionItem } from "@/utils/session.util";
import { LoginRequest } from "../interfaces/auth.interface";
import { useLoginMutation } from "../redux/auth.api";
import useAppModal from "@/features/common/hooks/useAppModal";
import { SESSION_KEY } from "@/constants/session.constant";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const { open } = useAppModal();
  const [login] = useLoginMutation();
  const router = useRouter();

  const submitForm = async (req: LoginRequest) => {
    const res = await login(req).unwrap();
    const { message, success } = res;
    open({ message, success });
    const url = getSessionItem<string>(SESSION_KEY.BACK_URL);
    if (url) {
      router.replace(url);
    }
  };

  return { submitForm };
}
