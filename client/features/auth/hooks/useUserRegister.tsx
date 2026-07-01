import {
  getProvinces,
  getWards,
} from "@/features/common/services/address.service";
import useLoading from "@/features/common/hooks/useLoading";
import { RegisterUserAccountRequest } from "@/features/user/interfaces/user.interface";
import { registerService } from "@/features/user/services/user.service";
import { useQuery } from "@tanstack/react-query";
import useAppModal from "@/features/common/hooks/useAppModal";

export default function useUserRegister() {
  const { data = { provinces: [], wards: [] } } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const [wards, provinces] = await Promise.all([
        getWards(),
        getProvinces(),
      ]);
      return { wards, provinces };
    },
  });

  const { handleLoading } = useLoading();
  const { open } = useAppModal();

  async function submitRegister(data: RegisterUserAccountRequest) {
    const res = await handleLoading(registerService, data);

    const { message, success } = res;

    return open({ message, success });
  }

  return { addressApi: data, submitRegister };
}
