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
import {
  createBulkOrderApi,
  updateBulkOrderApi,
  getAdminProductsApi,
} from "../api";

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
    if (!data.delivery_date)
      newErrors.delivery_date = "Delivery Date is required";

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
        product: data.productId,
        quantity: Number(data.quantity),
      };
      delete payload.productId;

      const apiCall = mode === "add" ? createBulkOrderApi : updateBulkOrderApi;
      const res = await apiCall(payload);

      if (res?.success) {
        enqueueSnackbar(
          res.message ||
            `Bulk order ${mode === "add" ? "created" : "updated"} successfully`,
          {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          }
        );
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

  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open]);

  useEffect(() => {
    if (
      open &&
      mode === "edit" &&
      bulkOrderCrud &&
      Object.keys(bulkOrderCrud).length > 0
    ) {
      setData({
        ...bulkOrderCrud,
        productId: bulkOrderCrud.product?._id || bulkOrderCrud.productId || "",
        delivery_date: bulkOrderCrud.delivery_date
          ? new Date(bulkOrderCrud.delivery_date).toISOString().split("T")[0] // Format to yyyy-MM-dd
          : "",
      });
    } else if (open && mode === "add") {
      setData({});
    }
  }, [open, mode, bulkOrderCrud]);

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle className="bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            {mode === "add" ? "Create" : "Edit"} Bulk Order
          </span>
        </div>
      </DialogTitle>
      <DialogContent dividers className="bg-gray-50">
        <div className=" rounded-xl shadow-sm   ">
          <div className="">
            {/* Product Section */}
            <div>
              <h3 className="text-base font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Product Information
              </h3>
              <div className="space-y-4">
                <FormControl
                  fullWidth
                  error={!!errors.productId}
                  disabled={loadingProducts}
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

                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Quantity"
                    fullWidth
                    type="number"
                    value={data.quantity || ""}
                    onChange={(e) =>
                      setData({ ...data, quantity: e.target.value })
                    }
                    onFocus={() => handleFieldFocus("quantity")}
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                  />

                  <FormControl fullWidth error={!!errors.uom}>
                    <InputLabel>UOM (Unit of Measure)</InputLabel>
                    <Select
                      value={data.uom || ""}
                      label="UOM (Unit of Measure)"
                      onChange={(e) =>
                        setData({ ...data, uom: e.target.value })
                      }
                      onFocus={() => handleFieldFocus("uom")}
                    >
                      {[
                        "Kilogram",
                        "Gram",
                        "Milligram",
                        "Metric Ton",
                        "Pound",
                        "Ounce",
                        "Liter",
                        "Milliliter",
                        "Cubic Meter",
                        "Cubic Centimeter",
                        "Gallon",
                        "Quart",
                        "Pint",
                      ].map((unit) => (
                        <MenuItem key={unit} value={unit}>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.uom && (
                      <FormHelperText>{errors.uom}</FormHelperText>
                    )}
                  </FormControl>
                </div>
              </div>
            </div>

            {/* Shipping Section */}
            <div>
              <h3 className="text-base font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Shipping Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="City"
                  fullWidth
                  value={data.city || ""}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  onFocus={() => handleFieldFocus("city")}
                  error={!!errors.city}
                  helperText={errors.city}
                />

                <TextField
                  label="Country"
                  fullWidth
                  value={data.country || ""}
                  onChange={(e) =>
                    setData({ ...data, country: e.target.value })
                  }
                  onFocus={() => handleFieldFocus("country")}
                  error={!!errors.country}
                  helperText={errors.country}
                />
              </div>

              <div className="mt-4">
                <TextField
                  label="Destination"
                  fullWidth
                  value={data.destination || ""}
                  onChange={(e) =>
                    setData({ ...data, destination: e.target.value })
                  }
                  onFocus={() => handleFieldFocus("destination")}
                  error={!!errors.destination}
                  helperText={errors.destination}
                  multiline
                  rows={3}
                />
              </div>

              <div className="mt-4 max-w-xs">
                <TextField
                  label="Delivery Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={data.delivery_date || ""}
                  onChange={(e) =>
                    setData({ ...data, delivery_date: e.target.value })
                  }
                  onFocus={() => handleFieldFocus("delivery_date")}
                  error={!!errors.delivery_date}
                  helperText={errors.delivery_date}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="bg-gray-50 px-6 py-4">
        <div className="flex gap-3 w-full justify-end">
          <Button
            onClick={closeModal}
            color="inherit"
            variant="outlined"
            className="px-6 py-2 text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={loader || loadingProducts}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-md"
          >
            {loader ? (
              <div className="flex items-center gap-2">
                <CircularProgress size={16} style={{ color: "#fff" }} />
                <span>Saving...</span>
              </div>
            ) : (
              `${mode === "add" ? "Create" : "Update"} Order`
            )}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

AddEditBulkOrder.propTypes = {
  getResponseBack: PropTypes.func.isRequired,
};

export default AddEditBulkOrder;
