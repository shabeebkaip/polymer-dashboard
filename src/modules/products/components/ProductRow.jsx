import PropTypes from "prop-types";
import EditAction from "../../../shared/EditAction";
import ViewAction from "../../../shared/ViewAction";
import DeleteAction from "../../../shared/DeleteAction";

const ProductRow = ({ index, isLastRow, product }) => {
  return (
    <tr
      className={` border-b ${index % 2 === 1 ? "glass-card" : "dark-glass"} ${
        isLastRow ? "border-b-[3px]" : ""
      }`}
    >
      <td className="p-4 ">{product.name}</td>
      <td>{product?.brand || "--"}</td>
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
              console.log("Edit action clicked");
            }}
          />
          <DeleteAction
            handleClick={() => {
              console.log("Delete action clicked");
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
