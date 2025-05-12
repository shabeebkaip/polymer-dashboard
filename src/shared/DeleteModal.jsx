import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setDeleteModal } from "../slices/sharedSlice";

const DeleteModal = ({ handleDelete }) => {
  const dispatch = useDispatch();
  const { deleteModal } = useSelector((state) => state.sharedState);
  console.log("deleteModal", deleteModal);
  const closeModal = () => {
    dispatch(setDeleteModal(false));
  };
  return (
    <Dialog
      open={deleteModal}
      onClose={closeModal}
      aria-labelledby="delete-dialog"
    >
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
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
