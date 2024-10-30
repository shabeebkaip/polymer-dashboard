import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";

const TableUI = ({
  data,
  columns,
  selectedItems,
  handleSelectItem,
  showCheckbox,
}) => {
  return (
    <table className="z-10 w-full border-collapse">
      <thead>
        <tr className="bg-white">
          {showCheckbox && (
            <th className="p-2 text-left border-b">
              <Checkbox
                checked={selectedItems?.length === data?.length}
                onChange={() => handleSelectItem("all")}
              />
            </th>
          )}
          {columns?.map((column) => (
            <th key={column.key} className="p-2 text-left border-b">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, index) => (
          <tr
            key={index}
            className={`hover:bg-gray-50 ${
              index % 2 === 0 ? "bg-[#F6F7F6]" : "bg-gray-100"
            }`}
          >
            {showCheckbox && (
              <td className="p-2 border-b">
                <Checkbox
                  checked={selectedItems?.includes(row?._id)}
                  onChange={() => handleSelectItem(row?._id)}
                />
              </td>
            )}
            {columns.map((column) => (
              <td key={column?.key} className="p-2 border-b ">
                <h1 className="text-[#263238]">
                  {column?.render ? column?.render(row) : row[column?.key]}
                </h1>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableUI.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  selectedItems: PropTypes.array,
  handleSelectItem: PropTypes.func,
  showCheckbox: PropTypes.bool,
};

export default TableUI;
