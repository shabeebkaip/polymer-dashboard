import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setQuote } from "../../../slices/requestSlice";
import Chip from "@mui/material/Chip";

const QuoteRow = ({ isLastRow, quote, index }) => {
  const dispatch = useDispatch();
  console.log("QuoteRow", quote);
  return (
    <TableRow isLastRow={isLastRow} index={index}>
      <td className="p-4">{quote?.productName}</td>
      <td>
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-emerald-900 font-semibold text-sm">
            {quote?.buyer?.email}
          </span>
          <span className="text-gray-500 text-xs font-normal">
            {quote?.buyer?.firstName} {quote?.buyer?.lastName}
          </span>
        </div>
      </td>
      <td>{quote?.quantity}</td>
      <td>
        <Chip
          label={quote?.status}
          color={
            quote?.status === "Approved"
              ? "success"
              : quote?.status === "Pending"
              ? "warning"
              : "default"
          }
          size="small"
          variant="outlined"
        />
      </td>
      <td>
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setQuote(quote));
          }}
        />
      </td>
    </TableRow>
  );
};
QuoteRow.propTypes = {
  isLastRow: PropTypes.bool.isRequired,
  quote: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default QuoteRow;
