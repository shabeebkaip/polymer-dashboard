import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
  setPaymentTermsCrud,
  setPaymentTermsModal,
} from "../../../slices/sharedSlice";

const PaymentTermsRow = ({ PaymentTerms, index, isLastRow }) => {
  const dispatch = useDispatch();

  const handleEditView = (mode) => {
    dispatch(setPaymentTermsModal(true));
    dispatch(setPaymentTermsCrud(PaymentTerms));
    dispatch(setMode(mode));
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{PaymentTerms?.name}</td>
      <td>{PaymentTerms?.description || "--"}</td>
      <td>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <EditAction handleClick={() => handleEditView("edit")} />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(PaymentTerms._id));
            }}
          />
        </div>
      </td>
    </TableRow>
  );
};
PaymentTermsRow.propTypes = {
  PaymentTerms: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default PaymentTermsRow;
