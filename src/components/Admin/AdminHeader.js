import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setIsAdmin } from "../../redux";
import { Link } from "react-router-dom";
export default function AdminHeader() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(setIsAdmin(false)); // Update Redux state
      // Optionally, navigate to the login page with:
      // navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <header className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
      <Link to={"/admin/panel"} className="cursor-pointer">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </Link>
      <Link
        onClick={handleLogout} // Update the onClick handler
        to="/"
        className="font-medium hover:text-indigo-200"
      >
        Logout
      </Link>
    </header>
  );
}
