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
  import { setLoader, setIncotermsModal } from "../../../slices/sharedSlice";
  import PropTypes from "prop-types";
  import { useState } from "react";
  import { createIncotermsApi, updateIncotermsApi } from "../api";
  import { useEffect } from "react";
  import { enqueueSnackbar } from "notistack";
  
  const AddEditIncoterm = ({ getResponseBack }) => {
    const dispatch = useDispatch();
    const {
      incotermsModal: open,
      incotermsCrud,
      mode,
    } = useSelector((state) => state.sharedState);
    const [data, setData] = useState(incotermsCrud);
    const [errors, setErrors] = useState({});
    const { loader } = useSelector((state) => state.sharedState);
    const closeModal = () => {
      dispatch(setIncotermsModal(false));
    };

    const validateFields = () => {
      const newErrors = {};
      if (!data.name?.trim()) newErrors.name = "Name is required";
      if (!data.fullForm?.trim()) newErrors.fullForm = "Full form is required";
    
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
        createIncotermsApi(data)
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
            console.error("Error creating incoterms:", error);
            enqueueSnackbar("Error creating incoterms", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          })
          .finally(() => {
            dispatch(setLoader(false));
            getResponseBack();
          });
      } else {
        updateIncotermsApi(data)
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
            console.error("Error updating incoterms:", error);
            enqueueSnackbar("Error updating incoterms", {
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
      setData(incotermsCrud);
    }, [incotermsCrud]);
    return (
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>
          <h4 className="capitalize">{mode} Incoterm</h4>
        </DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Name(EN)"
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
            label="Full Form(EN)"
            variant="outlined"
            fullWidth
            value={data.fullForm || ""}
            onChange={(e) => setData({ ...data, fullForm: e.target.value })}
            error={!!errors.fullForm}
            helperText={errors.fullForm}
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            label="Name(AR)"
            variant="outlined"
            fullWidth
            value={data.ar_name || ""}
            onChange={(e) => setData({ ...data, ar_name: e.target.value })}
            error={!!errors.ar_name}
            helperText={errors.ar_name}
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Full Form(AR)"
            variant="outlined"
            fullWidth
            value={data.ar_description || ""}
            onChange={(e) => setData({ ...data, ar_description: e.target.value })}
            error={!!errors.ar_description}
            helperText={errors.ar_description}
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            label="Name(GER)"
            variant="outlined"
            fullWidth
            value={data.ger_name || ""}
            onChange={(e) => setData({ ...data, ger_name: e.target.value })}
            error={!!errors.ger_name}
            helperText={errors.ger_name}
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Full Form(GER)"
            variant="outlined"
            fullWidth
            value={data.ger_description || ""}
            onChange={(e) => setData({ ...data, ger_description: e.target.value })}
            error={!!errors.ger_description}
            helperText={errors.ger_description}
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Name(CN)"
            variant="outlined"
            fullWidth
            value={data.cn_name || ""}
            onChange={(e) => setData({ ...data, cn_name: e.target.value })}
            error={!!errors.cn_name}
            helperText={errors.cn_name}
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Full Form(CN)"
            variant="outlined"
            fullWidth
            value={data.cn_description || ""}
            onChange={(e) => setData({ ...data, cn_description: e.target.value })}
            error={!!errors.cn_description}
            helperText={errors.cn_description}
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
  
  AddEditIncoterm.propTypes = {
    open: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    getResponseBack: PropTypes.func.isRequired,
  };
  
  export default AddEditIncoterm;
  