import { useAppSelector } from "@/shared/redux/selector";

export default function useAuth() {
  const { initialized, isLoggedIn, authData, error } = useAppSelector(
    (state) => state.auth,
  );
  return { initialized, isLoggedIn, authData, error };
}
