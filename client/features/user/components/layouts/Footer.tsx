"use client";

import Link from "next/link";
import { NAV_LIST } from "@/data/navbar.data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
    }
  }, []);

  return (
    <footer
      className={`border-t border-(--border) bg-(--surface) dark:bg-(--surface) w-full relative`}
      ref={footerRef}
    >
      {/* Main Footer Content */}
      <div className="mx-auto px-6 py-12">
        <div className="">
          {/* social network */}
          <div className="flex items-center gap-3 justify-center mb-4">
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-(--surface-muted) dark:bg-(--surface-muted) text-(--muted) dark:text-(--text) hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-(--surface-muted) dark:bg-(--surface-muted) text-(--muted) dark:text-(--text) hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-(--surface-muted) dark:bg-(--surface-muted) text-(--muted) dark:text-(--text) hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-(--surface-muted) dark:bg-(--surface-muted) text-(--muted) dark:text-(--text) hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>

          {/* page link & information */}
          <div className="flex justify-evenly">
            <div>
              <h3 className="font-semibold text-(--title) mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {NAV_LIST.map((nav) => (
                  <li key={nav.id}>
                    <Link
                      href={nav.url}
                      className="text-(--muted) hover:text-purple-600 transition-colors duration-200 text-sm"
                    >
                      {nav.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-(--title) mb-4">
                Customer Service
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "/my-orders", label: "My Orders" },
                  { href: "/my-carts", label: "Shopping Cart" },
                  { href: "/my-profile", label: "My Profile" },
                  { href: "/help", label: "Help Center" },
                  { href: "/returns", label: "Returns & Refunds" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-(--muted) hover:text-purple-600 transition-colors duration-200 text-sm"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-(--title) mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-(--muted)">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-purple-600 dark:text-purple-400 mt-1"
                  />
                  <span>123 Street Name, City, Country</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-(--muted)">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <span>+84 123 456 789</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-(--muted)">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <span>support@example.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-(--border)">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-(--muted)">
            <p>© {currentYear} Your Company. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-purple-600 transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
