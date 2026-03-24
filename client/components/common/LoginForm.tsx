import { LoginData } from "@/api/auth.api";
import {
  faEnvelope,
  faHome,
  faLock,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FormEvent, useState } from "react";

interface LoginFormProps {
  setState: React.Dispatch<React.SetStateAction<LoginData>>;
  submit: (e: FormEvent) => void;
  errorMess: string | null;
}

export default function LoginForm(props: LoginFormProps) {
  const [isAggree, setIsAggress] = useState<boolean>(false);
  const [isSeller, setIsSeller] = useState<boolean>(false);

  return (
    <div className="p-8 flex-1 flex items-center justify-center rounde-r-xl shadow-lg bg-white/95 backdrop-blur-sm">
      <form className="w-full max-w-md" onSubmit={props.submit}>
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng Nhập</h2>
          <p className="text-sm text-gray-500">Chào mừng bạn quay trở lại!</p>
        </div>

        {/* Email input */}
        <div className="w-full mb-5">
          <label
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            htmlFor="email_address"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
            <span>Email</span>
          </label>
          <input
            className="border border-gray-300 p-3 rounded-full w-full outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
            type="email"
            name="email_address"
            id="email_address"
            onChange={(e) =>
              props.setState((prev) => ({
                ...prev,
                emailAddress: e.target.value,
              }))
            }
            placeholder="example@email.com"
            required
          />
        </div>

        {/* Password input */}
        <div className="w-full mb-5">
          <label
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            htmlFor="current_password"
          >
            <FontAwesomeIcon icon={faLock} className="text-gray-500" />
            <span>Mật khẩu</span>
          </label>
          <input
            className="border border-gray-300 p-3 rounded-full w-full outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
            type="password"
            onChange={(e) =>
              props.setState((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            name="current_password"
            id="current_password"
            placeholder="Nhập mật khẩu của bạn"
            required
          />
        </div>

        {/* Checkboxes */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              onChange={() => setIsAggress((prev) => !prev)}
              checked={isAggree}
              name="is_aggree"
              required
              id="is_aggree"
              className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
            />
            <label
              htmlFor="is_aggree"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              Tôi đồng ý với điều khoản và dịch vụ
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_seller"
              id="is_seller"
              onChange={(e) => {
                setIsSeller((prev) => !prev);
                props.setState((prev) => ({
                  ...prev,
                  loginRole: e.target.checked ? "seller" : "user",
                }));
              }}
              checked={isSeller}
              className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
            />
            <label
              htmlFor="is_seller"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              Đăng nhập với tư cách người bán
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="mb-6">
          <button
            type="submit"
            disabled={!isAggree}
            className="w-full py-3 px-4 rounded-lg bg-linear-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Đăng Nhập
          </button>
        </div>

        <div className="mb-6 text-center">
          {props.errorMess && (
            <small className="text-red-500 italic">
              {"*" + props.errorMess}
            </small>
          )}
        </div>
        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">HOẶC</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center text-sm">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Quay lại trang chủ</span>
          </Link>
          <span className="hidden sm:block text-gray-300">|</span>
          <Link
            href="/register"
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faPen} />
            <span>Đăng ký tài khoản</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
