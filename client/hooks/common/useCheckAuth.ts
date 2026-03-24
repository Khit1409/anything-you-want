import { AppDispatch } from "@/redux/store";
import { authThunk } from "@/redux/thunk/auth.thunk";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useCheckAuth() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log("Checking authentication...");
    dispatch(authThunk());
  }, [dispatch]);
}
