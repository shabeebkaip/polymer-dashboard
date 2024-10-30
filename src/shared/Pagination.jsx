import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between  bg-white text-[16px] ">
      <div className="flex items-center">
        <span className="text-[16px] text-gray-700">
          {`Total Pages: ${totalPages}`}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 text-gray-600 cursor-pointer hover:text-gray-900 disabled:opacity-50 "
        >
          <FaChevronLeft size={18} />
        </button>
        <span className="text-gray-700 ">
          {currentPage} - {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 text-gray-600 cursor-pointer hover:text-gray-900 disabled:opacity-50 "
        >
          <FaChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
