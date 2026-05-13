"use client";

import { SELLER_NAV } from "@/data/seller-navbar.data";
import { getIconByString } from "@/features/icon";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<number, boolean>
  >({});

  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <nav className="h-screen flex flex-col bg-(--surface) border-r border-(--border) max-w-[300px] w-[300px] p-0 m-0">
      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-2 py-3">
        {SELLER_NAV.map((nav) => (
          <div key={nav.id} className="mb-2">
            {/* Category Button */}
            <button
              onClick={() => toggleCategory(Number(nav.id))}
              className="w-full flex items-center justify-start px-4 py-3 text-(--muted) hover:bg-(--surface-muted) rounded-lg transition-colors"
            >
              <FontAwesomeIcon
                icon={faCaretRight}
                className={`w-4 h-4 transition-transform duration-200 text-xs me-3 ${
                  expandedCategories[Number(nav.id)] ? "rotate-90" : ""
                }`}
              />
              <span className={`font-medium text-sm`}>
                <FontAwesomeIcon
                  icon={getIconByString(nav.icon)!}
                  className="me-2"
                />
                {nav.category}
              </span>
            </button>

            {/* Child Items */}

            {expandedCategories[Number(nav.id)] && (
              <div className={`pl-6 flex flex-col gap-3 py-2`}>
                {nav.childs?.map((nav_child, index) => (
                  <Link
                    key={index}
                    href={
                      "/seller/" +
                      `${nav.url ? nav.url + "/" : ""}` +
                      nav_child.url
                    }
                    className="flex items-center px-4 py-2 text-sm text-(--text) hover:bg-(--surface-muted) rounded-lg transition-colors hover:text-(--title)"
                  >
                    <span>
                      <FontAwesomeIcon
                        icon={getIconByString(nav_child.icon)!}
                        className="me-1"
                      />
                      {nav_child.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
