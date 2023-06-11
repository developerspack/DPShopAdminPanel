import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import { store } from "../redux/store";
import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Component {...pageProps} />
    </Provider>
  );
}
