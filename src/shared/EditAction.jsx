import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const EditAction = ({ handleClick }) => {
  return (
    <Tooltip title="Edit" arrow>
      <button className="btn" onClick={handleClick}>
        <img src={"/src/assets/tools/edit.svg"} />
      </button>
    </Tooltip>
  );
};
EditAction.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default EditAction;
