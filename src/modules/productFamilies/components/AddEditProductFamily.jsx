import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoader, setProductFamilyModal } from "../../../slices/sharedSlice";
import PropTypes from "prop-types";
import { useState } from "react";
import ImageUpload from "../../../shared/ImageUpload";
import { createProductFamilyApi } from "../api";

const AddEditProductFamily = ({ open, mode, getResponseBack }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { loader } = useSelector((state) => state.sharedState);
  const closeModal = () => {
    dispatch(setProductFamilyModal(false));
  };
  const handleSave = () => {
    dispatch(setLoader(true));
    if (mode === "add") {
      createProductFamilyApi(data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error creating product family:", error);
        })
        .finally(() => {
          setData({});
          closeModal();
          dispatch(setLoader(false));
          getResponseBack();
        });
    } else {
      // Add logic to update the existing product family
    }
    closeModal();
  };
  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>{mode} Product Family</DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={data.description || ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <ImageUpload
            onFileUpload={(imageUrl, id) => {
              setData({ ...data, image: imageUrl, id });
            }}
            preview={data.image}
            onImageClick={() => {
              setData({ ...data, imageUrl: null });
            }}
            width="100%"
            height="150px"
          />
          <ImageUpload
            onFileUpload={(imageUrl, id) => {
              setData({ ...data, icon: imageUrl, id });
            }}
            preview={data.icon}
            onImageClick={() => {
              setData({ ...data, icon: null });
            }}
            width="100%"
            height="150px"
            text="Icon"
          />
        </div>
      </DialogContent>
      <DialogActions>
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
        <Button onClick={() => closeModal()} color="error" variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddEditProductFamily.propTypes = {
  open: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default AddEditProductFamily;
