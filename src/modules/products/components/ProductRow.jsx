import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setMode,
} from "../../../slices/sharedSlice";
import { setProductCrud } from "../../../slices/productSlice";
import { Chip, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductRow = ({ index, isLastRow, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <tr
      className={`transition-colors duration-200 border-b ${
        index % 2 === 1 ? "bg-white/60" : "bg-emerald-50/10"
      } ${isLastRow ? "border-b-emerald-400 border-b-2" : "border-b-gray-200"}`}
    >
      <td className="p-4 text-emerald-900 font-semibold text-base whitespace-nowrap">
        {product.productName}
      </td>
      <td className="text-gray-700 font-medium whitespace-nowrap">
        {product?.chemicalName || "--"}
      </td>
      <td className="max-w-xs">
        <div className="flex flex-wrap gap-2 w-32">
          {product?.industry?.length > 0
            ? product.industry.map((item, idx) => {
                const label = item?.name || "";
                const chip = (
                  <Chip
                    label={label}
                    key={idx}
                    sx={{
                      background: "#F3F4F6",
                      color: "#059669",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      borderRadius: "8px",
                      boxShadow: "0 1px 4px rgba(52,211,153,0.08)",
                      border: "1px solid #D1FAE5",
                    }}
                    size="small"
                  />
                );
                return label.length > 16 ? (
                  <Tooltip title={label} key={idx} arrow>
                    {chip}
                  </Tooltip>
                ) : (
                  chip
                );
              })
            : "--"}
        </div>
      </td>
      <td className=" text-emerald-700 font-bold whitespace-nowrap">
        {product.price}
      </td>
      <td className="px-4 py-2">
        {product?.createdBy?.company_logo ? (
          <img
            src={product.createdBy.company_logo}
            alt="Company Logo"
            className="w-12 h-12 object-cover rounded-lg border border-emerald-200 shadow-sm bg-white"
          />
        ) : (
          <span className="text-gray-400">--</span>
        )}
      </td>
      <td className="px-4 py-2">
        <div className="flex items-center gap-3">
          <EditAction
            handleClick={() => {
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
