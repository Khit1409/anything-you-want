import { registerSellerService } from "@/api";
import { SELLER_FORM_INPUT_LIST } from "@/data/register-seller-form";
import useLoading from "@/hooks/common/useLoading";
import { RegisterSellerAccount, RegisterSellerInfo } from "@/interfaces";
import { CreateStoreInfoRequest } from "@/interfaces/store.interface";
import { AppDispatch, ModalState, openModal } from "@/redux";

interface ActionProps {
  dispatch: AppDispatch;
}

export default function useRegisterSellerActions({ dispatch }: ActionProps) {
  const { handleLoading } = useLoading({ dispatch });
  const checkStoreInfo = (storeInfo: CreateStoreInfoRequest) => {
    const invalidInfo = Object.keys(storeInfo).find(
      (key) =>
        key !== "avatar" &&
        key !== "thumbnail" &&
        (storeInfo[key as keyof CreateStoreInfoRequest]?.trim() === "" ||
          !storeInfo[key as keyof CreateStoreInfoRequest])
    );

    if (invalidInfo) {
      return SELLER_FORM_INPUT_LIST.store.info.find(
        (f) => f.name === invalidInfo
      )!.label;
    }
    return null;
  };
  const checkInfo = (info: RegisterSellerInfo) => {
    const inValidInfo = Object.keys(info).find(
      (key) =>
        key !== "avatar" &&
        (info[key as keyof RegisterSellerInfo] === "" ||
          !info[key as keyof RegisterSellerInfo]?.trim())
    );

    if (inValidInfo) {
      const labelOfKey = SELLER_FORM_INPUT_LIST.info.find(
        (f) => f.name === inValidInfo
      )!.label;

      return labelOfKey;
    }
    return null;
  };
  const checkAuthInputValue = (
    currentPassword: string,
    rePassword: string,
    emailAddress: string
  ) => {
    if (currentPassword !== rePassword) {
      return "Vui lòng nhập mật khẩu trùng khớp!";
    }
    if (!currentPassword!.trim() || !rePassword!.trim()) {
      return "Vui lòng nhập mật khẩu!";
    }
    if (!emailAddress.trim()) {
      return "Vui lòng nhật email!";
    }

    return null;
  };

  //kiểm tra chắn chắn nhập liệu đúng (không tin vào required của input element)
  function handleRegisterValue(
    registerData: RegisterSellerAccount & { rePassword: string }
  ) {
    const {
      addresses,
      currentPassword,
      emailAddress,
      info,
      phones,
      rePassword,
      store,
    } = registerData;

    const invalidAuth = checkAuthInputValue(
      currentPassword,
      rePassword,
      emailAddress
    );

    if (invalidAuth !== null) {
      return dispatch(
        openModal({ message: invalidAuth, state: ModalState.WARNING })
      );
    }

    const inValidInfo = checkInfo(info);
    if (inValidInfo) {
      const labelOfKey = SELLER_FORM_INPUT_LIST.info.find(
        (f) => f.name === inValidInfo
      )!.label;
      return dispatch(
        openModal({
          message: `${labelOfKey} không được để trống!`,
          state: ModalState.WARNING,
        })
      );
    }

    const invalidStoreInfo = checkStoreInfo(store.info);
    if (invalidStoreInfo) {
      return dispatch(
        openModal({
          message: `${inValidInfo} không được để trống!`,
          state: ModalState.WARNING,
        })
      );
    }
    return {
      addresses,
      currentPassword,
      emailAddress,
      info,
      phones,
      store,
    };
  }

  async function submitForm(
    data: RegisterSellerAccount & { rePassword: string }
  ) {
    const successCheckingData = handleRegisterValue(
      data
    ) as RegisterSellerAccount; // nếu có lỗi giá trị return dispatch model nên không lo

    const result = await handleLoading(
      registerSellerService,
      successCheckingData
    );

    const { message, success } = result;
    return dispatch(
      openModal({
        message,
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      })
    );
  }

  return { submitForm };
}
