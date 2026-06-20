import { useAppDispatch } from "@/shared/redux/selector";
import { ModalState } from "@/features/common/redux/common.state";
import { openModal } from "@/features/common/redux/common.slice";
import { useLogoutMutation } from "../redux/auth.api";
import { redirect } from "next/navigation";

export default function useLogout() {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    const { message, success } = await logout().unwrap();
    dispatch(
      openModal({
        message,
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      }),
    );
    redirect("/login");
  }
  return {
    handleLogout,
  };
}
