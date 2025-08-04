import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setSupplierOffer } from "../../../slices/requestSlice";

const SupplierOfferRow = ({ offer, index, isLastRow, getResponseBack }) => {
  const dispatch = useDispatch();

  const supplierName = `${offer?.supplierId?.name || ""}`.trim();
  const supplierEmail = offer?.supplierId?.email || "";
  const productName = offer?.bulkOrderId?.product?.productName || "—";
  const quantityWithUOM = offer?.bulkOrderId?.uom
    ? `${offer?.availableQuantity || "—"} ${offer?.bulkOrderId?.uom}`
    : offer?.availableQuantity || "—";

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{productName}</td>
      <td className="">${offer?.pricePerUnit || "—"}</td>
      <td className="">{quantityWithUOM}</td>
      <td className="">{offer?.deliveryTimeInDays || "—"} days</td>
      <td className="">{offer?.incotermAndPackaging || "—"}</td>
      <td className="">
        {supplierName || "—"}
        {supplierEmail && (
          <span className="block text-xs text-gray-500 truncate">
            {supplierEmail}
          </span>
        )}
      </td>
      <td className="p-4">{offer?.status || "—"}</td>
      <td className="p-4">
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setSupplierOffer(offer));
          }}
        />
      </td>
    </TableRow>
  );
};

SupplierOfferRow.propTypes = {
  offer: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default SupplierOfferRow;
