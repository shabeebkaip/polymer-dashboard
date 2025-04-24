import PropTypes from "prop-types";
const TableRow = ({ children, index, isLastRow }) => {
  return (
    <tr
      className={` border-b ${index % 2 === 1 ? "glass-card" : "dark-glass"} ${
        isLastRow ? "border-b-[3px]" : ""
      } hover:bg-yellow-400 `}
    >
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default TableRow;
