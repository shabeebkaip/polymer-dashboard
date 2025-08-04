import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Eye } from "lucide-react";

const ViewAction = ({ handleClick }) => {
  return (
    <Tooltip title="View" arrow>
      <button
        className="rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors p-2 shadow-sm border border-emerald-200 flex items-center justify-center"
        onClick={handleClick}
        aria-label="View"
        type="button"
      >
        <Eye size={20} strokeWidth={2.2} className="text-emerald-600" />
      </button>
    </Tooltip>
  );
};
ViewAction.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ViewAction;
