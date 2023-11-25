import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks/hooks";
import { Action } from "@reduxjs/toolkit";

const Pagination: React.FC<{
  page: number;
  total: number;
  itemsPerPage: number;
  setPage: (page: number) => Action;
  setItemsPerPage: (pages: number) => Action;
  isLoading:boolean
}> = ({ total, itemsPerPage, setPage, page, setItemsPerPage, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(page);
  const totalPages = Math.ceil(total / itemsPerPage);
  const dispatch = useAppDispatch();

  const goToPage = (page: number) => {
    setCurrentPage(page);
    dispatch(setPage(page));
  };

  const renderPaginationItems = () => {
    const pages = [];

    // Determine the start and end page numbers
    let startPage, endPage;
    if (currentPage <= 10) {
      // If current page is in the first 10 pages
      startPage = 1;
      endPage = Math.min(10, totalPages);
    } else if (currentPage > totalPages - 10) {
      // If current page is in the last 10 pages
      startPage = Math.max(totalPages - 9, 1);
      endPage = totalPages;
    } else {
      // For middle pages, show 5 pages before and after the current page
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }

    // Push the start page or ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <button disabled={isLoading} key="1" onClick={() => goToPage(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1">...</span>);
      }
    }

    // Push each page button
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
         disabled={isLoading}
          key={i}
          className={`px-3 py-1 ${
            currentPage === i ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    // Push the last page or ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2">...</span>);
      }
      pages.push(
        <button disabled={isLoading} key={totalPages} onClick={() => goToPage(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLElement>) => {
    dispatch(setItemsPerPage(parseInt((event.target as HTMLInputElement).value, 10)));
  };

  return (
    <div className="flex items-center space-x-2" style={{ width: "60rem" }}>
      <button
        className={`border-0 outline-none px-3 py-1 ${
          currentPage === 1 ? "text-gray-500" : "text-blue-500"
        }`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        <div className="cursor-pointer text-black">&lt;</div>
      </button>

      <div className="w-100">{renderPaginationItems()}</div>

      <button
        className={`border-0 outline-none px-3 py-1 ${
          currentPage === totalPages ? "text-gray-500" : "text-blue-500"
        }`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
      >
        <div className="cursor-pointer text-black">&gt;</div>
      </button>

      <div className="">Show</div>

      <div className="relative">
        <select
          disabled={isLoading}
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="block appearance-none w-full bg-white px-2 py-1 pr-7 rounded leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="10">10</option>
          <option value="9">9</option>
          <option value="8">8</option>
          <option value="7">7</option>
          <option value="6">6</option>
          <option value="5">5</option>
          <option value="4">4</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.5 7l5 5 5-5H5.5z" />
          </svg>
        </div>
      </div>

      <div>Cards per page</div>
    </div>
  );
};

export default Pagination;
