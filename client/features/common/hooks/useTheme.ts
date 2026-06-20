import { useAppDispatch, useAppSelector } from "@/shared/redux/selector";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { changeWebMode, setWebMode } from "../redux/common.slice";

/**
 * Hook dùng chung cho việc thay đổi chế độ sáng / tối của trang web
 * @returns
 */
export default function useTheme() {
  const { theme } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  /**
   * Đổi chế độ
   */
  function changeTheme() {
    return dispatch(changeWebMode());
  }

  const themeButtonTitle =
    theme === "dark" ? "Chuyển chế độ sáng" : "Chuyển chế độ tối";
  const themeButtonIcon = theme === "dark" ? faSun : faMoon;
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      dispatch(setWebMode(saved));
    } else {
      dispatch(setWebMode("light"));
    }
  }, [dispatch]);

  //sync redux -> DOM + storage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    changeTheme,
    themeButtonTitle,
    themeButtonIcon,
  };
}
