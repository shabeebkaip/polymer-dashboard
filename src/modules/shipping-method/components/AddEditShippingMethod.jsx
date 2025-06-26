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
import {
  setLoader,
  setShippingMethodModal,
} from "../../../slices/sharedSlice";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { createShippingMethodApi, updateShippingMethodApi } from "../api";

const AddEditShippingMethod = ({ getResponseBack }) => {
  const dispatch = useDispatch();
  const {
    shippingMethodModal: open,
    shippingMethodCrud,
    mode,
    loader,
  } = useSelector((state) => state.sharedState);

  const [data, setData] = useState(shippingMethodCrud);
  const [errors, setErrors] = useState({});

  const closeModal = () => {
    dispatch(setShippingMethodModal(false));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!data.name?.trim()) newErrors.name = "Name is required";
    if (!data.description?.trim()) newErrors.description = "Description is required";
    if (!data.ar_name?.trim()) newErrors.ar_name = "Arabic Name is required";
    if (!data.ar_description?.trim()) newErrors.ar_description = "Arabic Description is required";
    if (!data.ger_name?.trim()) newErrors.ger_name = "German Name is required";
    if (!data.ger_description?.trim()) newErrors.ger_description = "German Description is required";
    if (!data.cn_name?.trim()) newErrors.cn_name = "Chinese Name is required";
    if (!data.cn_description?.trim()) newErrors.cn_description = "Chinese Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateFields()) return;
    dispatch(setLoader(true));

    const apiCall = mode === "add" ? createShippingMethodApi : updateShippingMethodApi;

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
        console.error(`Error ${mode === "add" ? "creating" : "updating"} shipping method:`, error);
        enqueueSnackbar(`Error ${mode === "add" ? "creating" : "updating"} shipping method`, {
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
    setData(shippingMethodCrud);
  }, [shippingMethodCrud]);

  const handleFieldFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <h4 className="capitalize">{mode} Shipping Method</h4>
      </DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-12 gap-4">
          {/* English */}
          <TextField
            label="Name (EN)"
            fullWidth
            className="col-span-6"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            onFocus={() => handleFieldFocus("name")}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
          <TextField
            label="Description (EN)"
            fullWidth
            multiline
            rows={3}
            className="col-span-12"
            value={data.description || ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            onFocus={() => handleFieldFocus("description")}
            error={!!errors.description}
            helperText={errors.description}
            required
          />

          {/* Arabic */}
          <TextField
            label="Name (AR)"
            fullWidth
            className="col-span-6"
            value={data.ar_name || ""}
            onChange={(e) => setData({ ...data, ar_name: e.target.value })}
            onFocus={() => handleFieldFocus("ar_name")}
            error={!!errors.ar_name}
            helperText={errors.ar_name}
            required
          />
          <TextField
            label="Description (AR)"
            fullWidth
            multiline
            rows={3}
            className="col-span-12"
            value={data.ar_description || ""}
            onChange={(e) => setData({ ...data, ar_description: e.target.value })}
            onFocus={() => handleFieldFocus("ar_description")}
            error={!!errors.ar_description}
            helperText={errors.ar_description}
            required
          />

          {/* German */}
          <TextField
            label="Name (GER)"
            fullWidth
            className="col-span-6"
            value={data.ger_name || ""}
            onChange={(e) => setData({ ...data, ger_name: e.target.value })}
            onFocus={() => handleFieldFocus("ger_name")}
            error={!!errors.ger_name}
            helperText={errors.ger_name}
            required
          />
          <TextField
            label="Description (GER)"
            fullWidth
            multiline
            rows={3}
            className="col-span-12"
            value={data.ger_description || ""}
            onChange={(e) => setData({ ...data, ger_description: e.target.value })}
            onFocus={() => handleFieldFocus("ger_description")}
            error={!!errors.ger_description}
            helperText={errors.ger_description}
            required
          />

          {/* Chinese */}
          <TextField
            label="Name (CN)"
            fullWidth
            className="col-span-6"
            value={data.cn_name || ""}
            onChange={(e) => setData({ ...data, cn_name: e.target.value })}
            onFocus={() => handleFieldFocus("cn_name")}
            error={!!errors.cn_name}
            helperText={errors.cn_name}
            required
          />
          <TextField
            label="Description (CN)"
            fullWidth
            multiline
            rows={3}
            className="col-span-12"
            value={data.cn_description || ""}
            onChange={(e) => setData({ ...data, cn_description: e.target.value })}
            onFocus={() => handleFieldFocus("cn_description")}
            error={!!errors.cn_description}
            helperText={errors.cn_description}
            required
          />
        </div>
      </DialogContent>
      <DialogActions>
        {mode === "view" ? (
          <Button onClick={closeModal} variant="outlined">
            Close
          </Button>
        ) : (
          <>
            <Button onClick={handleSave} variant="contained" color="primary" disabled={loader}>
              {loader ? <CircularProgress size={24} style={{ color: "#fff" }} /> : "Save"}
            </Button>
            <Button onClick={closeModal} variant="contained" color="error">
              Cancel
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

AddEditShippingMethod.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default AddEditShippingMethod;
