import { AuthenticationData } from "@/interfaces/common/auth.interface";

export interface AuthInitalState {
  isLoggedIn: boolean;
  error: string | null;
  loading: boolean;
  authData: AuthenticationData | null;
}
