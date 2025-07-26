import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Pencil } from "lucide-react";


const EditAction = ({ handleClick }) => {
  return (
    <Tooltip title="Edit" arrow>
      <button
        className="rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors p-2 shadow-sm border border-emerald-200 flex items-center justify-center"
        onClick={handleClick}
        aria-label="Edit"
        type="button"
      >
        <Pencil size={20} strokeWidth={2.2} className="text-emerald-600" />
      </button>
    </Tooltip>
  );
};
EditAction.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default EditAction;
