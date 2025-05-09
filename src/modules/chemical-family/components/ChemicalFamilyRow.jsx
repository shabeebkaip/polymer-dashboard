import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
  setChemicalFamilyCrud,
  setChemicalFamilyModal,
} from "../../../slices/sharedSlice";

const ChemicalFamilyRow = ({ chemicalFamily, index, isLastRow }) => {
  const dispatch = useDispatch();

  const handleEditView = (mode) => {
    dispatch(setChemicalFamilyModal(true));
    dispatch(setChemicalFamilyCrud(chemicalFamily));
    dispatch(setMode(mode));
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{chemicalFamily?.name}</td>
      <td>{chemicalFamily?.description || "--"}</td>
      <td>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <EditAction handleClick={() => handleEditView("edit")} />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(chemicalFamily._id));
            }}
          />
        </div>
      </td>
    </TableRow>
  );
};
ChemicalFamilyRow.propTypes = {
  chemicalFamily: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default ChemicalFamilyRow;
