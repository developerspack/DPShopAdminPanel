import { useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  // Limit the page Numbers shown
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // GO to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    // Show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // GO to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    // Show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  // console.log(pageNumbers);

  return (
    <div className="mb-4 mt-4 float-right">
      <ul className="inline-flex -space-x-px items-center">
        <li
          onClick={paginatePrev}
          className="px-3 py-2 ml-0 leading-tight border rounded-l-lg cursor-pointer
         dark:bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
        >
          Prev
        </li>

        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li
                key={number}
                onClick={() => paginate(number)}
                className="px-3 py-2 ml-0 leading-tight border cursor-pointer
            bg-gray-800 border-gray-700 text-gray-400"
              >
                {number}
              </li>
            );
          }
        })}

        <li
          onClick={paginateNext}
          className="px-3 py-2 leading-tight border rounded-r-lg cursor-pointer bg-gray-800 
        border-gray-700 text-gray-400 hover:bg-gray-700"
        >
          Next
        </li>

        <p className="pl-4 text-white">
          <b>{`page ${currentPage}`}</b>
          <span>{` of `}</span>
          <b>{`${Math.ceil(totalPages)}`}</b>
        </p>
      </ul>
    </div>
  );
};

export default Pagination;
