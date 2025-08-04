import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setFinance, setModal } from "../../../slices/requestSlice";

const FinanceRow = ({ isLastRow, finance, index }) => {
  const dispatch = useDispatch();

  return (
    <TableRow isLastRow={isLastRow} index={index}>
      <td className="p-4">
        {finance?.userId?.name}
        {finance?.userId?.email && (
          <span className="block text-xs text-gray-500 truncate">
            {finance?.userId?.email}
          </span>
        )}
      </td>
      <td className=" w-24 truncate whitespace-nowrap overflow-hidden">
        {finance?.productId?.productName}
      </td>
      <td>{finance?.emiMonths} Months</td>
      <td>{finance.quantity}</td>

      <td>
        {new Date(finance?.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className="max-w-[200px] truncate">{finance?.status}</td>

      <td>
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setFinance(finance));
          }}
        />
      </td>
    </TableRow>
  );
};

FinanceRow.propTypes = {
  isLastRow: PropTypes.bool.isRequired,
  finance: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default FinanceRow;
