import { FormEvent, useEffect, useState } from "react";
import FormInput from "../components/FormInput";

export type NameState = {
  firstname: string;
  lastname: string;
};

const initState: NameState = {
  firstname: "",
  lastname: "",
};
const validateAlphabet = (text: string) => {
  const numRex = /\d/;
  const isNum = numRex.test(text);
  if (isNum) return null;
  return text;
};
const App = () => {
  const [fullname, setFullname] = useState<NameState>(initState);
  const [fullnameText, setFullnameText] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);
  //const isFirstnameValid =
  useEffect(() => {
    const { firstname, lastname } = fullname;
    const firstValidated = validateAlphabet(firstname);
    const lastValidated = validateAlphabet(lastname);
    if (firstValidated === null || lastValidated === null) {
      setToast("ชื่อต้องไม่มีตัวเลข");
      return;
    }
    setToast(null);
    setFullnameText(`${firstValidated} ${lastValidated}`.toUpperCase());
  }, [fullname]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(fullname);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-auto w-1/2 p-4">
      {toast && <div>{toast}</div>}
      <div>fullname: {fullnameText}</div>
      <FormInput
        {...{
          inputName: "firstname",
          fullname,
          setFullname,
          labelText: "firstname",
        }}
      />
      <FormInput
        {...{
          inputName: "lastname",
          fullname,
          setFullname,
          labelText: "lastname",
        }}
      />
      <div className="flex p-4 justify-between gap-4">
        <button className="flex-1 bg-emerald-500" type="submit">
          submit
        </button>
        <button
          className="flex-1 bg-red-500"
          onClick={() => setFullname(initState)}
        >
          clear
        </button>
      </div>
    </form>
  );
};

export default App;
