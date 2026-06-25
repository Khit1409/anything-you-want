import { faHome, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function LoginNavigateSection() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center text-sm">
      <Link
        href="/"
        className="flex items-center gap-2 text-(--muted) hover:text-green-600 transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faHome} />
        <span>Quay lại trang chủ</span>
      </Link>
      <span className="hidden sm:block text-(--muted)">|</span>
      <Link
        href="/register"
        className="flex items-center gap-2 text-(--muted) hover:text-green-600 transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faPen} />
        <span>Đăng ký tài khoản</span>
      </Link>
    </div>
  );
}
