import { SESSION_KEY } from "@/constants/session.constant";
import { useAppSelector } from "@/shared/redux/selector";
import { setSessionItem } from "@/utils/session.util";
import { usePathname, useRouter } from "next/navigation";

export default function useAuth() {
  const pathName = usePathname();
  const { initialized, isLoggedIn, authData, error, isLoading } =
    useAppSelector((state) => state.auth);
  const { replace } = useRouter();

  function needLoginHandle(): { needLogin: boolean; fn?: () => void } {
    const toLogin = () => {
      console.log("need login");
      setSessionItem(SESSION_KEY.BACK_URL, pathName);
      return replace("/login");
    };
    if (!isLoading && initialized && !isLoggedIn) {
      return { needLogin: true, fn: toLogin };
    }
    return { needLogin: false };
  }
  return { initialized, isLoggedIn, authData, error, needLoginHandle };
}
