import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import ViewAction from "../../../shared/ViewAction";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";

const ProductFamilyRow = ({ productFamily, index, isLastRow }) => {
  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{productFamily?.name}</td>
      <td>{productFamily?.description || "--"}</td>
      <td>
        <div className="pt-4 pb-4">
          <img
            src={productFamily?.image}
            className="w-48 h-20 rounded-md"
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
    </TableRow>
  );
};
ProductFamilyRow.propTypes = {
  productFamily: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default ProductFamilyRow;
