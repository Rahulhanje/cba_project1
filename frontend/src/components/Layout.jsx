import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

function Layout() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      {user && (
        <Navbar
          role={user.isAdmin ? "admin" : "user"}
          user={user}
          onSearch={(term) => console.log("Search:", term)}
        />
      )}{" "}
      {/* Show Navbar only if logged in */}
      <main className="flex-1">
        <Outlet /> {/* Render page content */}
      </main>
    </div>
  );
}

export default Layout;
