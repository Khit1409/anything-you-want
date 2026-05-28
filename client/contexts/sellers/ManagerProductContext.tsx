import { useProductListActions, useProductListQueries } from "@/hooks/sellers";
import { AppDispatch } from "@/redux";
import { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
type ManagerProductContextType = {
  previews: ReturnType<typeof useProductListQueries>;
  handles: ReturnType<typeof useProductListActions>;
};
const ManagerProductContext = createContext<ManagerProductContextType | null>(
  null
);

export function ManagerProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const previews = useProductListQueries();
  const handles = useProductListActions({ dispatch });

  return (
    <ManagerProductContext.Provider value={{ previews, handles }}>
      {children}
    </ManagerProductContext.Provider>
  );
}

export default function useMangerProduct() {
  const context = useContext(ManagerProductContext);
  if (!context) {
    throw new Error(
      "useProductManager must be used inside ProductManagerProvider"
    );
  }

  return context;
}
