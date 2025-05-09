import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
  setPhysicalFormCrud,
  setPhysicalFormModal,
} from "../../../slices/sharedSlice";

const PhysicalFormRow = ({ physicalForm, index, isLastRow }) => {
  const dispatch = useDispatch();

  const handleEditView = (mode) => {
    dispatch(setPhysicalFormModal(true));
    dispatch(setPhysicalFormCrud(physicalForm));
    dispatch(setMode(mode));
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{physicalForm?.name}</td>
      <td>{physicalForm?.description || "--"}</td>
      <td>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <EditAction handleClick={() => handleEditView("edit")} />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(physicalForm._id));
            }}
          />
        </div>
      </td>
    </TableRow>
  );
};
PhysicalFormRow.propTypes = {
  physicalForm: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default PhysicalFormRow;
