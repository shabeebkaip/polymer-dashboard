import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import EditAction from "../../../shared/EditAction";
import DeleteAction from "../../../shared/DeleteAction";
const IndustryRow = ({ industry, index, isLastRow }) => {
  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{industry?.name}</td>
      <td>{industry?.description || "--"}</td>
      <td>
        <img src={industry?.bg} className="w-48" />
      </td>
      <td>
        <img src={industry?.icon} className="w-6" />
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
IndustryRow.propTypes = {
  industry: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
};

export default IndustryRow;
