import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
  setIncotermsCrud,
  setIncotermsModal,
} from "../../../slices/sharedSlice";

const IncotermRow = ({ incoterm, index, isLastRow }) => {
  const dispatch = useDispatch();

  const handleEditView = (mode) => {
    dispatch(setIncotermsModal(true));
    dispatch(setIncotermsCrud(incoterm));
    dispatch(setMode(mode));
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{incoterm?.name}</td>
      <td>{incoterm?.description || "--"}</td>
      <td>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <EditAction handleClick={() => handleEditView("edit")} />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(incoterm._id));
            }}
          />
        </div>
      </td>
    </TableRow>
  );
};
IncotermRow.propTypes = {
  incoterm: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default IncotermRow;
