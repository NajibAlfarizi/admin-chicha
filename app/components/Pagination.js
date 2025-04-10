import React from "react";

const Pagination = ({ currentPage, totalItems, itemsPerPage, setPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex items-center space-x-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(1)}
        className={`px-3 py-1 text-sm rounded-md ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500"
            : "bg-gray-500 text-white hover:bg-gray-600"
        }`}
      >
        ⏮ First
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className={`px-3 py-1 text-sm rounded-md ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500"
            : "bg-gray-500 text-white hover:bg-gray-600"
        }`}
      >
        ◀ Prev
      </button>

      <span className="px-4 py-1 text-sm font-medium">
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
        className={`px-3 py-1 text-sm rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next ▶
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setPage(totalPages)}
        className={`px-3 py-1 text-sm rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        ⏭ Last
      </button>
    </div>
  );
};

export default Pagination;
