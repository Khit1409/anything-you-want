import {
  startLoadingAnimation,
  stopLoadingAnimation,
} from "../redux/common.slice";
import { useAppDispatch } from "@/shared/redux/selector";

export default function useLoading() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleLoading<T, P extends any[]>(
    callback: (...params: P) => Promise<T>,
    ...params: P
  ): Promise<T> {
    try {
      dispatch(startLoadingAnimation());

      return await callback(...params);
    } finally {
      dispatch(stopLoadingAnimation());
    }
  }

  return { handleLoading };
}
