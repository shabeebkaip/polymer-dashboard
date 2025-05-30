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
import { setLoader, setIndustryModal } from "../../../slices/sharedSlice";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ImageUpload from "../../../shared/ImageUpload";
import { createIndustryApi, updateIndustryApi } from "../api";
import { enqueueSnackbar } from "notistack";

const AddEditIndustry = ({ getResponseBack }) => {
  const dispatch = useDispatch();
  const {
    industryModal: open,
    industryCrud,
    mode,
    loader,
  } = useSelector((state) => state.sharedState);

  const [data, setData] = useState(industryCrud);
  const [errors, setErrors] = useState({});

  const closeModal = () => dispatch(setIndustryModal(false));

  const validateFields = () => {
    const newErrors = {};
    if (!data.name?.trim()) newErrors.name = "Name is required";
    if (!data.description?.trim()) newErrors.description = "Description is required";
    if (!data.ar_name?.trim()) newErrors.ar_name = "Name(AR) is required";
    if (!data.ar_description?.trim()) newErrors.ar_description = "Description(AR) is required";
    if (!data.ger_name?.trim()) newErrors.ger_name = "Name(GER) is required";
    if (!data.ger_description?.trim()) newErrors.ger_description = "Description(GER) is required";
    if (!data.cn_name?.trim()) newErrors.cn_name = "Name(CN) is required";
    if (!data.cn_description?.trim()) newErrors.cn_description = "Description(CN) is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSave = () => {
    if (!validateFields()) return;
    dispatch(setLoader(true));

    const apiCall = mode === "add" ? createIndustryApi : updateIndustryApi;

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
        console.error(`Error ${mode === "add" ? "creating" : "updating"} industry:`, error);
        enqueueSnackbar(`Error ${mode === "add" ? "creating" : "updating"} industry`, {
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
    setData(industryCrud);
  }, [industryCrud]);

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <h4 className="capitalize">{mode} Industry</h4>
      </DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-12 gap-4">
          {/* EN */}
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
              label="Description(EN)"
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

          {/* AR */}
          <TextField
            label="Name(AR)"
            variant="outlined"
            fullWidth
            className="col-span-6"
            value={data.ar_name || ""}
            onChange={(e) => setData({ ...data, ar_name: e.target.value })}
            onFocus={() => handleFieldFocus("ar_name")}
            error={!!errors.ar_name}
            helperText={errors.ar_name}
            required
          />
          <div className="col-span-12">
            <TextField
              label="Description(AR)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={data.ar_description || ""}
              onChange={(e) => setData({ ...data, ar_description: e.target.value })}
              onFocus={() => handleFieldFocus("ar_description")}
              error={!!errors.ar_description}
              helperText={errors.ar_description}
              required
            />
          </div>

          {/* GER */}
          <TextField
            label="Name(GER)"
            variant="outlined"
            fullWidth
            className="col-span-6"
            value={data.ger_name || ""}
            onChange={(e) => setData({ ...data, ger_name: e.target.value })}
            onFocus={() => handleFieldFocus("ger_name")}
            error={!!errors.ger_name}
            helperText={errors.ger_name}
            required
          />
          <div className="col-span-12">
            <TextField
              label="Description(GER)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={data.ger_description || ""}
              onChange={(e) => setData({ ...data, ger_description: e.target.value })}
              onFocus={() => handleFieldFocus("ger_description")}
              error={!!errors.ger_description}
              helperText={errors.ger_description}
              required
            />
          </div>

          {/* CN */}
          <TextField
            label="Name(CN)"
            variant="outlined"
            fullWidth
            className="col-span-6"
            value={data.cn_name || ""}
            onChange={(e) => setData({ ...data, cn_name: e.target.value })}
            onFocus={() => handleFieldFocus("cn_name")}
            error={!!errors.cn_name}
            helperText={errors.cn_name}
            required
          />
          <div className="col-span-12">
            <TextField
              label="Description(CN)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={data.cn_description || ""}
              onChange={(e) => setData({ ...data, cn_description: e.target.value })}
              onFocus={() => handleFieldFocus("cn_description")}
              error={!!errors.cn_description}
              helperText={errors.cn_description}
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

AddEditIndustry.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default AddEditIndustry;
