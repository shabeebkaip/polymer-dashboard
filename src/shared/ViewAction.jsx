import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const ViewAction = ({ handleClick }) => {
  return (
    <Tooltip title="View" arrow>
      <button className="btn" onClick={handleClick}>
        <img src={"/actions/view.svg"} />
      </button>
    </Tooltip>
  );
};
ViewAction.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ViewAction;
