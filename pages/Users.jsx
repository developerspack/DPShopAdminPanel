import { useEffect, useState } from "react";
import Head from "next/head";
import { CirclesWithBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

import { AuthCard, AltNavBar, Pagination, Layout } from "@/components";
import { FetchCollection } from "@/Api/Apis";
import {
  FILTER_BY_SEARCH,
  SORT_AUTH,
  selectFilteredAuth,
} from "@/redux/slice/auth/authFilterSlice";
import { STORE_AUTH, selectAuth } from "@/redux/slice/auth/authSlice";

const Users = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const { data, loading } = FetchCollection("users");
  const auth = useSelector(selectAuth);
  const filteredAuth = useSelector(selectFilteredAuth);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [authPerPage, setProductsPerPage] = useState(6);
  // Get Current Products
  const indexOfLastAuth = currentPage * authPerPage;
  const indexOfFirstAuth = indexOfLastAuth - authPerPage;
  const currentAuth = filteredAuth.slice(indexOfFirstAuth, indexOfLastAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_AUTH({
        auth: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ auth, search }));
  }, [dispatch, auth, search]);

  useEffect(() => {
    dispatch(SORT_AUTH({ auth, sort }));
  }, [dispatch, auth, sort]);
  return (
    <Layout>
      <Head>
        <title>View Users</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-md sm:rounded-lg lg:w-1/2 lg:-mr-52 w-[85%] overflow-x-auto overflow-y-auto">
          {loading ? (
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
          ) : (
            <>
              <div className="w-full mb-2 lg:mt-[100px] mt-[60px]">
                <AltNavBar
                  valueSearch={search}
                  onChangeSearch={(e) => setSearch(e.target.value)}
                  onChangeSort={(e) => setSort(e.target.value)}
                  valueSort={sort}
                  filteredItems={filteredAuth.length}
                />
              </div>
              {filteredAuth.length === 0 ? (
                <p className="font-extrabold text-2xl">No User found.</p>
              ) : (
                <>
                  <table className="lg:w-full w-full text-sm text-left text-gray-500">
                    <thead className="uppercase bg-gray-700 text-gray-400">
                      <tr>
                        <th scope="col" className="p-2">
                          Image
                        </th>
                        <th scope="col" className="p-2">
                          Email
                        </th>
                        <th scope="col" className="p-2">
                          User Status
                        </th>
                      </tr>
                    </thead>
                    {currentAuth?.map((product, id) => (
                      <tbody key={id}>
                        <AuthCard {...product} />
                      </tbody>
                    ))}
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    productsPerPage={authPerPage}
                    totalProducts={filteredAuth.length}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Users;
