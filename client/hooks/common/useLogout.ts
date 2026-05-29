import { logoutService } from "@/api/auth.api";
import { openModal } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";
import { AppDispatch } from "@/redux/store";
import { authThunk } from "@/redux/thunk/auth.thunk";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import useLoading from "./useLoading";

export default function useLogout() {
  const dispatch = useDispatch<AppDispatch>();
  const { handleLoading } = useLoading({ dispatch });
  async function handleLogout() {
    const { message, success } = await handleLoading(logoutService);
    if (!success) {
      return dispatch(openModal({ message, state: ModalState.ERROR }));
    }
    dispatch(authThunk());

    redirect("/login");
  }
  return {
    handleLogout,
  };
}
