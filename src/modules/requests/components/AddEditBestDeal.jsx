import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { enqueueSnackbar } from "notistack";
import { setLoader, setBestDealModal } from "../../../slices/sharedSlice";
import {
  createBestDealApi,
  updateBestDealApi,
  getAdminProductsApi,
  getAdminUsersApi,
} from "../api";

const AddEditBestDeal = ({ getResponseBack }) => {
  const dispatch = useDispatch();
  const {
    bestDealModal: open,
    bestDealCrud,
    mode,
    loader,
  } = useSelector((state) => state.sharedState);

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const isEditable =
    mode === "edit"
      ? bestDealCrud?.sellerId?.user_type === "superAdmin"
      : true;

  const closeModal = () => {
    dispatch(setBestDealModal(false));
    setData({});
    setErrors({});
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await getAdminProductsApi();
      if (response?.success) {
        setProducts(response.products || []);
      } else {
        enqueueSnackbar("Failed to load products", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error loading products", { variant: "error" });
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await getAdminUsersApi();
      if (response?.success) {
        setUsers(response.users || []);
      } else {
        enqueueSnackbar("Failed to load users", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error loading users", { variant: "error" });
    } finally {
      setLoadingUsers(false);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!data.productId) newErrors.productId = "Product is required";
    if (mode === "add" && !data.sellerId)
      newErrors.sellerId = "Seller is required";
    if (!data.offerPrice) newErrors.offerPrice = "Offer Price is required";
    if (data.offerPrice && data.offerPrice <= 0)
      newErrors.offerPrice = "Offer Price must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    dispatch(setLoader(true));
    try {
      const payload = {
        ...data,
        offerPrice: Number(data.offerPrice),
      };

      if (mode === "edit" && !isEditable) {
        enqueueSnackbar("Only admin-created best deals can be edited.", {
          variant: "error",
        });
        dispatch(setLoader(false));
        return;
      }

      const apiCall = mode === "add" ? createBestDealApi : updateBestDealApi;
      const res = await apiCall(payload);

      if (res?.success) {
        enqueueSnackbar(
          res.message ||
            `Best deal ${mode === "add" ? "created" : "updated"} successfully`,
          { variant: "success" }
        );
        getResponseBack();
        closeModal();
      } else {
        enqueueSnackbar(res?.message || "Something went wrong", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Failed to save best deal", { variant: "error" });
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    if (open) {
      fetchProducts();
      fetchUsers();
    }
  }, [open]);

  useEffect(() => {
    if (bestDealCrud && Object.keys(bestDealCrud).length > 0) {
      setData({
        ...bestDealCrud,
        productId:
          bestDealCrud.productId?._id || bestDealCrud.productId || "",
        sellerId:
          bestDealCrud.sellerId?._id || bestDealCrud.sellerId || "",
        offerPrice: bestDealCrud.offerPrice || "",
        adminNote: bestDealCrud.adminNote || "",
        status: bestDealCrud.status || "pending",
      });
    } else {
      setData({});
    }
  }, [bestDealCrud]);

  const getUserDisplayName = (user) => {
    if (!user) return "";
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    return fullName || user.email || user.name || "Unknown User";
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <h4 className="capitalize">{mode} Best Deal</h4>
      </DialogTitle>
      <DialogContent dividers>
        {!isEditable && mode === "edit" && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Only admin-created best deals can be edited.
          </Alert>
        )}
        <div className="grid grid-cols-12 gap-4">
          <FormControl
            fullWidth
            className="col-span-12"
            error={!!errors.productId}
            disabled={loadingProducts || (mode === "edit" && !isEditable)}
          >
            <InputLabel>Select Product</InputLabel>
            <Select
              value={data.productId || ""}
              onChange={(e) =>
                setData({ ...data, productId: e.target.value })
              }
              onFocus={() => handleFieldFocus("productId")}
              label="Select Product"
            >
              {loadingProducts ? (
                <MenuItem disabled>
                  <CircularProgress size={20} /> Loading products...
                </MenuItem>
              ) : (
                products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.productName}
                  </MenuItem>
                ))
              )}
            </Select>
            {errors.productId && (
              <FormHelperText>{errors.productId}</FormHelperText>
            )}
          </FormControl>

          {mode === "add" && (
            <FormControl
              fullWidth
              className="col-span-12"
              error={!!errors.sellerId}
              disabled={loadingUsers}
            >
              <InputLabel>Select Seller</InputLabel>
              <Select
                value={data.sellerId || ""}
                onChange={(e) =>
                  setData({ ...data, sellerId: e.target.value })
                }
                onFocus={() => handleFieldFocus("sellerId")}
                label="Select Seller"
              >
                {loadingUsers ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} /> Loading users...
                  </MenuItem>
                ) : (
                  users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {getUserDisplayName(user)} ({user.email})
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.sellerId && (
                <FormHelperText>{errors.sellerId}</FormHelperText>
              )}
            </FormControl>
          )}

          <TextField
            label="Offer Price"
            fullWidth
            className="col-span-6"
            type="number"
            value={data.offerPrice || ""}
            onChange={(e) =>
              setData({ ...data, offerPrice: e.target.value })
            }
            onFocus={() => handleFieldFocus("offerPrice")}
            error={!!errors.offerPrice}
            helperText={errors.offerPrice}
            inputProps={{ min: 0, step: "0.01" }}
            disabled={mode === "edit" && !isEditable}
          />

          <TextField
            label="Status"
            fullWidth
            className="col-span-6"
            select
            value={data.status || "pending"}
            onChange={(e) => setData({ ...data, status: e.target.value })}
            disabled={mode === "edit" && !isEditable}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>

          <TextField
            label="Admin Note"
            fullWidth
            className="col-span-12"
            value={data.adminNote || ""}
            onChange={(e) =>
              setData({ ...data, adminNote: e.target.value })
            }
            multiline
            rows={3}
            placeholder="Add any admin notes here..."
            disabled={mode === "edit" && !isEditable}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={
            loader ||
            loadingProducts ||
            loadingUsers ||
            (mode === "edit" && !isEditable)
          }
        >
          {loader ? (
            <CircularProgress size={20} style={{ color: "#fff" }} />
          ) : (
            `${mode === "add" ? "Create" : "Update"} Deal`
          )}
        </Button>
        <Button onClick={closeModal} color="error" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddEditBestDeal.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default AddEditBestDeal;
