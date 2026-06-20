import { AuthenticationData } from "@/features/auth/interfaces/auth.interface";

export interface AuthInitialState {
  isLoggedIn: boolean;
  error?: string;
  initialized: boolean;
  authData?: AuthenticationData;
  isLoading:boolean;
}
