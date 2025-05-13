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
import { createProductFamilyApi, updateProductFamilyApi } from "../api";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const AddEditProductFamily = ({ getResponseBack }) => {
  const dispatch = useDispatch();
  const {
    productFamilyModal: open,
    productFamilyCrud,
    mode,
  } = useSelector((state) => state.sharedState);
  const [data, setData] = useState(productFamilyCrud);
  const [errors, setErrors] = useState({});
  const { loader } = useSelector((state) => state.sharedState);
  const closeModal = () => {
    dispatch(setProductFamilyModal(false));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!data.name?.trim()) newErrors.name = "Name is required";
    if (!data.description?.trim()) newErrors.description = "Description is required";
  
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
    if (mode === "add") {
      createProductFamilyApi(data)
        .then((response) => {
          if (response.success) {
            closeModal();
            setData({});
            enqueueSnackbar(response?.message, {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
        })
        .catch((error) => {
          console.error("Error creating product family:", error);
          enqueueSnackbar("Error creating product family", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        })
        .finally(() => {
          dispatch(setLoader(false));
          getResponseBack();
        });
    } else {
      updateProductFamilyApi(data)
        .then((response) => {
          if (response.success) {
            setData({});
            closeModal();
            enqueueSnackbar(response?.message, {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
        })
        .catch((error) => {
          console.error("Error updating product family:", error);
          enqueueSnackbar("Error updating product family", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        })
        .finally(() => {
          dispatch(setLoader(false));
          getResponseBack();
        });
    }
  };

  useEffect(() => {
    setData(productFamilyCrud);
  }, [productFamilyCrud]);
  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <h4 className="capitalize">{mode} Product Family</h4>
      </DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
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
            error={!!errors.description}
            helperText={errors.description}
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
        {mode === "view" ? (
          <Button
            onClick={() => closeModal()}
            color="primary"
            variant="outlined"
          >
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
