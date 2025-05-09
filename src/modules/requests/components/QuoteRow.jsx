import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setQuote } from "../../../slices/requestSlice";

const QuoteRow = ({ isLastRow, quote, index }) => {
  const dispatch = useDispatch();
  console.log("QuoteRow", quote);
  return (
    <TableRow isLastRow={isLastRow} index={index}>
      <td className="p-4">{quote?.product?.productName}</td>
      <td>{quote?.user?.name}</td>
      <td>{quote?.user?.email}</td>
      <td>{quote?.quantity}</td>
      <td>{quote?.uom}</td>
      <td>{quote?.status}</td>

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
