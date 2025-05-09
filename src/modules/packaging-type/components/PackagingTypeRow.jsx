import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
  setPackagingTypeCrud,
  setPackagingTypeModal,
} from "../../../slices/sharedSlice";

const PackagingTypeRow = ({ packagingType, index, isLastRow }) => {
  const dispatch = useDispatch();

  const handleEditView = (mode) => {
    dispatch(setPackagingTypeModal(true));
    dispatch(setPackagingTypeCrud(packagingType));
    dispatch(setMode(mode));
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{packagingType?.name}</td>
      <td>{packagingType?.description || "--"}</td>
      <td>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <EditAction handleClick={() => handleEditView("edit")} />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(packagingType._id));
            }}
          />
        </div>
      </td>
    </TableRow>
  );
};
PackagingTypeRow.propTypes = {
  packagingType: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default PackagingTypeRow;
