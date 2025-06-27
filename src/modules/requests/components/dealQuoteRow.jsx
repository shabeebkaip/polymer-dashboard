import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setDealQuote } from "../../../slices/requestSlice";

const DealQuoteRow = ({ quote, index, isLastRow, getResponseBack }) => {
  const dispatch = useDispatch();

  const buyerName = `${quote?.buyerId?.firstName || ""} ${quote?.buyerId?.lastName || ""}`.trim();
  const productName = quote?.bestDealId?.productId?.productName || "—";

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{productName}</td>
      <td className="p-4">{buyerName || "—"}</td>
      <td className="p-4">{quote?.buyerId?.email || "—"}</td>
      <td className="p-4">{quote?.desiredQuantity ?? "—"}</td>
      <td className="p-4">{quote?.shippingCountry || "—"}</td>
      <td className="p-4">{quote?.paymentTerms || "—"}</td>
      <td className="p-4">{quote?.status || "—"}</td>
      <td className="p-4">
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setDealQuote(quote));
          }}
        />
      </td>
    </TableRow>
  );
};

DealQuoteRow.propTypes = {
  quote: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default DealQuoteRow;
