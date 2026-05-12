"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Logo from "../common/Logo";
import { NAV_LIST } from "@/data/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faCartShopping,
  faMoon,
  faShoppingBag,
  faStore,
  faSun,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { logoutService } from "@/api/auth.api";
import { authThunk } from "@/redux/thunk/auth.thunk";
import { changeWebMode } from "@/redux/slice/app.slice";

export default function Navbar() {
  const { isLoggedIn, loading, authData } = useSelector(
    (state: RootState) => state.auth
  );
  const { theme } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();
  const logout = async () => {
    const res = await logoutService();
    if (res.success) dispatch(authThunk());
  };

  return (
    <nav
      id="navbar"
      className="sticky top-0 z-50 border-b border-(--border) backdrop-blur-sm bg-(--surface) dark:bg-(--surface) h-25 max-h-25"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center gap-1">
              {NAV_LIST.map((nav) => (
                <Link
                  key={nav.id}
                  href={nav.url}
                  className="px-4 py-2 rounded-lg font-medium text-(--text) hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                >
                  {nav.title}
                </Link>
              ))}
            </div>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/carts"
              className="relative p-2.5 rounded-lg text-(--text) hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
              {/* Optional: Add badge for cart count */}
              {/* <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">3</span> */}
            </Link>
            {/* Orders */}
            <Link
              href="/orders"
              className="p-2.5 rounded-lg text-(--text) hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
            >
              <FontAwesomeIcon icon={faShoppingBag} className="text-lg" />
            </Link>
            {/* Orders */}
            <Link
              href="/profile"
              className="p-2.5 rounded-lg text-(--text) hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
            >
              <FontAwesomeIcon icon={faUser} className="text-lg" />
            </Link>

            <button
              onClick={() => {
                dispatch(changeWebMode());
              }}
              className="hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 p-2.5 rounded-lg text-(--text)"
              title={`${
                theme === "dark" ? "Chuyển chế độ sáng" : "Chuyển chế độ tối"
              }`}
            >
              <FontAwesomeIcon
                className="text-lg"
                icon={theme === "dark" ? faSun : faMoon}
              />
            </button>
            {/* Divider */}
            <div className="w-px h-6 bg-(--border) mx-2"></div>
            <div className="w-[100px] flex justify-center items-center">
              {loading ? (
                <div className="w-max">
                  <div className="w-[30px] h-[30px] rounded-full border dark:border-white border-(--border) border-t-transparent animate-spin"></div>
                </div>
              ) : isLoggedIn ? (
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-(--text) hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                  title="Logout"
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="text-lg"
                  />
                </button>
              ) : (
                <Link
                  href="/login"
                  title="go to login"
                  className="p-2 rounded-lg text-(--text) hover:text-red-600 hover:bg-green-50 transition-all text-center duration-200"
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="mr-2 text-lg"
                  />
                </Link>
              )}

              {authData && authData.role === "seller" && (
                <Link
                  href="/seller/dashboard"
                  title="go to seller dashboard"
                  className="p-2 rounded-lg text-(--text) hover:text-red-600 hover:bg-green-50 transition-all text-center duration-200"
                >
                  <FontAwesomeIcon icon={faStore} className="text-lg" />
                </Link>
              )}
            </div>
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2.5 rounded-lg text-(--text) hover:text-purple-600 hover:bg-purple-50 transition-all duration-200">
              <FontAwesomeIcon icon={faBars} className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
