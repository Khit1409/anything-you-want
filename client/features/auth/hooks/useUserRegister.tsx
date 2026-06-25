import {
  getProvinces,
  getWards,
} from "@/features/common/services/address.service";
import useLoading from "@/features/common/hooks/useLoading";
import { RegisterUserAccountRequest } from "@/features/user/interfaces/user.interface";
import { registerService } from "@/features/user/services/user.service";
import { AppDispatch, ModalState, openModal } from "@/redux";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch<AppDispatch>();

  const { handleLoading } = useLoading();

  async function submitRegister(data: RegisterUserAccountRequest) {
    const res = await handleLoading(registerService, data);

    const { message, success } = res;
    if (!success) {
      return dispatch(openModal({ message, state: ModalState.ERROR }));
    }
    return dispatch(openModal({ message, state: ModalState.SUCCESS }));
  }

  return { addressApi: data, submitRegister };
}
