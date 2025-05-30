import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import viewIcon from "../../src/assets/view.svg"

const ViewAction = ({ handleClick }) => {
  return (
    <Tooltip title="View" arrow>
      <button className="btn" onClick={handleClick}>
<img src={viewIcon} alt="view icon" />      </button>
    </Tooltip>
  );
};
ViewAction.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ViewAction;
