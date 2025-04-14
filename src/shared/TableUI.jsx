import PropTypes from "prop-types";

const TableUI = ({ data, tableHeader, children }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr
          className="bg-white "
          style={{
            position: "sticky",
            top: "0",
            zIndex: 2,
          }}
        >
          {tableHeader?.map((head, index) => (
            <th
              key={index}
              className={`p-4 text-left border-b h-[20px] font-semibold w-fit `}
              style={{
                color: "#263238",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

TableUI.propTypes = {
  data: PropTypes.array.isRequired,
  tableHeader: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export default TableUI;
