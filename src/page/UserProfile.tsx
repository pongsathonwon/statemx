import { Fragment } from "react/jsx-runtime";
import { useFormDataContext } from "../context/FormDataContextProvider";

const UserProfile = () => {
  //   const user = {
  //     email: "test@mail.com",
  //     job: "Developer",
  //   };
  const { data } = useFormDataContext();

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">ข้อมูลผู้ใช้</h2>
      {data.map(({ email, job }) => (
        <Fragment key={email + job}>
          {" "}
          <p>
            <strong>อีเมล:</strong> {email}
          </p>
          <p className="mb-1">
            <strong>อาชีพ:</strong> {job}
          </p>
        </Fragment>
      ))}
    </div>
  );
};

export default UserProfile;
