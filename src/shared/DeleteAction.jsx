import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import deleteIcon from '../../src/assets/delete.svg'

const DeleteAction = ({ handleClick }) => {
  return (
    <Tooltip title="Delete" arrow>
      <button className="btn" onClick={handleClick}>
        <img src={ deleteIcon } alt="Delete" />
      </button>
    </Tooltip>
  );
};
DeleteAction.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default DeleteAction;
