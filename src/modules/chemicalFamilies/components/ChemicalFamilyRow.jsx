import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
    setChemicalFamilyCrud,
    setChemicalFamilyModal,
    setDeleteId,
    setDeleteModal,
    setMode,

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
            <td>
                <div className="pt-2 pb-2">
                    {chemicalFamily?.image ? (
                        <img src={chemicalFamily?.image} className="w-16 h-16 rounded-md" />
                    ) : (
                        "--"
                    )}
                </div>
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
