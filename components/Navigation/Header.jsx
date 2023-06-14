import React, { useState } from "react";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { MdChat } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";

import Sidebar from "./Sidebar";
import {
  REMOVE_ACTIVE_USER,
  selectuserImage,
} from "@/redux/slice/auth/authSlice";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/router";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const userImageUrl = useSelector(selectuserImage);
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(REMOVE_ACTIVE_USER());
        toast.success("Logout successfully.");
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const NavButton = ({ icon }) => (
    <button type="button" className="relative text-xl rounded-full p-3">
      <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
      {icon}
    </button>
  );

  return (
    <div className="relative z-30">
      {activeMenu && (
        <div className="fixed w-72 bg-dark h-screen overflow-y-auto shadow-md z-10">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer text-gray-400 hover:text-primary"
              onClick={() => setActiveMenu(false)}
            />
          </div>
          <Sidebar />
        </div>
      )}
      <div className="flex justify-between p-2 w-full text-white space-x-2 fixed bg-dark">
        <NavButton
          icon={
            <AiOutlineMenu
              onClick={() => setActiveMenu(true)}
              className="hover:text-primary md:flex lg:hidden h-8 w-8"
            />
          }
        />
        <div className="absolute left-10 top-3">
          <div className="flex justify-between items-center pt-2 ml-3">
            <a href="/">
              <span className="text-primary font-bold text-3xl px-1">DP</span>
              <span className="text-2xl font-semibold">Shop</span>
            </a>
          </div>
        </div>
        <div className="flex">
          <NavButton icon={<FiShoppingCart />} />

          <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg">
            <MdChat className="rounded-full w-8 h-8" />
          </div>
          <img
            src={userImageUrl}
            onClick={logoutUser}
            alt="User"
            className="h-12 w-12 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
