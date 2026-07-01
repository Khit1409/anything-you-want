import { useLogoutMutation } from "../redux/auth.api";
import { redirect } from "next/navigation";
import useAppModal from "@/features/common/hooks/useAppModal";

export default function useLogout() {
  const [logout] = useLogoutMutation();
  const { open } = useAppModal();
  async function handleLogout() {
    const { message, success } = await logout().unwrap();
    open({ message, success });
    redirect("/login");
  }
  return {
    handleLogout,
  };
}
