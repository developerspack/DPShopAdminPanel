import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import StorageServiceUser from "@/utils/StorageServiceUser";
import { Header, Sidebar } from "../";
import { store } from "@/redux/store";
import { hydrateUser } from "@/redux/slice/auth/authSlice";

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Hydrate the user
    store.subscribe(() => {
      StorageServiceUser.set("auth", JSON.stringify(store.getState().auth));
    });
    let auth = StorageServiceUser.get("auth");
    auth = auth
      ? JSON.parse(auth)
      : {
          isLoggedIn: false,
          email: null,
          userName: null,
          userImageUrl: null,
          userID: null,
        };

    store.dispatch(hydrateUser(auth));
    if (!auth || !auth.isLoggedIn) {
      // User is not authenticated, redirect to the home page
      router.push("/");
      toast.error("Login To Access The Page");
      return;
    }
  }, []);
  return (
    <div className="">
      <div className="bg-[#13131a]">
        <Header />
      </div>
      <div className="w-72 fixed bg-dark rounded-r-xl hidden sm:hidden lg:flex">
        <Sidebar />
      </div>
      <>{children}</>
    </div>
  );
};

export default Layout;
