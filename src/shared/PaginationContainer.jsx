import Pagination from "./Pagination";
import PropTypes from "prop-types";

const PaginationContainer = ({ totalPages, handlePageChange, currentPage }) => {
  const handlePage = (page) => {
    handlePageChange(page);
  };

  return (
    <div className="flex items-center justify-center w-full ">
      <div className="rounded-xl shadow-lg border border-emerald-200 bg-white/80 backdrop-blur-md px-8 py-4 flex justify-end w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePage}
        />
      </div>
    </div>
  );
};

PaginationContainer.propTypes = {
  totalPages: PropTypes.number,
  handlePageChange: PropTypes.func,
  currentPage: PropTypes.number,
};

export default PaginationContainer;
