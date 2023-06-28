import Head from "next/head";
import { useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";

import {
  HeaderDetails,
  Layout,
  NavBar,
  Pagination,
  Product,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { FetchCollection } from "@/Api/Apis";
import {
  FILTER_BY_SEARCH,
  SORT_ORDERS,
  selectFilteredOrders,
} from "@/redux/slice/orders/ordersFilterSlice";
import { STORE_ORDERS, selectOrders } from "@/redux/slice/orders/ordersSlice";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const { data, loading } = FetchCollection("orders");
  const orders = useSelector(selectOrders);
  const [drop, setDrop] = useState(null);
  const filteredOrders = useSelector(selectFilteredOrders);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setordersPerPage] = useState(4);
  // Get Current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_ORDERS({
        orders: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ orders, search }));
  }, [dispatch, orders, search]);

  useEffect(() => {
    dispatch(SORT_ORDERS({ orders, sort }));
  }, [dispatch, orders, sort]);

  return (
    <Layout>
      <Head>
        <title>View orders</title>
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
              <div className="w-full mb-2">
                <NavBar
                  valueSearch={search}
                  onChangeSearch={(e) => setSearch(e.target.value)}
                  onChangeSort={(e) => setSort(e.target.value)}
                  valueSort={sort}
                  filteredItems={filteredOrders.length}
                />
              </div>
              {filteredOrders.length === 0 ? (
                <p className="font-extrabold text-2xl">No orders found.</p>
              ) : (
                <>
                  <>
                    {filteredOrders.length === 0 ? (
                      <div className="justify-center text-center text-2xl font-bold">
                        No Orders Found
                      </div>
                    ) : (
                      <div className="">
                        {currentOrders?.map((orders) => (
                          <div
                            className="block border-solid border-4 border-slate-600 rounded-lg mb-2"
                            key={orders.id}
                          >
                            <HeaderDetails
                              {...orders}
                              dropStatus={drop}
                              setDropDown={setDrop}
                              orderId={orders.id}
                            />
                            {drop === orders.id && (
                              <div key={orders.id}>
                                <div className="flex pt-4 md:hidden">
                                  <div className="flex-1">
                                    <span className="text-gray-300 space-y-1">
                                      <p>Date</p>
                                      <p className="text-gray-500">
                                        {orders.orderDate}
                                      </p>
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <span className="text-gray-300 space-y-1">
                                      <p>Total Amount</p>
                                      <p className="text-gray-500">
                                        Ksh.{orders.orderAmount}
                                      </p>
                                    </span>
                                  </div>
                                </div>
                                {orders.items?.map((products) => (
                                  <Product {...products} />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    productsPerPage={ordersPerPage}
                    totalProducts={filteredOrders.length}
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

export default Orders;
