import useAppModal from "@/features/common/hooks/useAppModal";
import useLoading from "@/features/common/hooks/useLoading";
import { uploadOneImage } from "@/features/common/services/upload.service";
import { CreateUserInfo } from "@/features/user/interfaces/create.interface";
import { createInfoService } from "@/features/user/services/user.service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function useCreateUserInfo() {
  const { open } = useAppModal();
  const { handleLoading } = useLoading();
  const { replace } = useRouter();
  const formHook = useForm<{ data: CreateUserInfo }>({
    defaultValues: {
      data: {
        avatar: null,
        firstName: "",
        fullName: "",
        lastName: "",
      },
    },
  });

  const onChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0];
    if (!file) return;
    const { url } = await handleLoading(uploadOneImage, file);
    return formHook.setValue("data.avatar", url);
  };

  async function submitForm(req: CreateUserInfo) {
    const res = await handleLoading(createInfoService, req);
    const { success, message } = res;
    open({ success, message });

    if (success) {
      replace("/register/addresses");
    }
  }

  return { ...formHook, submitForm, onChangeAvatar };
}
