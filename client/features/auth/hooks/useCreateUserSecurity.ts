import useAppModal from "@/features/common/hooks/useAppModal";
import useLoading from "@/features/common/hooks/useLoading";
import { CreateUserSecurity } from "@/features/user/interfaces/create.interface";
import { useForm } from "react-hook-form";
import { registerUserService } from "../services/auth.service";
import { useRouter } from "next/navigation";

export default function useCreateUserSecurity() {
  const { handleLoading } = useLoading();
  const { open } = useAppModal();
  const { replace } = useRouter();
  const formHook = useForm<{ data: CreateUserSecurity }>({
    defaultValues: {
      data: {
        currentPassword: "",
        emailAddress: "",
      },
    },
  });

  const submitForm = async (req: CreateUserSecurity) => {
    const res = await handleLoading(registerUserService, req);
    const { success, message } = res;

    console.log(message);

    open({ success, message });

    if (success) {
      replace("register/info");
    }
  };

  return { ...formHook, submitForm };
}
