import TableRow from "../../../shared/TableRow";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
  setShippingMethodCrud,
  setShippingMethodModal,
} from "../../../slices/sharedSlice";
import PropTypes from "prop-types";

const ShippingMethodRow = ({ shippingMethod, index, isLastRow }) => {
  const dispatch = useDispatch();

  const handleEditView = (mode) => {
    dispatch(setShippingMethodModal(true));
    dispatch(setShippingMethodCrud(shippingMethod));
    dispatch(setMode(mode));
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{shippingMethod?.name}</td>
      <td>{shippingMethod?.description || "--"}</td>
      <td></td>
      <td>
        <div className="flex items-center gap-2">
          <EditAction handleClick={() => handleEditView("edit")} />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(shippingMethod._id));
            }}
          />
        </div>
      </td>
    </TableRow>
  );
};

ShippingMethodRow.propTypes = {
  shippingMethod: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default ShippingMethodRow;
