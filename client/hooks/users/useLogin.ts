import { LoginData } from "@/api/auth.api";
import { AppDispatch, RootState } from "@/redux/store";
import { authThunk, loginThunk } from "@/redux/thunk/auth.thunk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLoading from "../common/useLoading";

export default function useLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { handleLoading } = useLoading({ dispatch });
  const [loginData, setLoginData] = useState<LoginData>({
    currentPassword: "",
    emailAddress: "",
    loginRole: "user",
  });

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLoading(
      async () => await dispatch(loginThunk(loginData))
    );
    if (loginThunk.fulfilled.match(result) && result.payload.data) {
      dispatch(authThunk());
      const history = window.history.length;
      if (history > 1) router.back();
      console.log("here");
      router.replace("/");
    }
  };

  return { submitForm, loginData, setLoginData, error };
}
