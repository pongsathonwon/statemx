import { FormEvent, useState } from "react";
import {
  FormState,
  Role,
  useFormDataContext,
} from "../context/FormDataContextProvider";

const InitialForm: FormState = { email: "", job: "Developer" };

const UserEdit = () => {
  const { setData } = useFormDataContext();
  const [local, setLocal] = useState<FormState>(InitialForm);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { target } = e;
    const { email, job } = target as HTMLFormElement & {
      email: HTMLInputElement;
      job: HTMLSelectElement;
    };
    setData((p) => [...p, { email: email.value, job: job.value as Role }]);
  };
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">แก้ไขข้อมูลผู้ใช้</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          อีเมล
        </label>
        <input
          value={local.email}
          onChange={({ target }) =>
            setLocal((p) => ({ ...p, [target.name]: target.value }))
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="job"
        >
          อาชีพ
        </label>
        <select
          value={local.job}
          onChange={({ target }) =>
            setLocal((p) => ({ ...p, [target.name]: target.value }))
          }
          name="job"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="job"
        >
          <option value="Developer">นักพัฒนา</option>
          <option value="Designer">นักออกแบบ</option>
          <option value="Manager">ผู้จัดการ</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        บันทึกการเปลี่ยนแปลง
      </button>
    </form>
  );
};

export default UserEdit;
