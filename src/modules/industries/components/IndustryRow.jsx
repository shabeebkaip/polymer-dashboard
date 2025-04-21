import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setIndustryCrud,
  setIndustryModal,
  setMode,
} from "../../../slices/sharedSlice";
const IndustryRow = ({ industry, index, isLastRow }) => {
  const dispatch = useDispatch();
  const handleEditView = (mode) => {
    dispatch(setIndustryModal(true));
    dispatch(setIndustryCrud(industry));
    dispatch(setMode(mode));
  };
  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{industry?.name}</td>
      <td>{industry?.description || "--"}</td>
      <td>
        <div className="pt-2 pb-2">
          <img src={industry?.bg} className="object-contain w-20 rounded-md" />
        </div>
      </td>
      <td>
        <img src={industry?.icon} className="object-contain w-20 rounded-md " />
      </td>
      <td>
        <div className="flex items-center gap-2">
          <EditAction handleClick={() => handleEditView("edit")} />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(industry ._id));
            }}
          />
        </div>
      </td>
    </TableRow>
  );
};
IndustryRow.propTypes = {
  industry: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default IndustryRow;
