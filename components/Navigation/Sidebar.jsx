import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  AiOutlineFileAdd,
  AiOutlineShoppingCart,
  AiOutlineTag,
} from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { IoMdContacts } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { BiCustomize } from "react-icons/bi";
import { GiTatteredBanner } from "react-icons/gi";

const Sidebar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-black text-md m-2 bg-primary";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-200 hover:text-black hover:bg-primary m-2";
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto pb-10  duration-300 ease-linear">
      <div className="flex justify-between items-center pt-3 ml-3">
        <a href="/">
          <span className="text-primary font-bold text-3xl px-1">DP</span>
          <span className="text-2xl font-semibold text-white">Shop</span>
        </a>
      </div>
      <div className="mt-8">
        <div>
          <p className="text-gray-400 m-3 mt-4 uppercase">Pages</p>
          <Link
            href="/Dashboard"
            className={currentRoute === "/Dashboard" ? activeLink : normalLink}
          >
            <MdOutlineDashboard />
            <span className="capitalize ">Dashboard</span>
          </Link>
          <Link
            href="/AddProduct"
            className={currentRoute === "/AddProduct" ? activeLink : normalLink}
          >
            <AiOutlineFileAdd />
            <span className="capitalize ">Add Product</span>
          </Link>
          <Link
            href="/CustomizeCategory"
            className={
              currentRoute === "/CustomizeCategory" ? activeLink : normalLink
            }
          >
            <BiCustomize />
            <span className="capitalize ">Customize Category </span>
          </Link>
          <Link
            href="/CustomizeBrand"
            className={
              currentRoute === "/CustomizeBrand" ? activeLink : normalLink
            }
          >
            <AiOutlineTag />
            <span className="capitalize ">Customize Brand </span>
          </Link>
          <Link
            href="/ProductView"
            className={
              currentRoute === "/ProductView" ? activeLink : normalLink
            }
          >
            <FiEye />
            <span className="capitalize ">View Product</span>
          </Link>
          <Link
            href="/Orders"
            className={currentRoute === "/Orders" ? activeLink : normalLink}
          >
            <AiOutlineShoppingCart />
            <span className="capitalize ">Orders</span>
          </Link>
          <Link
            href="/Users"
            className={currentRoute === "/Users" ? activeLink : normalLink}
          >
            <IoMdContacts />
            <span className="capitalize ">Users</span>
          </Link>
          <Link
            href="/Banner"
            className={currentRoute === "/Banner" ? activeLink : normalLink}
          >
            <GiTatteredBanner />
            <span className="capitalize ">Customaize Banner</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
