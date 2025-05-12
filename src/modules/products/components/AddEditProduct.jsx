import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductCrud,
  setProductLoader,
  setProductModal,
} from "../../../slices/productSlice";
import DialogActionButtons from "../../../shared/DialogActionButtons";
import ImageUpload from "../../../shared/ImageUpload";
import { uomDropdown } from "../../../constants";
import { createProductApi, updateProductApi } from "../api";
import PropTypes from "prop-types";
import { enqueueSnackbar } from "notistack";

const AddEditProduct = ({ getResponseBack }) => {
  const dispatch = useDispatch();
  const {
    mode,
    brands,
    industries,
    productFamilies,
    appearance,
    substance,
    grade,
    incoterms,
  } = useSelector((state) => state.sharedState);
  const { productCrud, productModal, productLoader } = useSelector(
    (state) => state.productState
  );

  const closeModal = () => {
    dispatch(setProductModal(false));
    // dispatch(setProductCrud({}));
  };

  const onFieldChange = (key, value) => {
    dispatch(setProductCrud({ ...productCrud, [key]: value }));
  };

  const handleSave = () => {
    dispatch(setProductLoader(true));
    let payload = Object.assign({}, productCrud);
    const transformArray = (items) =>
      items ? items.map((item) => item._id) : [];

    const productFamily = transformArray(payload.product_family);
    console.log(productFamily, "productFamily");
    payload = {
      ...payload,
      brand: payload.brand ? payload.brand._id : null,
      industry: transformArray(payload.industry),
      appearance: transformArray(payload.appearance),
      substance: transformArray(payload.substance),
      grade: transformArray(payload.grade),
      incoterms: transformArray(payload.incoterms),
      product_family: transformArray(payload.product_family),
      chemicalFamily: payload?.chemicalFamily?._id,
    };
    if (mode === "add") {
      createProductApi(payload)
        .then((response) => {
          if (response.success) {
            enqueueSnackbar(response.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
            getResponseBack();
            closeModal();
          } else {
            enqueueSnackbar(response.message, {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
          }
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        })
        .finally(() => {
          dispatch(setProductLoader(false));
        });
    } else {
      updateProductApi(payload)
        .then((response) => {
          if (response.success) {
            enqueueSnackbar(response.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
            getResponseBack();
            closeModal();
          }
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        })
        .finally(() => {
          dispatch(setProductLoader(false));
        });
    }
  };
  return (
    <Dialog open={productModal} onClose={closeModal} fullWidth maxWidth="lg">
      <DialogTitle>
        <h4 className="capitalize">{mode} Product</h4>
      </DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-3 gap-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={productCrud.name || ""}
            onChange={(e) => onFieldChange("name", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
          <Autocomplete
            options={brands}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Brand"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={(_, value) => onFieldChange("brand", value)}
            value={productCrud?.brand}
            disabled={brands.length === 0}
          />
          <Autocomplete
            options={industries}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Industry"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={(_, value) => onFieldChange("industry", value)}
            value={productCrud?.industry}
            disabled={industries.length === 0}
          />
          <Autocomplete
            options={appearance}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Appearance"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={(_, value) => onFieldChange("appearance", value)}
            value={productCrud.appearance}
            disabled={appearance.length === 0}
          />
          <Autocomplete
            options={substance}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Substance"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={(_, value) => onFieldChange("substance", value)}
            value={productCrud?.substance}
            disabled={substance.length === 0}
          />
          <Autocomplete
            options={grade}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Grade"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={(_, value) => onFieldChange("grade", value)}
            value={productCrud.grade}
            disabled={grade.length === 0}
          />
          <Autocomplete
            options={incoterms}
            multiple
            getOptionLabel={(option) => `${option.name}-${option.fullForm}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Incoterms"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={(_, value) => onFieldChange("incoterms", value)}
            value={productCrud.incoterms}
            disabled={incoterms.length === 0}
          />
          <Autocomplete
            options={productFamilies}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product Family"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={(_, value) => onFieldChange("product_family", value)}
            value={productCrud?.product_family}
            disabled={productFamilies.length === 0}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={productCrud.price || ""}
            onChange={(e) => onFieldChange("price", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Autocomplete
            options={uomDropdown}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Unit of Measurement"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={(_, value) => onFieldChange("uom", value)}
            value={uomDropdown.find((item) => item === productCrud.uom) || null}
            disabled={uomDropdown.length === 0}
          />
          <TextField
            label="Stock"
            variant="outlined"
            fullWidth
            value={productCrud.stock || ""}
            onChange={(e) => onFieldChange("stock", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Minimum Order Quantity"
            variant="outlined"
            fullWidth
            value={productCrud.minimum_order_quantity || ""}
            onChange={(e) =>
              onFieldChange("minimum_order_quantity", e.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            className="col-span-3"
            value={productCrud.description || ""}
            onChange={(e) => onFieldChange("description", e.target.value)}
            multiline
            rows={4}
            InputLabelProps={{ shrink: true }}
          />
          <ImageUpload
            label="Image"
            value={productCrud.image || ""}
            onChange={(value) => onFieldChange("image", value)}
            onRemove={() => onFieldChange("image", "")}
            onFileUpload={(imageUrl, id) => {
              dispatch(setProductCrud({ ...productCrud, image: imageUrl, id }));
            }}
            preview={productCrud?.image}
            onImageClick={() => {
              dispatch(setProductCrud({ ...productCrud, image: null }));
            }}
            width="100%"
            height="150px"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <DialogActionButtons
          closeModal={closeModal}
          mode={mode}
          handleSave={handleSave}
          loader={productLoader}
        />
      </DialogActions>
    </Dialog>
  );
};

AddEditProduct.propTypes = {
  getResponseBack: PropTypes.func,
};

export default AddEditProduct;
