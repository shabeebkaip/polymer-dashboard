import {
    Autocomplete,
    TextField,
    Button,
    CircularProgress,
    MenuItem,
    Box,
    Stack,
    IconButton,
  } from "@mui/material";
  import { useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
  import {
    setProductCrud,
    setProductLoader,
  } from "../../../slices/productSlice";
  import { uomDropdown } from "../../../constants";
  import { createProductApi, getProductsDetailApi, updateProductApi } from "../api";
  import PropTypes from "prop-types";
  import { enqueueSnackbar } from "notistack";
  import { useNavigate } from "react-router-dom";
  import { useCountries } from "use-react-countries";
import MultiImageUpload from "../../../shared/MultiImageUpload";
import { useCallback, useEffect, useState } from "react";
import {
    getAppearancesApi,
    getBrandsApi,
    getChemicalFamilyApi,
    getGradesApi,
    getIncotermsApi,
    getPackagingTypeApi,
    getPaymentTermsApi,
    getphysicalFormApi,
    getPolymerTypeApi,
    getSubstancesApi,
  } from "../../../shared/api";
import { getIndustriesApi } from "../../industries/api";
import { getProductFamiliesApi } from "../../productFamilies/api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import FileUpload from "../../../shared/sharedComponents/file-uploads/FileUpload";
import { setPageTitle } from "../../../slices/sharedSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

  
  const AddEditProductPage = ({ getResponseBack }) => {
    const dispatch = useDispatch();
    const { countries } = useCountries();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [cloudinaryImage1, setCloudinaryImage1] = useState({});
    const [errors, setErrors] = useState({}); 
      
    const [productDetail, setProductDetail] = useState({
    
      additionalInfo: [""], 
    });
  


    const handleAddAdditionalInfo = () => {
      setProductDetail((prev) => ({
        ...prev,
        additionalInfo: [...prev.additionalInfo, ""],
      }));
    };
  
    const handleRemoveAdditionalInfo = (index) => {
      const updated = [...productDetail.additionalInfo];
      updated.splice(index, 1);
      setProductDetail((prev) => ({ ...prev, additionalInfo: updated }));
    };
  
    const handleChangeAdditionalInfo = (index, value) => {
      const updated = [...productDetail.additionalInfo];
      updated[index] = value;
      setProductDetail((prev) => ({ ...prev, additionalInfo: updated }));
    };
console.log(productDetail , "setProductDetail");

  const fetchDropdowns = useCallback(() => {
    dispatch(getBrandsApi());
    dispatch(getIndustriesApi());
    dispatch(getProductFamiliesApi());
    dispatch(getAppearancesApi());
    dispatch(getSubstancesApi());
    dispatch(getGradesApi());
    dispatch(getIncotermsApi());
    dispatch(getphysicalFormApi());
    dispatch(getPaymentTermsApi());
    dispatch(getChemicalFamilyApi());
    dispatch(getPackagingTypeApi());
    dispatch(getPolymerTypeApi());
  }, [dispatch]);

  useEffect(() => {
    fetchDropdowns();
    dispatch(setPageTitle(mode === "edit" ? "Edit Product" : "Add Product"));
  }, [fetchDropdowns]);

useEffect(() => {
    if (!id) return;
  
    getProductsDetailApi(id).then((detail) => {
      console.log("Product Detail:", detail);
      setProductDetail(detail.data); 
    });
  }, [id]);
      
        
    
    const {
      mode,
      brands,
      industries,
      productFamilies,
    //   appearance,
    //   substance,
      grade,
      incoterms,
      physicalForm,
      packagingType,
      paymentTerms,
      chemicalFamily,
      polymerType
    } = useSelector((state) => state.sharedState);
    const { productCrud, productLoader } = useSelector(
      (state) => state.productState
    );
  
    const onFieldChange = (key, value) => {
        setProductDetail((prev) => ({
          ...prev,
          [key]: value,
        }));
      };

      
      
      const validate = () => {
        const newErrors = {};
        if (!productDetail.productName)
          newErrors.productName = "Product Name is required";
        if (!productDetail.chemicalName)
          newErrors.chemicalName = "Chemical  Name is required";
        if (!productDetail.chemicalFamily)
          newErrors.chemicalFamily = "chemical Familyis required";
        if (!productDetail.polymerType)
          newErrors.polymerType = "polymer Type is required";
        if (!productDetail.industry)
          newErrors.industry = "industry is required";
        if (!productDetail.physicalForm)
          newErrors.physicalForm = "physical Form is required";
        if (!productDetail.minimum_order_quantity)
          newErrors.minimum_order_quantity = "minimum order quantityis required";
        if (!productDetail.stock)
          newErrors.stock = "stock is required";
        if (!productDetail.uom)
          newErrors.uom = "uom is required";
        if (!productDetail.price)
          newErrors.price = "price is required";
        if (!productDetail.incoterms)
          newErrors.incoterms = "incoterms is required";
        if (!productDetail.price)
          newErrors.price = "price is required";

        setErrors(newErrors);
        setTimeout(() => {
          setErrors({});
        }, 2000); 
        return Object.keys(newErrors).length === 0;
      };
      
  
    const handleSave = () => {
      if (!validate()) return; 
      dispatch(setProductLoader(true));
      let payload = { ...productDetail }; 
            const transformArray = (items) =>
        items ? items.map((item) => item._id) : [];
      payload = {
        ...payload,
        // brand: payload.brand ? payload.brand._id : null,
        // industry: transformArray(payload.industry),
        // appearance: transformArray(payload.appearance),
        // substance: transformArray(payload.substance),
        // grade: transformArray(payload.grade),
        // incoterms: transformArray(payload.incoterms),
        // product_family: transformArray(payload.product_family),
        // physicalForm: transformArray(payload.physicalForm),
        // polymerType: transformArray(payload.polymerType),
      }; 

      console.log("Final Payload:", payload);
      const apiCall = mode === "add" ? createProductApi : updateProductApi;
  
      apiCall(payload)
        .then((response) => {
          if (response.success) {
            enqueueSnackbar(response.message, {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
            if (getResponseBack) getResponseBack();
            navigate(-1); 
          } else {
            enqueueSnackbar(response.message, {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        })
        .finally(() => {
          dispatch(setProductLoader(false));
        });
    };

    const handleImageUpload = (file) => {
        (setProductDetail({ ...productDetail, productImages: file }));
      };
      
    
      const handleImageClear = () => {
        deleteImage(cloudinaryImage1);
        setProductDetail((prevData) => ({
          ...prevData,
          productImages: null,
        }));
        setCloudinaryImage1({});
      };
    
  
    return (
<div className="container mx-auto p-6 h-[calc(100dvh-140px)] overflow-y-auto">

<h1 className="text-xl  py-4">General Product Information</h1>
<div className="grid grid-cols-3 gap-4"> 
<TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={productDetail.productName || ""}
            onChange={(e) => onFieldChange("productName", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.productName}
            helperText={
              <div>{errors.productName}</div>
            }
          />
          
          <TextField
            label="Chemical Name "
            variant="outlined"
            fullWidth
            value={productDetail.chemicalName || ""}
            onChange={(e) => onFieldChange("chemicalName", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.chemicalName}
            helperText={
              <div>{errors.chemicalName}</div>
            }
          />
          <TextField
            label="Trade Name "
            variant="outlined"
            fullWidth
            value={productDetail.tradeName || ""}
            onChange={(e) => onFieldChange("tradeName", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />   
         
           <TextField
            label="Description"
            variant="outlined"
            fullWidth
            className="col-span-3"
            value={productDetail.description || ""}
            onChange={(e) => onFieldChange("description", e.target.value)}
            multiline
            rows={4}
            InputLabelProps={{ shrink: true }}
          />
  </div>
  <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" sx={{ my: 4 }}>
      {productDetail.additionalInfo.map((info, index) => (
  <Box key={index} display="flex" alignItems="center" gap={1}>
    <TextField
      label={`AdditionalInfo ${index + 1}`}
      value={info}
      onChange={(e) => handleChangeAdditionalInfo(index, e.target.value)}
    />
    <IconButton
      onClick={() => handleRemoveAdditionalInfo(index)}
      color="error"
      disabled={productDetail.additionalInfo.length === 1}
    >
      <RemoveIcon />
    </IconButton>
  </Box>
))}

      <IconButton onClick={handleAddAdditionalInfo} color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  <h1 className="text-xl  py-4">Product Details</h1>

<div className="grid grid-cols-3 gap-4"> 
         <Autocomplete
  options={chemicalFamily}
  getOptionLabel={(option) => option.name}
  renderInput={(params) => (
    <TextField {...params} label="Chemical Family" variant="outlined" InputLabelProps={{ shrink: true }} />
  )}
  onChange={(_, value) => onFieldChange("chemicalFamily", value?._id)} 
  value={productDetail?.chemicalFamily}
  error={!!errors.chemicalFamily}
            helperText={
              <div>{errors.chemicalFamily}</div>
            }
/>

<Autocomplete
  options={polymerType}
  getOptionLabel={(option) => option.name || ""}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Polymer Type"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      error={!!errors.polymerType}
            helperText={
              <div>{errors.polymerType}</div>
            }
    />

  )}
  onChange={(_, value) => onFieldChange("polymerType", value)}
  value={productDetail?.polymerType || null}
/>
<Autocomplete
            options={industries}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Industry" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("industry", value)}
            value={productDetail?.industry}
            disabled={industries.length === 0}
            error={!!errors.industry}
            helperText={
              <div>{errors.industry}</div>
            }
          />
           <TextField
            label="Manufacturing Method"
            variant="outlined"
            fullWidth
            value={productDetail.manufacturingMethod || ""}
            onChange={(e) => onFieldChange("manufacturingMethod", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
           <Autocomplete
            options={physicalForm}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Physical Form" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("physicalForm", value)}
            value={productDetail?.physicalForm}
            error={!!errors.physicalForm}
            helperText={
              <div>{errors.physicalForm}</div>
            }
          />
          <Autocomplete
  options={countries.map((country) => country.name)} 
  renderInput={(params) => (
    <TextField {...params} label="Country Of Origin" variant="outlined" required />
  )}
  onChange={(event, newValue) => {
    console.log('Selected country:', newValue); 
    onFieldChange("countryOfOrigin", newValue);
  }}
  value={productDetail.countryOfOrigin || ""}
/>

     <TextField
            label="Color "
            variant="outlined"
            fullWidth
            value={productDetail.color || ""}
            onChange={(e) => onFieldChange("color", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
  </div>

  <h1 className="text-xl  py-4">Technical Properties</h1>

  <div className="grid grid-cols-3 gap-4">
  <TextField
  label="Density g/cm2"
  type="number" 
  variant="outlined"
  fullWidth
  value={productDetail.density || ""}
  onChange={(e) => onFieldChange("density", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Melt Flow Index "
  type="number" 
  variant="outlined"
  fullWidth
  value={productDetail.mfi || ""}
  onChange={(e) => onFieldChange("mfi", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Tesile  Strength "
  type="number" 
  variant="outlined"
  fullWidth
  value={productDetail.tensileStrength || ""}
  onChange={(e) => onFieldChange("tensileStrength", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Elongation At Break%"
  type="number" 
  variant="outlined"
  fullWidth
  value={productDetail.elongationAtBreak || ""}
  onChange={(e) => onFieldChange("elongationAtBreak", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Shore Hardness (if applicable)"
  type="number" 
  variant="outlined"
  fullWidth
  value={productDetail.shoreHardness || ""}
  onChange={(e) => onFieldChange("shoreHardness", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Water Absorbtion "
  type="number" 
  variant="outlined"
  fullWidth
  value={productDetail.waterAbsorption || ""}
  onChange={(e) => onFieldChange("waterAbsorption", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>  
  </div>
  <h1 className="text-xl  py-4">Trade Information</h1>
 
  <div className="grid grid-cols-3 gap-4">
  <TextField
  label="Minimum Order Quantity "
  type="number" 
  variant="outlined"
  fullWidth
  value={productDetail.minimum_order_quantity || ""}
  onChange={(e) => onFieldChange("minimum_order_quantity", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
  error={!!errors.minimum_order_quantity}
            helperText={
              <div>{errors.minimum_order_quantity}</div>
            }
/>  
<TextField
            label="Stock Available "
            type='number'
            variant="outlined"
            fullWidth
            value={productDetail.stock || ""}
            onChange={(e) => onFieldChange("stock", e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={!!errors.stock}
            helperText={
              <div>{errors.stock}</div>
            }
          />
           <Autocomplete
            options={uomDropdown}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField {...params} label="Unit of Measurement" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("uom", value)}
            value={uomDropdown.find((item) => item === productDetail.uom) || null}
          />
           <TextField
            label="Price"
            type="number" 
            variant="outlined"
            fullWidth
            value={productDetail.price || ""}
            onChange={(e) => onFieldChange("price", e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={!!errors.price}
            helperText={
              <div>{errors.price}</div>
            }
          />
         <Autocomplete
  options={["fixed", "negotiable"]}
  renderInput={(params) => (
    <TextField {...params} label="Price Terms" variant="outlined" required />
  )}
  value={productDetail.priceTerms || "fixed"}
  onChange={(e, newValue) => onFieldChange("priceTerms", newValue)}
/>
<Autocomplete
            options={incoterms}
            multiple
            getOptionLabel={(option) => `${option.name}-${option.fullForm}`}
            renderInput={(params) => (
              <TextField {...params} label="Incoterms" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("incoterms", value)}
            value={productDetail.incoterms}
            disabled={incoterms.length === 0}
            error={!!errors.incoterms}
            helperText={
              <div>{errors.incoterms}</div>
            }
          />
           <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="Lead Time"
        value={productDetail.leadTime || null}
        onChange={(newValue) => onFieldChange("leadTime", newValue)}
        renderInput={(params) => (
          <TextField {...params} fullWidth InputLabelProps={{ shrink: true }} />
        )}
      />
    </LocalizationProvider>

    <Autocomplete
            options={paymentTerms}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Payment terms" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("packagingType", value)}
            value={productDetail?.paymentTerms}
          />
         
  </div>

  <h1 className="text-xl  py-4">Packaging</h1>
  <div className="grid grid-cols-3 gap-4">
  <Autocomplete
            options={packagingType}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Packaging Type" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("packagingType", value)}
            value={productDetail?.packagingType}
          />

</div>


<h1 className="text-xl  py-4">Environmental</h1>

<div className="grid grid-cols-3 gap-4"> 
<FormControlLabel
        control={
          <Checkbox
            checked={productDetail.recyclable || false}
            onChange={(e) => onFieldChange("recyclable", e.target.checked)}
          />
        }
        label="Recyclable"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={productDetail.bioDegradable || false}
            onChange={(e) => onFieldChange("bioDegradable", e.target.checked)}
          />
        }
        label="Bio Degradable"
      />  
</div>
<h1 className="text-xl  py-4">Certifications</h1>

<div className="grid grid-cols-3 gap-4">   
<FormControlLabel
        control={
          <Checkbox
            checked={productDetail.fdaApproved || false}
            onChange={(e) => onFieldChange("fdaApproved", e.target.checked)}
          />
        }
        label="FDA Approved"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={productDetail.medicalGrade || false}
            onChange={(e) => onFieldChange("medicalGrade", e.target.checked)}
          />
        }
        label="Medical Grade"
      />
</div>
        <div className="grid grid-cols-3 gap-4">
          <Autocomplete
            options={grade}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Grade" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("grade", value)}
            value={productDetail.grade}
            disabled={grade.length === 0}
          />
        
          <Autocomplete
            options={productFamilies}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Product Family" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("product_family", value)}
            value={productDetail?.product_family}
            disabled={productFamilies.length === 0}
          />
           <div className="mt-2">
           <FileUpload
  key="productImages"
  onFileUpload={handleImageUpload}
  onClear={handleImageClear}
  existingFiles={productDetail.productImages ? [productDetail.productImages] : []}
  multiple={false}
/>  

          </div>
          
          
      
         
        {/* <MultiImageUpload
  label="Images"
  multiple 
  value={productDetail.productImages || []}
  onChange={(value) => onFieldChange("productImages", value)} 
  onRemove={(indexToRemove) => {
    const updated = productDetail.productImages.filter((_, i) => i !== indexToRemove);
    onFieldChange("productImages", updated);
  }}
  onFileUpload={(imageUrl) => {
    const updated = [...(productDetail.productImages || []), imageUrl];
    dispatch(setProductCrud({ ...productDetail, productImages: updated }));
  }}
  preview={productDetail.productImages}
  onImageClick={(indexToRemove) => {
    const updated = productDetail.productImages.filter((_, i) => i !== indexToRemove);
    dispatch(setProductCrud({ ...productDetail, productImages: updated }));
  }}
  width="100%"
  height="150px"
/> */}

        </div>
  
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outlined" 
        onClick={() => {
            dispatch(setProductCrud({})); 
            navigate(-1);                
          }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={productLoader}
          >
            {productLoader ? <CircularProgress size={20} /> : "Save"}
          </Button>
        </div>
      </div>
    );
  };
  
  AddEditProductPage.propTypes = {
    getResponseBack: PropTypes.func,
  };
  
  export default AddEditProductPage;
  