"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import Logo from "../../common/Logo";
import { NAV_LIST } from "@/data/navbar.data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faCartShopping,
  faShoppingBag,
  faStore,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import useTheme from "@/hooks/common/useTheme";
import useLogout from "@/hooks/common/useLogout";

export default function Navbar() {
  const { isLoggedIn, loading, authData } = useSelector(
    (state: RootState) => state.auth
  );
  const { handleLogout } = useLogout();
  const { changeTheme, themeButtonIcon, themeButtonTitle } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--surface)">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Nav links */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-1">
          {NAV_LIST.map((nav) => (
            <Link
              key={nav.id}
              href={nav.url}
              className="px-4 py-2 rounded-md text-sm font-medium text-(--text) hover:bg-(--border)/40 transition-colors duration-150"
            >
              {nav.title}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {[
            { href: "/carts", icon: faCartShopping, title: "Giỏ hàng" },
            { href: "/orders", icon: faShoppingBag, title: "Đơn hàng" },
            { href: "/profile", icon: faUser, title: "Tài khoản" },
          ].map(({ href, icon, title }) => (
            <Link
              key={href}
              href={href}
              title={title}
              className="w-9 h-9 flex items-center justify-center rounded-md text-(--text) hover:bg-(--border)/40 transition-colors duration-150"
            >
              <FontAwesomeIcon icon={icon} />
            </Link>
          ))}

          <button
            onClick={changeTheme}
            title={themeButtonTitle}
            className="w-9 h-9 flex items-center justify-center rounded-md text-(--text) hover:bg-(--border)/40 transition-colors duration-150"
          >
            <FontAwesomeIcon icon={themeButtonIcon} />
          </button>

          <div className="w-px h-5 bg-(--border) mx-2" />

          {loading ? (
            <div className="w-9 h-9 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border border-(--border) dark:border-white border-t-transparent animate-spin" />
            </div>
          ) : isLoggedIn ? (
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="w-9 h-9 flex items-center justify-center rounded-md text-(--text) hover:bg-(--border)/40 transition-colors duration-150"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          ) : (
            <Link
              href="/login"
              title="Đăng nhập"
              className="w-9 h-9 flex items-center justify-center rounded-md text-(--text) hover:bg-(--border)/40 transition-colors duration-150"
            >
              <FontAwesomeIcon icon={faUserCircle} />
            </Link>
          )}

          {authData?.role === "seller" && (
            <Link
              href="/seller/dashboard"
              title="Quản lý cửa hàng"
              className="w-9 h-9 flex items-center justify-center rounded-md text-(--text) hover:bg-(--border)/40 transition-colors duration-150"
            >
              <FontAwesomeIcon icon={faStore} />
            </Link>
          )}

          <button className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md text-(--text) hover:bg-(--border)/40 transition-colors duration-150">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </nav>
  );
}
