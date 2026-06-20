import Link from "next/link";

export default function RegisterNavigateSection() {
  return (
    <div className="text-center">
      <p className="text-gray-600 text-sm">
        Đã có tài khoản?
        <Link
          href="/login"
          className="text-orange-500 hover:text-orange-600 font-semibold ms-2"
        >
          Đăng Nhập Ngay
        </Link>
      </p>
    </div>
  );
}
