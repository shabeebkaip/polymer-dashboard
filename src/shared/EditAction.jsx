import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import editIcon from "../../src/assets/edit.svg";


const EditAction = ({ handleClick }) => {
  return (
    <Tooltip title="Edit" arrow>
      <button className="btn" onClick={handleClick}>
        <img src={editIcon} />
      </button>
    </Tooltip>
  );
};
EditAction.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default EditAction;
