import { Role } from "./common.interface";

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
  data: AuthenticationData | null;
}
