import { Role } from "../../common/interfaces/common.interface";

/**
 * Dữ liệu xác thực của user (được trả về khi kiểm tra token).
 */
export interface AuthenticationData {
  uid: string;
  role: Role;
  email: string;
}
/**
 * Kiểu phản hồi chung cho các API xác thực (auth).
 */
export interface AuthenticationResponse {
  message: string;
  success: boolean;
  timestamp: Date | string;
  data?: AuthenticationData;
}
/**
 * Dữ liệu gửi lên khi đăng nhập.
 */
export interface LoginRequest {
  emailAddress: string;
  currentPassword: string;
  loginRole: Role;
}
export type LoginDataResponse = { role: Role };
/**
 * Kiểu dữ liệu phản hồi khi gọi API login.
 */
export interface LoginResponse {
  message: string;
  success: boolean;
  data?: LoginDataResponse;
}
