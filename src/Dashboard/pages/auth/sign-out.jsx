import React from "react";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, } from '../../../redux/user/userSlice';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function SignOut() {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      window.location.href = '/';
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  return (
    <div className="flex justify-center items-center h-[80vh] ">  {/* min-h-screen for vertical centering */}
      <div className="fixed bg-pink-50 rounded shadow-md w-[65%] p-8 py-[5%] flex flex-col items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-pink-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-2xl font-semibold text-pink-700 mb-4">Are you sure you want to sign out?</h3>
        <div className="flex space-x-4">
          
          <button onClick={handleSignOut} className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300">
            Proceed
          </button>
          <Link to="/dashboard/home" className="px-4 py-2 border border-pink-500 text-pink-500 rounded-md hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
