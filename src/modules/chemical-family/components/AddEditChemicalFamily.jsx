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
  import { setLoader, setChemicalFamilyModal } from "../../../slices/sharedSlice";
  import PropTypes from "prop-types";
  import { useState } from "react";
  import { createChemicalFamilyApi, updateChemicalFamilyApi } from "../api";
  import { useEffect } from "react";
  import { enqueueSnackbar } from "notistack";
  
  const AddEditChemicalFamily = ({ getResponseBack }) => {
    const dispatch = useDispatch();
    const {
      chemicalFamilyModal: open,
      chemicalFamilyCrud,
      mode,
    } = useSelector((state) => state.sharedState);
    const [data, setData] = useState(chemicalFamilyCrud);
    const [errors, setErrors] = useState({});

    const { loader } = useSelector((state) => state.sharedState);
    const closeModal = () => {
      dispatch(setChemicalFamilyModal(false));
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
        createChemicalFamilyApi(data)
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
            console.error("Error creating chemical Family:", error);
            enqueueSnackbar("Error creating chemical Family", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          })
          .finally(() => {
            dispatch(setLoader(false));
            getResponseBack();
          });
      } else {
        updateChemicalFamilyApi(data)
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
            console.error("Error updating chemical Family:", error);
            enqueueSnackbar("Error updating chemical Family", {
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
      setData(chemicalFamilyCrud);
    }, [chemicalFamilyCrud]);
    return (
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>
          <h4 className="capitalize">{mode} chemical Family</h4>
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
  
  AddEditChemicalFamily.propTypes = {
    open: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    getResponseBack: PropTypes.func.isRequired,
  };
  
  export default AddEditChemicalFamily;
  