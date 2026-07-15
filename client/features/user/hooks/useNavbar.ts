import useAuth from "@/features/auth/hooks/useAuth";
import useLogout from "@/features/auth/hooks/useLogout";
import useTheme from "@/features/common/hooks/useTheme";
import { useState } from "react";

export default function useNavbar() {
  const { isLoggedIn, authData } = useAuth();
  const { handleLogout } = useLogout();
  const { changeTheme, themeButtonIcon, themeButtonTitle } = useTheme();

  const [openResponsiveNav, setOpenResponsiveNav] = useState<boolean>(false);

  const openResponsive = () => {
    setOpenResponsiveNav((prev) => !prev);
  };

  return {
    isLoggedIn,
    authData,
    handleLogout,
    changeTheme,
    themeButtonIcon,
    themeButtonTitle,
    openResponsive,
    openResponsiveNav,
  };
}
