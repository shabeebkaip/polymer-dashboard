import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";

const SearchBar = ({ fetchEmployees }) => {
  const [text, setText] = useState("");
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setText(newValue);
    fetchEmployees(newValue);

    if (newValue.length === 0) {
      handleClear("");
    }
  };

  const clearSearch = () => {
    setText("");
    handleChange("");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleChange(text);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [text]);
  const handleClear = () => {};
  const handleChange = () => {};

  return (
    <div
      className={`flex w-[450px] relative h-[50px] flex-grow items-center justify-around gap-2 rounded-full bg-white p-2 md:flex-grow-0 md:gap-1 xl:gap-2`}
    >
      <div className="flex h-full items-center rounded-full bg-[#F5F7FE] text-navy-700 w-full gap-2 px-3">
        <p className="">
          <FiSearch className="w-4 h-4 text-gray-400" />
        </p>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Search..."
          className="block h-full w-full  bg-[#F5F7FE] text-lg outline-none placeholder:!text-gray-400 "
        />
        {text && (
          <button onClick={clearSearch} className="focus:outline-none">
            <AiOutlineClose
              className="w-4 h-4 text-black"
              onClick={handleClear}
            />
          </button>
        )}
      </div>
    </div>
  );
};
SearchBar.propTypes = {
  fetchEmployees: PropTypes.func,
};

export default SearchBar;
