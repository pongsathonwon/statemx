import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export type Gender = "Male" | "Female";

export type Interest = "Coding" | "Music";

const App = () => {
  const [fullName, setFullName] = useState<string>("");
  const [imgURL, setImgURL] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [interest, setInterest] = useState<Interest[]>([]);
  const regex = new RegExp(/\d|\s/i);

  const isNameInvalid = regex.test(fullName) && fullName !== "";
  const isUrlValid = imgURL.includes("https://") && imgURL !== "";

  const handelToggleInterest = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (!target) return;
    const { value, checked } = target;
    if (checked) {
      setInterest((p) => [...p, value as Interest]);
      return;
    }
    const idx = interest.findIndex((i) => i === value);
    if (idx < 0) {
      setInterest((p) => [...p, value as Interest]);
      return;
    }
    const newList = interest.filter((i) => i !== value);
    setInterest((p) => newList);
  };
  //////////////////////////
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      fullName: fullName,
      imageUrl: imgURL,
      gender,
      interests: interest,
    };
    const baseurl = "https://65a25d5342ecd7d7f0a771bd.mockapi.io/users";
    try {
      const res = await axios.post(baseurl, data);
      alert(res.statusText);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <UserList />
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              type="text"
              id="fullName"
              name="fullName"
              className="mt-2 p-2 w-full border rounded-lg"
            />
            {isNameInvalid && <div className="text-red-500">alert</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700">
              Image URL
            </label>
            <input
              value={imgURL}
              onChange={({ target }) => setImgURL(target.value)}
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="mt-2 p-2 w-full border rounded-lg"
            />
            {isUrlValid && <div className="text-red-500">alert</div>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="form-radio"
                  onChange={({ target }) => setGender(target.value as "Male")}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="form-radio"
                  onChange={({ target }) => setGender(target.value as "Female")}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Interests</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  onChange={handelToggleInterest}
                  type="checkbox"
                  name="interests"
                  value="Coding"
                  className="form-checkbox"
                />
                <span className="ml-2">Coding</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  onChange={handelToggleInterest}
                  type="checkbox"
                  name="interests"
                  value="Music"
                  className="form-checkbox"
                />
                <span className="ml-2">Music</span>
              </label>
            </div>
          </div>

          <button
            disabled={isNameInvalid}
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export type User = {
  id: number;
  fullName: string;
  imageUrl: string;
  gender: Gender;
  interests: Interest[];
};

export type MyParmas = Partial<{
  fullName: string;
  gender: Gender;
}>;

const UserList = () => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [users, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const userLen = users.length;

  // const users = [
  //   {
  //     id: 1,
  //     fullName: "Test",
  //     imageUrl: "https://via.placeholder.com/40",
  //     gender: "Male",
  //     interests: ["coding", "music"],
  //   },
  //   {
  //     id: 2,
  //     fullName: "Mike",
  //     imageUrl: "https://via.placeholder.com/40",
  //     gender: "Female",
  //     interests: ["coding"],
  //   },
  //   {
  //     id: 3,
  //     fullName: "Test",
  //     imageUrl: "https://via.placeholder.com/40",
  //     gender: "Male",
  //     interests: ["coding"],
  //   },
  //   {
  //     id: 4,
  //     fullName: "Test Mike",
  //     imageUrl: "https://via.placeholder.com/40",
  //     gender: "Male",
  //     interests: [],
  //   },
  // ];
  const baseurl = "https://65a25d5342ecd7d7f0a771bd.mockapi.io/users";
  const finalUrl = `${baseurl}${
    debounced === "" ? "" : "?fullName=" + debounced
  }${gender && debounced ? "&" : ""}${
    gender ? "?gender=" + gender.toLowerCase() : ""
  }`;
  const setupGender = (g: string): Gender | null => {
    if (g === "Male") return "Male";
    if (g === "Female") return "Female";
    return null;
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(search);
      console.log(search);
    }, 500);
    return () => clearTimeout(id);
  }, [search]);

  useEffect(() => {
    console.log(gender);
    setLoading(true);
    console.log(finalUrl);
    (async () => {
      try {
        const { data } = await axios.get<User[]>(finalUrl);
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [gender, debounced]);

  if (loading)
    return (
      <>
        {[...Array(userLen)].map((_, i) => (
          <div key={i}>Loading ....</div>
        ))}
      </>
    );

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl w-full p-6">
        <h1 className="text-xl font-bold mb-4">User List</h1>
        <div className="flex justify-between mb-4">
          <input
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            type="text"
            placeholder="Search by name..."
            className="border rounded-lg p-2 w-1/2"
          />
          <select
            className="border rounded-lg p-2"
            value={gender ?? "All"}
            onChange={({ target }) => setGender(setupGender(target.value))}
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Image URL</th>
              <th className="py-2 px-4 border-b">Gender</th>
              <th className="py-2 px-4 border-b">Interests</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.fullName}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={user.imageUrl}
                    alt="user avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">{user.gender}</td>
                <td className="py-2 px-4 border-b">
                  {user.interests.join(", ") || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
