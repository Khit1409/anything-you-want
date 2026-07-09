import { useParams } from "next/navigation";
import useCreateOrderQuery from "./useCreateOrderQuery";
import useCreateOrderForm from "./useCreateOrderForm";
import { useWatch } from "react-hook-form";
import useCreateOrderHandle from "./useCreateOrderHandle";
import { useEffect } from "react";
import useAuth from "@/features/auth/hooks/useAuth";

export default function useCreateOrder() {
  const params: { id: string } = useParams();
  const productId = params.id;
  const useQueryHook = useCreateOrderQuery(productId);
  const useFormHook = useCreateOrderForm(productId);
  const { product, wards } = useQueryHook;
  const { setValue, control } = useFormHook;
  const provinceCode = useWatch({ control, name: "data.address.provinceCode" });
  const useHandleHook = useCreateOrderHandle({
    product,
    wards,
    setValue,
    provinceCode,
  });
  const auth = useAuth();

  useEffect(() => {
    const { needLogin, fn } = auth.needLoginHandle();
    if (needLogin && fn) fn();
  }, [auth]);

  return {
    ...useFormHook,
    ...useQueryHook,
    ...useHandleHook,
  };
}
