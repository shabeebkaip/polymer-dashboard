import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
} from "../../../slices/sharedSlice";
import { setProductCrud, setProductModal } from "../../../slices/productSlice";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductRow = ({ index, isLastRow, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id: id } = product;
  return (
    <tr
      className={` border-b ${index % 2 === 1 ? "glass-card" : "dark-glass"} ${
        isLastRow ? "border-b-[3px]" : ""
      }`}
    >
      <td className="p-4 ">{product.productName}</td>
      <td>{product?.chemicalName || "--"}</td>
      <td className="max-w-xs">
        <div className="flex flex-wrap gap-2">
          {product?.industry?.map((item, index) => (
            <Chip label={item?.name} key={index} />
          )) || "--"}
        </div>
      </td>
            <td className="p-4 ">{product.price}</td>

      
      <td>
        <div className="flex items-center gap-2">
          <EditAction
            handleClick={() => {
              // dispatch(setProductModal(true));
              // dispatch(setProductCrud(product));
              dispatch(setProductCrud({}));
              dispatch(setMode("edit"));
              navigate(`/edit-product/${product._id}`);
              
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
