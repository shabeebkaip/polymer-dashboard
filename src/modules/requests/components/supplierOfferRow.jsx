import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setSupplierOffer } from "../../../slices/requestSlice";

const SupplierOfferRow = ({ offer, index, isLastRow, getResponseBack }) => {
  const dispatch = useDispatch();

  const supplierName = `${offer?.supplierId?.firstName || ""} ${offer?.supplierId?.lastName || ""}`.trim();

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{offer?.bulkOrderId?.product || "—"}</td>
      <td className="p-4">{offer?.pricePerUnit || "—"}</td>
      <td className="p-4">{offer?.availableQuantity || "—"}</td>
      <td className="p-4">{supplierName || "—"}</td>
      <td className="p-4">{offer?.supplierId?.email || "—"}</td>
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
