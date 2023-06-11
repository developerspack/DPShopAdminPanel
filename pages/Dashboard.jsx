import Head from "next/head";
import { CirclesWithBar } from "react-loader-spinner";
import { BsFillCartCheckFill } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

import { FetchCollection, FetchProductsReviews } from "@/Api/Apis";
import {
  BrandChart,
  Card,
  CategoryChart,
  OrderChart,
  ProductChart,
  Layout,
} from "@/components";

const Dashboard = () => {
  const { product, isLoading } = FetchProductsReviews("products");
  const { data: ordersData } = FetchCollection("orders");
  const { data: productsData } = FetchCollection("products");
  const { data: reviewsData } = FetchCollection("reviews");
  const { data: usersData } = FetchCollection("users");

  // console.log(data);
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-md sm:rounded-lg w-[85%] lg:pl-80">
          {isLoading ? (
            <div className="z-50 flex flex-col items-center justify-center">
              <div className="flex items-center gap-3">
                <CirclesWithBar
                  height="70"
                  width="70"
                  color="#4acd8d"
                  visible={true}
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
            <>
              <main className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 xl:grid-cols-4 lg:mt-16 mt-24">
                  <Card
                    Name="Total Sales"
                    No={ordersData.length}
                    icon={
                      <BsFillCartCheckFill className="h-10 w-10 text-gray-500" />
                    }
                  />
                  <Card
                    Name="No of Products"
                    No={productsData.length}
                    icon={<GiRunningShoe className="h-10 w-10 text-gray-500" />}
                  />
                  <Card
                    Name="No of Users"
                    No={usersData.length}
                    icon={<FaUsers className="h-10 w-10 text-gray-500" />}
                  />
                  <Card
                    Name="No of Reviewers"
                    No={reviewsData.length}
                    icon={<MdRateReview className="h-10 w-10 text-gray-500" />}
                  />
                </div>

                <div className="mt-6 grid lg:grid-cols-2 gap-2 grid-cols-1">
                  <ProductChart products={product} />
                  <OrderChart />
                </div>
                <div className="grid lg:grid-cols-2 gap-2 mt-2 grid-cols-1">
                  <CategoryChart />
                  <BrandChart />
                </div>
              </main>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
