import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLoader, setSocialMediaModal } from "../../../slices/sharedSlice";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ImageUpload from "../../../shared/ImageUpload";
import { enqueueSnackbar } from "notistack";
import { socialCrud } from "../Cms-Service";

const AddEditSocialMedia = ({ mode, getResponseBack, open, onClose, editingItem }) => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.sharedState);

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && mode === "edit" && editingItem) {
      setData(editingItem);
    } else if (!open) {
      setData({});
    }
  }, [open, mode, editingItem]);

  const closeModal = () => {
    dispatch(setSocialMediaModal(false));
    if (onClose) onClose();
  };

  const validateFields = () => {
    const newErrors = {};
    if (!data.name?.trim()) newErrors.name = "Name is required";
    if (!data.link?.trim()) newErrors.link = "Link is required";
    if (!data.image?.trim()) newErrors.image = "Image is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 1000);
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    dispatch(setLoader(true));

    const payload =
      mode === "add"
        ? { content: [{ name: data.name, image: data.image, link: data.link }] }
        : { name: data.name, image: data.image, link: data.link };

    const apiCall =
      mode === "add"
        ? socialCrud.create(payload)
        : socialCrud.update(payload, data.id);

    apiCall
      .then((response) => {
        if (response.data.success) {
          enqueueSnackbar(response.data.message || "Saved successfully", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          closeModal();
          setData({});
        } else {
          enqueueSnackbar(response.data.message || "Operation failed", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      })
      .catch((error) => {
        console.error(`${mode === "add" ? "Creating" : "Updating"} social media error:`, error);
        enqueueSnackbar(`Error ${mode === "add" ? "creating" : "updating"} social media`, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      })
      .finally(() => {
        dispatch(setLoader(false));
        getResponseBack();
      });
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <h4 className="capitalize">{mode} social media</h4>
      </DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={data.name || ""}
            onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
            error={!!errors.name}
            helperText={errors.name}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Link"
            variant="outlined"
            fullWidth
            value={data.link || ""}
            onChange={(e) => setData((prev) => ({ ...prev, link: e.target.value }))}
            error={!!errors.link}
            helperText={errors.link}
            required
            InputLabelProps={{ shrink: true }}
          />
          <ImageUpload
            onFileUpload={(imageUrl) => setData((prev) => ({ ...prev, image: imageUrl }))}
            preview={data.image}
            onImageClick={() => setData((prev) => ({ ...prev, image: null }))}
            width="100%"
            height="150px"
          />
        </div>
      </DialogContent>
      <DialogActions>
        {mode === "view" ? (
          <Button onClick={closeModal} color="primary" variant="outlined">
            Close
          </Button>
        ) : (
          <>
            <Button
              onClick={handleSave}
              color="primary"
              variant="contained"
              disabled={loader}
            >
              {loader ? <CircularProgress size={30} style={{ color: "#fff" }} /> : "Save"}
            </Button>
            <Button onClick={closeModal} color="error" variant="contained">
              Cancel
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

AddEditSocialMedia.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  editingItem: PropTypes.object,
};

export default AddEditSocialMedia;
