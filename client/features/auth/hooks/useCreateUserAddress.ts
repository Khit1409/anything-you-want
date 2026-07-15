import useAppModal from "@/features/common/hooks/useAppModal";
import useLoading from "@/features/common/hooks/useLoading";
import { getAddressApi } from "@/features/common/services/address.service";
import { CreateUserAddress } from "@/features/user/interfaces/create.interface";
import { createUserAddressService } from "@/features/user/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useFieldArray, useForm } from "react-hook-form";

export default function useCreateUserAddress() {
  const {
    data = {
      provinces: [],
      wards: [],
    },
  } = useQuery({
    queryKey: ["address"],
    queryFn: async () => {
      return await getAddressApi();
    },
  });
  const { handleLoading } = useLoading();
  const { open } = useAppModal();
  const { replace } = useRouter();
  const formHook = useForm<{ data: CreateUserAddress[] }>({
    defaultValues: {
      data: [
        {
          addressDetail: "",
          province: "",
          ward: "",
        },
      ],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: formHook.control,
    name: "data",
  });

  async function submitForm(req: CreateUserAddress[]) {
    const res = await handleLoading(createUserAddressService, req);
    const { success, message } = res;
    open({ success, message });
    if (success) {
      replace("/register/phones");
    }
  }

  return { fields, remove, append, ...data, submitForm, ...formHook };
}
