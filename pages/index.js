import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { Login } from "@/components";
import { hydrateUser } from "@/redux/slice/auth/authSlice";
import { store } from "@/redux/store";
import StorageServiceUser from "@/utils/StorageServiceUser";

export default function Home() {
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
  }, []);
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Login />
    </div>
  );
}
