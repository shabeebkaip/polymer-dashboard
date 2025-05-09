import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from "@mui/material";
import { useState } from "react";

const UpdateStatusModal = ({ open, onClose, onConfirm, allowedStatuses }) => {
  const [selectedStatus, setSelectedStatus] = useState(allowedStatuses[0]);

  const handleConfirm = () => {
    onConfirm(selectedStatus); 
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Update Status</DialogTitle>
      <DialogContent>
        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          fullWidth
        >
          {allowedStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateStatusModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  allowedStatuses: PropTypes.arrayOf(PropTypes.string),
};

export default UpdateStatusModal;
