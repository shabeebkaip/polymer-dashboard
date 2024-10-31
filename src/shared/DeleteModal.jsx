import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

const DeleteModal = ({ open, closeModal, handleDelete }) => {
  return (
    <Dialog open={open} onClose={closeModal} aria-labelledby="delete-dialog">
      <DialogTitle id="delete-dialog">Delete Confirmation</DialogTitle>
      <DialogContent>Are you sure you want to delete this item?</DialogContent>
      <DialogActions sx={{ gap: 1 }}>
        <Button onClick={handleDelete} color="error" variant="contained">
          Yes
        </Button>
        <Button onClick={closeModal} color="primary" variant="contained">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  module: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
