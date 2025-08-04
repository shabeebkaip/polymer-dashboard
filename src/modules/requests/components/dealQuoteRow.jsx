import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setDealQuote } from "../../../slices/requestSlice";

const DealQuoteRow = ({ quote, index, isLastRow }) => {
  const dispatch = useDispatch();

  const buyerName = quote?.buyerId?.name || "—";
  const buyerEmail = quote?.buyerId?.email || "";
  const sellerName = quote?.bestDealId?.sellerId?.name || "—";
  const sellerEmail = quote?.bestDealId?.sellerId?.email || "";
  const productName = quote?.bestDealId?.productId?.productName || "—";

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{productName}</td>
      <td className="">
        {sellerName}
        {sellerEmail && (
          <span className="block text-xs text-gray-500 truncate">
            {sellerEmail}
          </span>
        )}
      </td>
      <td className="">
        {buyerName}
        {buyerEmail && (
          <span className="block text-xs text-gray-500 truncate">
            {buyerEmail}
          </span>
        )}
      </td>
      <td className="">{quote?.desiredQuantity ?? "—"}</td>
      <td className="">{quote?.shippingCountry || "—"}</td>
      <td className="">{quote?.paymentTerms || "—"}</td>
      <td className="">{quote?.status || "—"}</td>
      <td className="">
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
