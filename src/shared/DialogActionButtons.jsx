import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const DialogActionButtons = ({ closeModal, mode, handleSave, loader }) => {
  return (
    <>
      {mode === "view" ? (
        <Button onClick={() => closeModal()} color="primary" variant="outlined">
          Close
        </Button>
      ) : (
        <>
          <Button
            onClick={() => {
              handleSave();
            }}
            color="primary"
            variant="contained"
          >
            {loader ? (
              <CircularProgress size="30px" style={{ color: "#ffffff" }} />
            ) : (
              "Save"
            )}
          </Button>
          <Button
            onClick={() => closeModal()}
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
};

DialogActionButtons.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
};

export default DialogActionButtons;
