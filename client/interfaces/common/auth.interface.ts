
import { Role } from "./role.interface";


export interface IAuthenticationData {
  uid: string;
  role: Role;
  email: string;
}
export interface IAuthenticationResponse {
  message: string;
  success: boolean;
  timestamp: Date | string;
  data: IAuthenticationData | null;
}
