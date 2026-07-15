import useAppModal from "@/features/common/hooks/useAppModal";
import useLoading from "@/features/common/hooks/useLoading";
import { CreateUserPhone } from "@/features/user/interfaces/create.interface";
import { createUserPhoneService } from "@/features/user/services/user.service";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";

export default function useCreateUserPhone() {
  const { handleLoading } = useLoading();
  const { open } = useAppModal();
  const { replace } = useRouter();
  const formHook = useForm<{ data: CreateUserPhone[] }>({
    defaultValues: {
      data: [
        {
          phoneNumber: "",
        },
      ],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: formHook.control,
    name: "data",
  });

  async function submitForm(req: CreateUserPhone[]) {
    const res = await handleLoading(createUserPhoneService, req);
    const { success, message } = res;
    open({ success, message });
    if (success) {
      replace("login");
    }
  }

  return { fields, remove, append, submitForm };
}
