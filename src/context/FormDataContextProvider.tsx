import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type FormDataContextT = {
  data: FormState[];
  setData: Dispatch<SetStateAction<FormState[]>>;
};

const FormDataContext = createContext<FormDataContextT | null>(null);

export const useFormDataContext = () => {
  const ctx = useContext(FormDataContext);
  if (!ctx) throw new Error("no context provider");
  return ctx;
};

export type Role = "Developer" | "Designer" | "Manager";

export type FormState = {
  email: string;
  job: Role;
};

const InitState: FormState = {
  email: "test@mail.com",
  job: "Developer",
};

function FormDataContextProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<FormState[]>([]);
  return (
    <FormDataContext.Provider value={{ data, setData }}>
      {children}
    </FormDataContext.Provider>
  );
}

export default FormDataContextProvider;
