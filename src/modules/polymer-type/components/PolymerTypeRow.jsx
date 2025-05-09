import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
  setPolymerTypeCrud,
  setPolymerTypeModal,
} from "../../../slices/sharedSlice";

const PolymerTypeRow = ({ polymerType, index, isLastRow }) => {
  const dispatch = useDispatch();

  const handleEditView = (mode) => {
    dispatch(setPolymerTypeModal(true));
    dispatch(setPolymerTypeCrud(polymerType));
    dispatch(setMode(mode));
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{polymerType?.name}</td>
      <td>{polymerType?.description || "--"}</td>
      <td>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <EditAction handleClick={() => handleEditView("edit")} />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(polymerType._id));
            }}
          />
        </div>
      </td>
    </TableRow>
  );
};
PolymerTypeRow.propTypes = {
  polymerType: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default PolymerTypeRow;
