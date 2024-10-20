import { FormEvent, useEffect, useState } from "react";

type NameState = {
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
      <label htmlFor="fName" className="flex justify-between p-1">
        firstname
        <input
          className="border"
          value={fullname.firstname}
          onChange={({ target }) =>
            setFullname((p) => ({ ...p, [target.name]: target.value }))
          }
          type="text"
          id="fName"
          name="firstname"
          placeholder="firstname"
        />
      </label>
      <label htmlFor="lName" className="flex justify-between p-1">
        lastname
        <input
          className="border"
          value={fullname.lastname}
          onChange={({ target }) =>
            setFullname((p) => ({ ...p, [target.name]: target.value }))
          }
          type="text"
          id="lName"
          name="lastname"
          placeholder="lastname"
        />
      </label>
      <button type="submit">submit</button>
    </form>
  );
};

export default App;
