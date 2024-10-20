import { useEffect, useState } from "react";
import { useDataContext } from "../context/DataContextProvider";

export type NameState = {
  firstname: string;
  lastname: string;
};

const validateAlphabet = (text: string) => {
  const numRex = /\d/;
  const isNum = numRex.test(text);
  if (isNum) return null;
  return text;
};
const App = () => {
  const { data } = useDataContext();
  const [fullnameText, setFullnameText] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);
  //const isFirstnameValid =
  useEffect(() => {
    const { firstname, lastname } = data;
    const firstValidated = validateAlphabet(firstname);
    const lastValidated = validateAlphabet(lastname);
    if (firstValidated === null || lastValidated === null) {
      setToast("ชื่อต้องไม่มีตัวเลข");
      return;
    }
    setToast(null);
    setFullnameText(`${firstValidated} ${lastValidated}`.toUpperCase());
  }, [data]);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      {toast && <div>{toast}</div>}
      <div>fullname: {fullnameText}</div>
    </div>
  );
};

export default App;
