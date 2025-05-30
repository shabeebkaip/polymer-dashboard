import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const DeleteAction = ({ handleClick }) => {
  return (
    <Tooltip title="Delete" arrow>
      <button className="btn" onClick={handleClick}>
        <img src={"/src/assets/delete.svg"} alt="Delete" />
      </button>
    </Tooltip>
  );
};
DeleteAction.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default DeleteAction;
