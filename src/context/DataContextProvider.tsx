import { createContext, PropsWithChildren, useContext } from "react";

const DataContext = createContext<{} | null>(null);

export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("must use inside provider");
  return ctx;
};

function DataContextProvider({ children }: PropsWithChildren) {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
