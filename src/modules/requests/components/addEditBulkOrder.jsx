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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { enqueueSnackbar } from "notistack";
import { setLoader, setBulkOrderModal } from "../../../slices/sharedSlice";
import { createBulkOrderApi, updateBulkOrderApi, getAdminProductsApi } from "../api";

const AddEditBulkOrder = ({ getResponseBack }) => {
  const dispatch = useDispatch();
  const {
    bulkOrderModal: open,
    bulkOrderCrud,
    mode,
    loader,
  } = useSelector((state) => state.sharedState);

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const closeModal = () => {
    dispatch(setBulkOrderModal(false));
    setData({});
    setErrors({});
  };

  // Fetch products for dropdown
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await getAdminProductsApi();
      if (response?.success) {
        setProducts(response.products || []);
      } else {
        enqueueSnackbar("Failed to load products", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      enqueueSnackbar("Error loading products", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!data.productId) newErrors.productId = "Product is required";
    if (!data.quantity) newErrors.quantity = "Quantity is required";
    if (!data.uom) newErrors.uom = "UOM is required";
    if (!data.city) newErrors.city = "City is required";
    if (!data.country) newErrors.country = "Country is required";
    if (!data.destination) newErrors.destination = "Destination is required";
    if (!data.delivery_date) newErrors.delivery_date = "Delivery Date is required";
    
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
  product: data.productId, // ✅ rename productId to product
  quantity: Number(data.quantity),
};
delete payload.productId; // optional: clean up the key


      const apiCall = mode === "add" ? createBulkOrderApi : updateBulkOrderApi;
      const res = await apiCall(payload);

      if (res?.success) {
        enqueueSnackbar(res.message || `Bulk order ${mode === "add" ? "created" : "updated"} successfully`, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        getResponseBack();
        closeModal();
      } else {
        enqueueSnackbar(res?.message || "Something went wrong", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      console.error("Save Error:", error);
      enqueueSnackbar("Failed to save bulk order", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } finally {
      dispatch(setLoader(false));
    }
  };

  // Load products when modal opens
  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open]);

  // Set data when bulkOrderCrud changes
  useEffect(() => {
    if (bulkOrderCrud && Object.keys(bulkOrderCrud).length > 0) {
      setData({
        ...bulkOrderCrud,
        productId: bulkOrderCrud.product?._id || bulkOrderCrud.productId || "",
        delivery_date: bulkOrderCrud.delivery_date || "",
      });
    } else {
      setData({});
    }
  }, [bulkOrderCrud]);

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <h4 className="capitalize">{mode} Bulk Order</h4>
      </DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-12 gap-4">
          {/* Product Selection Dropdown */}
          <FormControl 
            fullWidth 
            className="col-span-12" 
            error={!!errors.productId}
            disabled={loadingProducts}
          >
            <InputLabel>Select Product</InputLabel>
            <Select
              value={data.productId || ""}
              onChange={(e) => setData({ ...data, productId: e.target.value })}
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

          <TextField
            label="Quantity"
            fullWidth
            className="col-span-6"
            type="number"
            value={data.quantity || ""}
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
            onFocus={() => handleFieldFocus("quantity")}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
          
          <TextField
            label="UOM (Unit of Measure)"
            fullWidth
            className="col-span-6"
            value={data.uom || ""}
            onChange={(e) => setData({ ...data, uom: e.target.value })}
            onFocus={() => handleFieldFocus("uom")}
            error={!!errors.uom}
            helperText={errors.uom}
            placeholder="e.g., kg, tons, pieces"
          />
          
          <TextField
            label="City"
            fullWidth
            className="col-span-6"
            value={data.city || ""}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            onFocus={() => handleFieldFocus("city")}
            error={!!errors.city}
            helperText={errors.city}
          />
          
          <TextField
            label="Country"
            fullWidth
            className="col-span-6"
            value={data.country || ""}
            onChange={(e) => setData({ ...data, country: e.target.value })}
            onFocus={() => handleFieldFocus("country")}
            error={!!errors.country}
            helperText={errors.country}
          />
          
          <TextField
            label="Destination"
            fullWidth
            className="col-span-12"
            value={data.destination || ""}
            onChange={(e) => setData({ ...data, destination: e.target.value })}
            onFocus={() => handleFieldFocus("destination")}
            error={!!errors.destination}
            helperText={errors.destination}
            multiline
            rows={2}
          />
          
          <TextField
            label="Delivery Date"
            type="date"
            fullWidth
            className="col-span-6"
            InputLabelProps={{ shrink: true }}
            value={data.delivery_date || ""}
            onChange={(e) => setData({ ...data, delivery_date: e.target.value })}
            onFocus={() => handleFieldFocus("delivery_date")}
            error={!!errors.delivery_date}
            helperText={errors.delivery_date}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleSave} 
          color="primary" 
          variant="contained" 
          disabled={loader || loadingProducts}
        >
          {loader ? (
            <CircularProgress size={20} style={{ color: "#fff" }} />
          ) : (
            `${mode === "add" ? "Create" : "Update"} Order`
          )}
        </Button>
        <Button onClick={closeModal} color="error" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddEditBulkOrder.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default AddEditBulkOrder;