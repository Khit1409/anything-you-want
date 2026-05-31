import { AppDispatch } from "@/redux/store";
import { authThunk } from "@/redux/thunk/auth.thunk";
import { useQuery } from "@tanstack/react-query";

import { useDispatch } from "react-redux";

export default function useCheckAuth() {
  const dispatch = useDispatch<AppDispatch>();

  useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      return dispatch(authThunk());
    },
  });
}
