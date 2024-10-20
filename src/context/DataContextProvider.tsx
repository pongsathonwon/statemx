import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { NameState } from "../pages/App";

const initState: NameState = {
  firstname: "",
  lastname: "",
};

const DataContext = createContext<{
  data: NameState;
  setData: Dispatch<SetStateAction<NameState>>;
} | null>(null);

export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("must use inside provider");
  return ctx;
};

function DataContextProvider({ children }: PropsWithChildren) {
  const [globalName, setGlobalName] = useState(initState);
  return (
    <DataContext.Provider value={{ data: globalName, setData: setGlobalName }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
