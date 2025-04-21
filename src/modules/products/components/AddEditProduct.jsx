import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductCrud, setProductModal } from "../../../slices/productSlice";
import DialogActionButtons from "../../../shared/DialogActionButtons";
import ImageUpload from "../../../shared/ImageUpload";
import { getAppearancesApi, getBrandsApi } from "../../../shared/api";
import { getIndustriesApi } from "../../industries/api";
import { getProductFamiliesApi } from "../../productFamilies/api";

const AddEditProduct = () => {
  const dispatch = useDispatch();
  const { mode, brands, industries, productFamilies, appearance } = useSelector(
    (state) => state.sharedState
  );
  const { productCrud, productModal, productLoader } = useSelector(
    (state) => state.productState
  );
  const [data, setData] = useState(productCrud);
  const fetchDropdowns = useCallback(() => {
    dispatch(getBrandsApi());
    dispatch(getIndustriesApi());
    dispatch(getProductFamiliesApi());
    dispatch(getAppearancesApi());
  }, [dispatch]);

  useEffect(() => {
    setData(productCrud);
  }, [productCrud]);
  useEffect(() => {
    fetchDropdowns();
  }, [fetchDropdowns]);

  const closeModal = () => {
    dispatch(setProductModal(false));
    dispatch(setProductCrud({}));
  };

  const onFieldChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  console.log("data", appearance);
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
            value={data.name || ""}
            onChange={(e) => onFieldChange("name", e.target.value)}
            required
          />
          <Autocomplete
            options={brands}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Brand" variant="outlined" />
            )}
            onChange={(event, value) => onFieldChange("category", value)}
            value={data.category}
          />
          <Autocomplete
            options={industries}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Industry" variant="outlined" />
            )}
            onChange={(event, value) => onFieldChange("industry", value)}
            value={data.industry}
          />
          <Autocomplete
            options={appearance}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Apperance" variant="outlined" />
            )}
            onChange={(event, value) => onFieldChange("appearance", value)}
            value={data.appearance}
          />
          <Autocomplete
            options={[]}
            multiple
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Substance" variant="outlined" />
            )}
            onChange={(event, value) => onFieldChange("substance", value)}
            value={data.substance}
          />
          <Autocomplete
            options={[]}
            multiple
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Grade" variant="outlined" />
            )}
            onChange={(event, value) => onFieldChange("grade", value)}
            value={data.grade}
          />
          <Autocomplete
            options={[]}
            multiple
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Incoterms" variant="outlined" />
            )}
            onChange={(event, value) => onFieldChange("incoterms", value)}
            value={data.incoterms}
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
              />
            )}
            onChange={(_, value) => onFieldChange("product_family", value)}
            value={data.product_family}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={data.price || ""}
            onChange={(e) => onFieldChange("price", e.target.value)}
            // required
          />
          <Autocomplete
            options={[]}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Unit of Measurement"
                variant="outlined"
              />
            )}
            onChange={(_, value) => onFieldChange("uom", value)}
            value={data.uom}
          />
          <TextField
            label="Stock"
            variant="outlined"
            fullWidth
            value={data.stock || ""}
            onChange={(e) => onFieldChange("stock", e.target.value)}
            // required
          />

          <TextField
            label="Minimum Order Quantity"
            variant="outlined"
            fullWidth
            value={data.minimum_order_quantity || ""}
            onChange={(e) =>
              onFieldChange("minimum_order_quantity", e.target.value)
            }
            // required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            className="col-span-3"
            value={data.description || ""}
            onChange={(e) => onFieldChange("description", e.target.value)}
            multiline
            rows={4}
            // required
          />
          <ImageUpload
            label="Image"
            value={data.image || ""}
            onChange={(value) => onFieldChange("image", value)}
            onRemove={() => onFieldChange("image", "")}
            onFileUpload={(imageUrl, id) => {
              setData({ ...data, image: imageUrl, id });
            }}
            preview={data.image}
            onImageClick={() => {
              setData({ ...data, image: null });
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
          handleSave={() => {
            // Handle save logic here
          }}
          loader={productLoader} // Replace with actual loading state if needed
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddEditProduct;
