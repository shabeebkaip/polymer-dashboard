import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
  setProductFamilyCrud,
  setProductFamilyModal,
} from "../../../slices/sharedSlice";

const ProductFamilyRow = ({ productFamily, index, isLastRow }) => {
  const dispatch = useDispatch();

  const handleEditView = (mode) => {
    dispatch(setProductFamilyModal(true));
    dispatch(setProductFamilyCrud(productFamily));
    dispatch(setMode(mode));
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{productFamily?.name}</td>
      <td>{productFamily?.description || "--"}</td>
      <td>
        <div className="pt-2 pb-2">
          <img
            src={productFamily?.image}
            className="w-16 h-16 rounded-md"
            alt="Background"
          />
        </div>
      </td>
      <td>
        {productFamily?.icon ? (
          <img src={productFamily?.icon} className="w-6" alt="Icon" />
        ) : (
          "--"
        )}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <EditAction handleClick={() => handleEditView("edit")} />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(productFamily._id));
            }}
          />
        </div>
      </td>
    </TableRow>
  );
};
ProductFamilyRow.propTypes = {
  productFamily: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default ProductFamilyRow;
