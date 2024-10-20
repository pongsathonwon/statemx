import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container mx-auto flex justify-between">
        <Link to={"users/firstname"}>firstname</Link>
        <Link to={"/"}>Home</Link>
        <Link to={"users/lastname"}>lastname</Link>
      </div>
      <Outlet />
    </>
  );
}

export default Home;
