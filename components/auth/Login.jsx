import { useState } from "react";
import { ImMail3 } from "react-icons/im";
import { RiLock2Fill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { CirclesWithBar } from "react-loader-spinner";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import { auth, db } from "@/utils/firebase";
import { SET_ACTIVE_USER } from "@/redux/slice/auth/authSlice";

const Login = () => {
  const [isLoading, setIsloading] = useState(false);
  const [isLoadingForm, setIsloadingForm] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const loginUser = (e) => {
    setIsloadingForm(true);
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const getUser = async () => {
          const docRef = doc(db, "users", user.uid); // Update to use user.uid
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userInfo = { ...docSnap.data() };
            if (userInfo.userStatus === "Admin") {
              dispatch(
                SET_ACTIVE_USER({
                  email: user.email,
                  userImageUrl: userInfo.userImageUrl,
                  userID: user.uid,
                })
              );
              setIsloadingForm(false);
              router.push("/Dashboard");
              toast.success("Login successfully");
            } else {
              toast.error("You Not Adminstatrator of DP Shop");
              setIsloadingForm(false);
            }
          } else {
            setIsloadingForm(false);
            toast.error("User Not Found!");
          }
        };
        getUser();
        setIsloadingForm(false);
      })
      .catch((error) => {
        setIsloadingForm(false);
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setIsloading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const getUser = async () => {
          const docRef = doc(db, "users", result.user.uid); // Update to use user.uid
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userInfo = { ...docSnap.data() };
            if (userInfo.userStatus === "Admin") {
              dispatch(
                SET_ACTIVE_USER({
                  email: result.user.email,
                  userImageUrl: result.user.photoURL,
                  userID: result.user.uid,
                })
              );
              setIsloading(false);
              router.push("/Dashboard");
              toast.success("Login successfully");
            } else {
              toast.error("You Are Not Adminstatrator of DP Shop");
              setIsloading(false);
            }
          } else {
            setDoc(doc(db, "users", result.user.uid), {
              email: result.user.email,
              userImageUrl: result.user.photoURL,
              userStatus: "User",
              timeStamp: serverTimestamp(),
            });
            setIsloading(false);
            toast.error("You Are Not Adminstatrator of DP Shop");
          }
        };
        setIsloading(false);
        getUser();
      })
      .catch((error) => {
        setIsloading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="mx-auto max-w-screen-2xl p-4 rounded-lg bg-dark text-white mt-24">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <div className="mb-5.5 items-center justify-center flex">
              <img className="h-24 w-28" src="/logo.png" alt="Logo" />
            </div>
            <span className="mt-15 inline-block">
              <img src="/login.gif" width="500" height="500" />
            </span>
          </div>
        </div>
        <div className="w-full xl:w-1/2 xl:border-l-4 border-gray-500">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-white sm:text-title-xl2">
              Login To DP Shop AdminPanel
            </h2>

            <form onSubmit={loginUser}>
              <div className="mb-4">
                <label className="mb-2.5 block text-xl font-semibold text-white">
                  Enter Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg py-4 text-black pl-6 pr-10 outline-none 
                    focus:ring-primary focus:outline-none focus:ring-2"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <span className="absolute right-4 top-4">
                    <ImMail3 className="fill-current h-6 w-6 text-black" />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-xl font-semibold text-white">
                  Enter Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg py-4 text-black pl-6 pr-10 outline-none 
                    focus:ring-primary focus:outline-none focus:ring-2"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span className="absolute right-4 top-4">
                    <RiLock2Fill className="fill-current h-6 w-6 text-black" />
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full bg-primary text-black rounded-lg hover:bg-green-400 text-xl font-semibold px-5 
              py-2.5 inline-flex items-center justify-center gap-3 disabled:bg-green-300 disabled:cursor-wait"
                  disabled={isLoadingForm}
                >
                  {isLoadingForm ? (
                    <>
                      <CirclesWithBar
                        className="stripe-spinner"
                        height="30"
                        width="30"
                        color="#000000"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        outerCircleColor=""
                        innerCircleColor=""
                        barColor=""
                        ariaLabel="circles-with-bar-loading"
                      />
                      Signing you in ...
                    </>
                  ) : (
                    <>Login</>
                  )}
                </button>
              </div>
              <button
                onClick={signInWithGoogle}
                className="text-black w-full rounded-lg text-xl font-semibold bg-[#4a89ee] px-5 py-2.5 inline-flex
               items-center justify-center gap-3 mr-2 mb-2 disabled:bg-blue-300 disabled:cursor-wait"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <CirclesWithBar
                      className="stripe-spinner"
                      height="30"
                      width="30"
                      color="#000000"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      outerCircleColor=""
                      innerCircleColor=""
                      barColor=""
                      ariaLabel="circles-with-bar-loading"
                    />
                    Signing you in ...
                  </>
                ) : (
                  <>
                    <FcGoogle className="h-8 w-8" />
                    Sign in with Google
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
