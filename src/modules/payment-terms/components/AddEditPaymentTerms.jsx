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
  import { setLoader, setPaymentTermsModal } from "../../../slices/sharedSlice";
  import PropTypes from "prop-types";
  import { useState } from "react";
  import { createPaymentTermsApi, updatePaymentTermsApi } from "../api";
  import { useEffect } from "react";
  import { enqueueSnackbar } from "notistack";
  
  const AddEditPaymentTerms = ({ getResponseBack }) => {
    const dispatch = useDispatch();
    const {
      paymentTermsModal: open,
      paymentTermsCrud,
      mode,
    } = useSelector((state) => state.sharedState);
    console.log(paymentTermsCrud,"Payment Terms");
    
    const [data, setData] = useState(paymentTermsCrud);
    const { loader } = useSelector((state) => state.sharedState);
    const closeModal = () => {
      dispatch(setPaymentTermsModal(false));
    };
    const handleSave = () => {
      dispatch(setLoader(true));
      if (mode === "add") {
        createPaymentTermsApi(data)
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
            console.error("Error creating payment terms:", error);
            enqueueSnackbar("Error creating payment terms", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          })
          .finally(() => {
            dispatch(setLoader(false));
            getResponseBack();
          });
      } else {
        updatePaymentTermsApi(data)
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
            console.error("Error updating payment terms:", error);
            enqueueSnackbar("Error updating payment terms", {
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
      setData(paymentTermsCrud);
    }, [paymentTermsCrud]);
    return (
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>
          <h4 className="capitalize">{mode} payment terms</h4>
        </DialogTitle>
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
  
  AddEditPaymentTerms.propTypes = {
    open: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    getResponseBack: PropTypes.func.isRequired,
  };
  
  export default AddEditPaymentTerms;
  