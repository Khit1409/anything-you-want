import { changeWebMode } from "@/redux/slice/app.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

/**
 * Hook dùng chung cho việc thay đổi chế độ sáng / tối của trang web
 * @returns
 */
export default function useTheme() {
  const { theme } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Đổi chế độ
   */
  function changeTheme() {
    return dispatch(changeWebMode());
  }

  const themeButtonTitle =
    theme === "dark" ? "Chuyển chế độ sáng" : "Chuyển chế độ tối";
  const themeButtonIcon = theme === "dark" ? faSun : faMoon;

  return {
    changeTheme,
    themeButtonTitle,
    themeButtonIcon,
  };
}
