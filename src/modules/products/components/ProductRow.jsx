import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import ViewAction from "../../../shared/ViewAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
} from "../../../slices/sharedSlice";
import { setProductCrud, setProductModal } from "../../../slices/productSlice";

const ProductRow = ({ index, isLastRow, product }) => {
  const dispatch = useDispatch();
  return (
    <tr
      className={` border-b ${index % 2 === 1 ? "glass-card" : "dark-glass"} ${
        isLastRow ? "border-b-[3px]" : ""
      }`}
    >
      <td className="p-4 ">{product.name}</td>
      <td>{product?.brand?.name || "--"}</td>
      <td>{product?.category || "--"}</td>
      <td>
        <div className="flex items-center gap-2">
          <ViewAction
            handleClick={() => {
              console.log("View action clicked");
            }}
          />
          <EditAction
            handleClick={() => {
              dispatch(setProductModal(true));
              dispatch(setMode("edit"));
              dispatch(setProductCrud(product));
            }}
          />
          <DeleteAction
            handleClick={() => {
              dispatch(setDeleteModal(true));
              dispatch(setDeleteId(product._id));
            }}
          />
        </div>
      </td>
    </tr>
  );
};
ProductRow.propTypes = {
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
};
export default ProductRow;
