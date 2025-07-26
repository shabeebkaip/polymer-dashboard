import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";

const DeleteAction = ({ handleClick }) => {
  return (
    <Tooltip title="Delete" arrow>
      <button
        className="rounded-lg bg-red-50 hover:bg-red-100 transition-colors p-2 shadow-sm border border-red-200 flex items-center justify-center"
        onClick={handleClick}
        aria-label="Delete"
        type="button"
      >
        <Trash2 size={20} strokeWidth={2.2} className="text-red-600" />
      </button>
    </Tooltip>
  );
};
DeleteAction.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default DeleteAction;
