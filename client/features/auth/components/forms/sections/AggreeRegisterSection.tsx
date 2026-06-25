import Link from "next/link";
import React from "react";

export default function AggreeRegisterSection() {
  return (
    <div className="text-center">
      <p className="text-gray-500 text-xs">
        Bằng cách tạo tài khoản, bạn đồng ý với
        <br />
        <Link href="#" className="text-orange-500 hover:text-orange-600">
          Điều Khoản Dịch Vụ
        </Link>
        <span className="mx-1">và</span>
        <Link href="#" className="text-orange-500 hover:text-orange-600">
          Chính Sách Bảo Mật
        </Link>
      </p>
    </div>
  );
}
