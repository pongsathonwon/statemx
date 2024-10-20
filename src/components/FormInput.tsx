import { Dispatch, SetStateAction } from "react";
import { NameState } from "../pages/App";

type FormInputProps<T extends Record<string, unknown>> = {
  labelText: string;
  inputName: keyof T;
  fullname: T;
  setFullname: Dispatch<SetStateAction<T>>;
};

function FormInput({
  labelText,
  inputName,
  fullname,
  setFullname,
}: FormInputProps<NameState>) {
  return (
    <label htmlFor={`id-${inputName}`} className="flex justify-between p-4">
      {labelText}
      <input
        className="border"
        value={fullname[inputName]}
        onChange={({ target }) =>
          setFullname((p) => ({ ...p, [target.name]: target.value }))
        }
        type="text"
        id={`id-${inputName}`}
        name={inputName}
        placeholder="firstname"
      />
    </label>
  );
}

export default FormInput;
