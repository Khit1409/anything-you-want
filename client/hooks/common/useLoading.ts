import {
  AppDispatch,
  startLoadingAnimation,
  stopLoadingAnimation,
} from "@/redux";

interface HookProps {
  dispatch: AppDispatch;
}
export default function useLoading({ dispatch }: HookProps) {
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
