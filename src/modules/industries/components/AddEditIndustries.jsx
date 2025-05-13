import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIndustryModal, setLoader } from "../../../slices/sharedSlice";
import PropTypes from "prop-types";
import ImageUpload from "../../../shared/ImageUpload";
import { createIndustryApi, updateIndustryApi } from "../api";
import { enqueueSnackbar } from "notistack";

const AddEditIndustries = ({ getResponseBack }) => {
  const dispatch = useDispatch();
  const {
    industryModal: open,
    industryCrud,
    mode,
  } = useSelector((state) => state.sharedState);
  const [data, setData] = useState(industryCrud);
  const [errors, setErrors] = useState({});
  const { loader } = useSelector((state) => state.sharedState);
  const closeModal = () => {
    dispatch(setIndustryModal(false));
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
      createIndustryApi(data)
        .then((response) => {
          if (response.success) {
            closeModal();
            setData({});
            getResponseBack();
            enqueueSnackbar(response?.message, {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
        })
        .catch((error) => {
          console.error("Error creating industry:", error);
        })
        .finally(() => {
          dispatch(setLoader(false));
        });
    } else {
      updateIndustryApi(data)
        .then((response) => {
          if (response.success) {
            closeModal();
            setData({});
            getResponseBack();
            enqueueSnackbar(response?.message, {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
        })
        .catch((error) => {
          console.error("Error updating industry:", error);
        })
        .finally(() => {
          dispatch(setLoader(false));
        });
    }
  };
  useEffect(() => {
    setData(industryCrud );
  }, [industryCrud ]);
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="add-edit-industries-dialog"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="add-edit-industries-dialog">
        <h4 className="capitalize">{mode} Industry </h4>
      </DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="Name"
            variant="outlined"
            value={data?.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            className=""
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
            value={data?.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
            className=""
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <ImageUpload
            onFileUpload={(imageUrl, id) => {
              setData({ ...data, bg: imageUrl, id });
            }}
            preview={data?.bg}
            onImageClick={() => {
              setData({ ...data, bg: null });
            }}
            width="100%"
            height="150px"
          />
          <ImageUpload
            onFileUpload={(imageUrl, id) => {
              setData({ ...data, icon: imageUrl, id });
            }}
            preview={data?.icon}
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

AddEditIndustries.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default AddEditIndustries;
