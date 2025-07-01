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
import { setLoader, setIncotermsModal } from "../../../slices/sharedSlice";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { createIncotermsApi, updateIncotermsApi } from "../api";
import { enqueueSnackbar } from "notistack";

const AddEditIncoterm = ({ getResponseBack }) => {
  const dispatch = useDispatch();
  const { incotermsModal: open, incotermsCrud, mode, loader } = useSelector((state) => state.sharedState);

  const [data, setData] = useState(incotermsCrud);
  const [errors, setErrors] = useState({});

  const closeModal = () => {
    dispatch(setIncotermsModal(false));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!data.name?.trim()) newErrors.name = "Name is required";
    if (!data.fullForm?.trim()) newErrors.fullForm = "Full form is required";
    if (!data.ar_fullForm?.trim()) newErrors.ar_fullForm = "Full form(AR) is required";
    if (!data.ger_fullForm?.trim()) newErrors.ger_fullForm = "Full form(GER) is required";
    if (!data.cn_fullForm?.trim()) newErrors.cn_fullForm = "Full form(CN) is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSave = () => {
    if (!validateFields()) return;
    dispatch(setLoader(true));

    const apiCall = mode === "add" ? createIncotermsApi : updateIncotermsApi;

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
        console.error(`Error ${mode === "add" ? "creating" : "updating"} incoterm:`, error);
        enqueueSnackbar(`Error ${mode === "add" ? "creating" : "updating"} incoterm`, {
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
    setData(incotermsCrud);
  }, [incotermsCrud]);

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <h4 className="capitalize">{mode} Incoterm</h4>
      </DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-12 gap-4">
          <TextField
            label="Name(EN)"
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
              label="Full form(EN)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={data.fullForm || ""}
              onChange={(e) => setData({ ...data, fullForm: e.target.value })}
              onFocus={() => handleFieldFocus("fullForm")}
              error={!!errors.fullForm}
              helperText={errors.fullForm}
              required
            />
          </div>
          <div className="col-span-12">
            <TextField
              label="Full form(AR)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={data.ar_fullForm || ""}
              onChange={(e) => setData({ ...data, ar_fullForm: e.target.value })}
              onFocus={() => handleFieldFocus("ar_fullForm")}
              error={!!errors.ar_fullForm}
              helperText={errors.ar_fullForm}
              required
            />
          </div>
          <div className="col-span-12">
            <TextField
              label="Full form(GER)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={data.ger_fullForm || ""}
              onChange={(e) => setData({ ...data, ger_fullForm: e.target.value })}
              onFocus={() => handleFieldFocus("ger_fullForm")}
              error={!!errors.ger_fullForm}
              helperText={errors.ger_fullForm}
              required
            />
          </div>
          <div className="col-span-12">
            <TextField
              label="Full form(CN)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={data.cn_fullForm || ""}
              onChange={(e) => setData({ ...data, cn_fullForm: e.target.value })}
              onFocus={() => handleFieldFocus("cn_fullForm")}
              error={!!errors.cn_fullForm}
              helperText={errors.cn_fullForm}
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
            <Button onClick={handleSave} color="primary" variant="contained" disabled={loader}>
              {loader ? <CircularProgress size="30px" style={{ color: "#fff" }} /> : "Save"}
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

AddEditIncoterm.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default AddEditIncoterm;
