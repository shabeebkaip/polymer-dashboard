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
import { setLoader, setPaymentTermsModal } from "../../../slices/sharedSlice";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { createPaymentTermsApi, updatePaymentTermsApi } from "../api";
import { enqueueSnackbar } from "notistack";

const AddEditPaymentTerms = ({ getResponseBack }) => {
  const dispatch = useDispatch();
  const {
    paymentTermsModal: open,
    paymentTermsCrud,
    mode,
    loader,
  } = useSelector((state) => state.sharedState);

  const [data, setData] = useState(paymentTermsCrud);
  const [errors, setErrors] = useState({});

  const closeModal = () => {
    dispatch(setPaymentTermsModal(false));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!data.name?.trim()) newErrors.name = "Name is required";
    if (!data.description?.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateFields()) return;
    dispatch(setLoader(true));

    const apiCall = mode === "add" ? createPaymentTermsApi : updatePaymentTermsApi;

    apiCall(data)
      .then((response) => {
        if (response.success) {
          closeModal();
          setData({});
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      })
      .catch((error) => {
        console.error(`Error ${mode === "add" ? "creating" : "updating"} payment terms:`, error);
        enqueueSnackbar(`Error ${mode === "add" ? "creating" : "updating"} payment terms`, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      })
      .finally(() => {
        dispatch(setLoader(false));
        getResponseBack();
      });
  };

  useEffect(() => {
    setData(paymentTermsCrud);
  }, [paymentTermsCrud]);

  const handleFieldFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <h4 className="capitalize">{mode} Payment Terms</h4>
      </DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-12 gap-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            className="col-span-6"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            onFocus={() => handleFieldFocus("name")}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          <div className="col-span-12">
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={data.description || ""}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              onFocus={() => handleFieldFocus("description")}
              error={!!errors.description}
              helperText={errors.description}
              required
            />
          </div>
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
              {loader ? (
                <CircularProgress size="30px" style={{ color: "#fff" }} />
              ) : (
                "Save"
              )}
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

AddEditPaymentTerms.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default AddEditPaymentTerms;
