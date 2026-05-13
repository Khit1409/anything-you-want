"use client";

import useTheme from "@/hooks/common/useTheme";

import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const { changeTheme, themeButtonTitle, themeButtonIcon } = useTheme();

  return (
    <header className="h-[60px] max-h-[60px] w-screen overflow-hidden py-2 px-5 m-0">
      <div className="flex items-center h-full justify-around">
        <div className="flex-1">
          <h3>LOGO</h3>
        </div>
        <div className="flex-1">
          <form className="relative flex items-center">
            <input
              type="text"
              name="search"
              id="search-menu"
              className="w-full p-2 h-full rounded-full outline-0 border border-(--border)"
            />
            <button
              type="submit"
              title="Search in seller system..."
              className="absolute left-3 text-(--muted) font-sans"
            >
              <FontAwesomeIcon icon={faSearch} />
              <span className="ms-1 text-sm font-sans">Search...</span>
            </button>
          </form>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-3 text-(--muted)">
            <div>
              <button
                title={themeButtonTitle}
                type="button"
                onClick={() => changeTheme()}
              >
                <FontAwesomeIcon icon={themeButtonIcon} />
              </button>
            </div>
            <div>
              <button title="Your notifications" className="relative">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="absolute right-[-3] inline-flex size-2 rounded-full bg-sky-500"></span>
                <FontAwesomeIcon icon={faBell} />
              </button>
            </div>
            <div>a</div>
          </div>
        </div>
      </div>
    </header>
  );
}
