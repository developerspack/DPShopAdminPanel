import Head from "next/head";
import { CirclesWithBar } from "react-loader-spinner";

import { FetchCollection } from "@/Api/Apis";
import { AddEditBanner, Layout, ViewBanner } from "@/components";

const Banner = () => {
  const { data, loading } = FetchCollection("banner");
  // console.log(data);
  return (
    <Layout>
      <Head>
        <title>Customize Banner</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="shadow-md sm:rounded-lg lg:w-1/2 lg:-mr-52 w-[85%] overflow-x-auto">
            <div className="z-50 flex flex-col items-center justify-center">
              <div className="flex items-center gap-3">
                <CirclesWithBar
                  height="70"
                  width="70"
                  color="#4acd8d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  outerCircleColor=""
                  innerCircleColor=""
                  barColor=""
                  ariaLabel="circles-with-bar-loading"
                />
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading...
                </h2>
              </div>
              <p className="w-1/3 text-center text-white hidden lg:block">
                This may take a few seconds, please don't close this page.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <div className="w-full min-h-screen flex items-center justify-center">
              <AddEditBanner />
            </div>
          ) : (
            <div className="min-h-screen flex items-center justify-center">
              <div className="shadow-md sm:rounded-lg mt-40 lg:-mr-32 w-[85%] overflow-x-auto">
                {data.map((banner, id) => (
                  <div key={id}>
                    <ViewBanner {...banner} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Banner;
