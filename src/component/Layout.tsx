import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex justify-center">
      <div className="max-w-4xl w-full p-6">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500 hover:text-blue-700">
            ข้อมูลผู้ใช้
          </Link>
          <Link to="/edit" className="text-blue-500 hover:text-blue-700">
            แก้ไข
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
