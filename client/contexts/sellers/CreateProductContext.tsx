'use client';

import {
  useCreateProductActions,
  useCreateProductHelpers,
  useCreateProductQueries,
} from "@/hooks/sellers";
import { AppDispatch } from "@/redux";
import { createContext } from "react";
import { useDispatch } from "react-redux";

type CreateProductContextType = {
  queries: ReturnType<typeof useCreateProductQueries>;
  actions: ReturnType<typeof useCreateProductActions>;
  helpers: ReturnType<typeof useCreateProductHelpers>;
};

export const CreateProductContext =
  createContext<CreateProductContextType | null>(null);

export default function CreateProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const queries = useCreateProductQueries();
  const actions = useCreateProductActions({ dispatch });
  const helpers = useCreateProductHelpers({ dispatch });

  return (
    <CreateProductContext.Provider value={{ queries, actions, helpers }}>
      {children}
    </CreateProductContext.Provider>
  );
}
