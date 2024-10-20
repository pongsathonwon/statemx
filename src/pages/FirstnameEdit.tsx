import { useDataContext } from "../context/DataContextProvider";
import FormInput from "../components/FormInput";

function FirstnameEdit() {
  const { data, setData } = useDataContext();
  return (
    <form
      className="flex flex-col mx-auto w-1/2 p-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <FormInput
        {...{
          inputName: "firstname",
          fullname: data,
          setFullname: setData,
          labelText: "firstname",
        }}
      />

      <div className="flex p-4 justify-between gap-4">
        <button className="flex-1 bg-emerald-500" type="submit">
          submit
        </button>
        <button
          className="flex-1 bg-red-500"
          onClick={() => setData((p) => ({ ...p, firstname: "" }))}
        >
          clear firstname
        </button>
      </div>
    </form>
  );
}

export default FirstnameEdit;
