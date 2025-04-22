import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setSample } from "../../../slices/requestSlice";

const SampleRow = ({ isLastRow, sample, index }) => {
  const dispatch = useDispatch();

  return (
    <TableRow isLastRow={isLastRow} index={index}>
      <td className="p-4">{sample?.product?.name}</td>
      <td>{sample?.user}</td>
      <td>{sample?.industry?.name}</td>
      <td>{sample.quantity}</td>
      <td>{sample.uom}</td>
      <td>
        <span className={`status-badge ${sample?.status?.toLowerCase()}`}>
          {sample?.status}
        </span>
      </td>
      <td>
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setSample(sample));
          }}
        />
      </td>
    </TableRow>
  );
};

SampleRow.propTypes = {
  isLastRow: PropTypes.bool.isRequired,
  sample: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default SampleRow;
