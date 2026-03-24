import { IAuthenticationData } from "@/interfaces/common/auth.interface";

export interface IAuthInitalState {
  isLoggedIn: boolean;
  error: string | null;
  loading: boolean;
  authData: IAuthenticationData | null;
}
