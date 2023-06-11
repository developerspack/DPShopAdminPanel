import { useEffect, useState } from "react";
import Head from "next/head";
import { CirclesWithBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import {
  AddEditBrand,
  BrandCard,
  AltNavBar,
  Pagination,
  Layout,
} from "@/components";
import { FetchCollection, FetchDocument } from "@/Api/Apis";
import {
  FILTER_BY_SEARCH,
  SORT_BRAND,
  selectFilteredbrand,
} from "@/redux/slice/brand/brandFilter";
import { STORE_BRAND, selectBrand } from "@/redux/slice/brand/brandSlice";

const CustomizeBrand = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const { data } = FetchCollection("brand");
  const brand = useSelector(selectBrand);
  const filteredBrand = useSelector(selectFilteredbrand);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPerPage, setCategoryPerPage] = useState(6);
  // Get Current Products
  const indexOfLastBrand = currentPage * categoryPerPage;
  const indexOfFirstBrand = indexOfLastBrand - categoryPerPage;
  const currentBrand = filteredBrand.slice(indexOfFirstBrand, indexOfLastBrand);

  const router = useRouter();
  const { id } = router.query;
  const { isLoading } = FetchDocument("brand", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_BRAND({
        brand: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ brand, search }));
  }, [dispatch, brand, search]);

  useEffect(() => {
    dispatch(SORT_BRAND({ brand, sort }));
  }, [dispatch, brand, sort]);

  return (
    <Layout>
      <Head>
        <title>Update Brand</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-md sm:rounded-lg lg:w-1/2 lg:-mr-52 w-[85%] overflow-x-auto">
          {isLoading ? (
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
                  filteredproducts={filteredBrand.length}
                />
              </div>
              <div className="shadow-md sm:rounded-lg w-full overflow-x-auto">
                <table className="lg:w-full w-full text-sm text-left text-gray-500">
                  <thead className="uppercase bg-gray-700 text-gray-400">
                    <tr>
                      <th scope="col" className="p-2">
                        Image
                      </th>
                      <th scope="col" className="p-2">
                        Name
                      </th>
                      <th scope="col" className="p-2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <AddEditBrand id={id} />
                  {filteredBrand.length === 0 ? (
                    <p className="font-extrabold text-2xl">No Brand found.</p>
                  ) : (
                    <>
                      {currentBrand?.map((brand, id) => (
                        <tbody key={id}>
                          <BrandCard {...brand} />
                        </tbody>
                      ))}
                    </>
                  )}
                </table>
              </div>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                productsPerPage={categoryPerPage}
                totalProducts={filteredBrand.length}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CustomizeBrand;
