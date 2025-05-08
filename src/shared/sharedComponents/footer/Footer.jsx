import { useState } from "react";
import Pagination from "../pagination/Pagination";

const Footer = ({ totalPages, handlePageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePage = (page) => {
    setCurrentPage(page);
    handlePageChange(page);
  };

  return (
    <div className="h-15 items-center justify-center bg-white drop-shadow-md">
      <div className="flex justify-between px-6 py-4">
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePage}
          />
        </div>
        {/* <div>
          <h1 className="text-lg">© 2024 ISA</h1>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
