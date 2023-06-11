import { useEffect, useState } from "react";
import Head from "next/head";
import { CirclesWithBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

import { Layout, NavBar, Pagination, ProductCard } from "@/components";
import { FetchCollection } from "@/Api/Apis";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "@/redux/slice/product/productSlice";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "@/redux/slice/product/productFilterSlice";

const ProductView = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const { data, loading } = FetchCollection("products");
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  return (
    <Layout>
      <Head>
        <title>View Products</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-md sm:rounded-lg lg:w-1/2 lg:-mr-52 w-[85%] overflow-x-auto">
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
                <NavBar
                  valueSearch={search}
                  onChangeSearch={(e) => setSearch(e.target.value)}
                  onChangeSort={(e) => setSort(e.target.value)}
                  valueSort={sort}
                  filteredItems={filteredProducts.length}
                />
              </div>
              {filteredProducts.length === 0 ? (
                <p className="font-extrabold text-2xl">No product found.</p>
              ) : (
                <>
                  <table className="lg:w-full w-full text-sm text-left text-gray-500">
                    <thead className="uppercase bg-gray-700 text-gray-400">
                      <tr>
                        <th scope="col" className="p-2">
                          Image
                        </th>
                        <th scope="col" className="p-2 hidden lg:flex">
                          Name
                        </th>
                        <th scope="col" className="p-2">
                          Price(Ksh)
                        </th>
                        <th scope="col" className="p-2">
                          Discount
                        </th>
                        <th scope="col" className="p-2">
                          Offer_Edit
                        </th>
                        <th scope="col" className="p-2">
                          Available
                        </th>
                        <th scope="col" className="p-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {currentProducts?.map((product, id) => (
                      <tbody key={id}>
                        <ProductCard {...product} />
                      </tbody>
                    ))}
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    productsPerPage={productsPerPage}
                    totalProducts={filteredProducts.length}
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

export default ProductView;
