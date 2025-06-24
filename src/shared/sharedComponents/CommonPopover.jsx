import { Popover } from "@mui/material";
import PropTypes from "prop-types";

const CommonPopover = ({
  id, open, anchorEl, handleClose, children,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  transformOrigin = { vertical: "top", horizontal: "right" },
}) => (
  <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={anchorOrigin}
    transformOrigin={transformOrigin}
    PaperProps={{
      sx: {
        width: 216,
        boxShadow: "-4px 6px 7px rgba(104,104,104,0.1),4px -6px 7px rgba(104,104,104,0.1)",
        borderRadius: 1,
        p: 1.5,
      },
    }}
  >
    <div className="flex flex-col w-full gap-2 cursor-pointer">{children}</div>
  </Popover>
);

CommonPopover.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.any,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CommonPopover;
