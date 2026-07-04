import { SESSION_KEY } from "@/constants/session.constant";
import { useAppSelector } from "@/shared/redux/selector";
import { setSessionItem } from "@/utils/session.util";
import { usePathname, useRouter } from "next/navigation";

export default function useAuth() {
  const pathName = usePathname();
  const { initialized, isLoggedIn, authData, error, isLoading } =
    useAppSelector((state) => state.auth);
  const router = useRouter();

  function needLogin() {
    if (!isLoading && initialized && !isLoggedIn) {
      setSessionItem(SESSION_KEY.BACK_URL, pathName);
      router.replace("/login");
    }
  }
  return { initialized, isLoggedIn, authData, error, needLogin };
}
