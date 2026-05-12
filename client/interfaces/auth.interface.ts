import { Role } from "./common.interface";

export interface AuthenticationData {
  uid: string;
  role: Role;
  email: string;
}

export interface AuthenticationResponse {
  message: string;
  success: boolean;
  timestamp: Date | string;
  data: AuthenticationData | null;
}
