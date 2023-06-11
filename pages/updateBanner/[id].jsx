import Head from "next/head";
import { useRouter } from "next/router";
import { CirclesWithBar } from "react-loader-spinner";

import { AddEditBanner, Layout } from "@/components";
import { FetchDocument } from "@/Api/Apis";

const UpdateBanner = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading } = FetchDocument("banner", id);
  return (
    <Layout>
      <Head>
        <title>Update Banner</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      {isLoading ? (
        <div className="z-50 flex flex-col items-center justify-center min-h-screen">
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
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center">
          <AddEditBanner id={id} />
        </div>
      )}
    </Layout>
  );
};

export default UpdateBanner;
