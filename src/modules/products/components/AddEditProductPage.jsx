import {
    Autocomplete,
    TextField,
    Button,
    CircularProgress,
    Box,
    IconButton,
  } from "@mui/material";
  import moment from "moment";
  import { useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
  import {
    setProductLoader,
  } from "../../../slices/productSlice";
  import { uomDropdown } from "../../../constants";
  import { createProductApi, getProductsDetailApi, updateProductApi } from "../api";
  import PropTypes from "prop-types";
  import { enqueueSnackbar } from "notistack";
  import { useNavigate } from "react-router-dom";
  import { useCountries } from "use-react-countries";
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
import MultipleFileUpload from "../../../shared/MultipleFileUpload";

  
  const AddEditProductPage = ({ getResponseBack }) => {
    const dispatch = useDispatch();
    const { countries } = useCountries();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [cloudinaryImage1, setCloudinaryImage1] = useState({});
    const [errors, setErrors] = useState({}); 
    
    const [productDetail, setProductDetail] = useState({
      additionalInfo: [{ title: "", description: "" }],
    });

    const [data, setData] = useState({ 
      productName: "",
      chemicalName : "",
      description: "" ,
      additionalInfo:  [{ title: "", description: "" }] ,
      tradeName : "",
      chemicalFamily : "",
      polymerType :"",
      industry: [] ,
      grade :[],
      manufacturingMethod :"",
      physicalForm :"",
      countryOfOrigin :"",
      color :"",
      productImages :[ ],
      density :null,
      mfi : null,
      tensileStrength :null,
      elongationAtBreak :null,
      shoreHardness :null,
      waterAbsorption :null,
      minimum_order_quantity :null,
      stock :null,
      uom :"",
      price :null,
      priceTerms :"fixed",
      incoterms :[],
      leadTime :"",
      paymentTerms :"",
      packagingType :[],
      packagingWeight :"",
      storageConditions :"",
      shelfLife :"",
      recyclable :false,
      bioDegradable :false,
      fdaApproved : false,
      medicalGrade :false,
      product_family :[],
      productImages :[],


      
      
      _id: id, 
    });
    
   

    const handleAddAdditionalInfo = () => {
      setProductDetail((prev) => ({
        ...prev,
        additionalInfo: [...prev.additionalInfo, { title: "", description: "" }],
      }));
    };
    
    const handleRemoveAdditionalInfo = (index) => {
      const updated = [...data.additionalInfo];
      updated.splice(index, 1);
      setData((prev) => ({ ...prev, additionalInfo: updated }));
    };
    
    const handleChangeAdditionalInfo = (index, field, value) => {
      const updated = [...data.additionalInfo];
      updated[index] = { ...updated[index], [field]: value };
      setData((prev) => ({ ...prev, additionalInfo: updated }));
    };
   

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
      industries,
      productFamilies,
      grade,
      incoterms,
      physicalForm,
      packagingType,
      paymentTerms,
      chemicalFamily,
      polymerType
    } = useSelector((state) => state.sharedState);
    const {  productLoader } = useSelector(
      (state) => state.productState
    );

    

    useEffect(() => {
      if (mode === "edit" || (id) && productDetail) {
        setData({

          //general product information 
          productName: productDetail.productName,
          chemicalName: productDetail.chemicalName,
          tradeName: productDetail.tradeName,
          description: productDetail.description,
          chemicalFamily: productDetail.chemicalFamily,
          product_family: productDetail.product_family,
          polymerType: productDetail.polymerType,
          industry: productDetail.industry,
          manufacturingMethod: productDetail.manufacturingMethod,
          physicalForm: productDetail.physicalForm,
          color: productDetail.color,
          productImages: productDetail.productImages,
          countryOfOrigin: productDetail.countryOfOrigin,
          additionalInfo: productDetail.additionalInfo,


          // techinical properties 
          density: productDetail.density,
          mfi: productDetail.mfi,
          tensileStrength: productDetail.tensileStrength,
          elongationAtBreak: productDetail.elongationAtBreak,
          shoreHardness: productDetail.shoreHardness,
          waterAbsorption: productDetail.waterAbsorption,
          grade: productDetail.grade,


          //trade information
          minimum_order_quantity: productDetail.minimum_order_quantity,
          stock: productDetail.stock,
          uom: productDetail.uom,
          price: productDetail.price,
          priceTerms: productDetail.priceTerms,
          leadTime: productDetail.leadTime,
          paymentTerms: productDetail.paymentTerms, 

          //packaging 
          packagingType: productDetail.packagingType,
          packagingWeight: productDetail.packagingWeight,
          storageConditions: productDetail.storageConditions,
          shelfLife :productDetail.shelfLife,

          // environmental
          recyclable: productDetail.recyclable,
          bioDegradable: productDetail.bioDegradable,
          fdaApproved: productDetail.fdaApproved,
          medicalGrade: productDetail.medicalGrade,
          incoterms: productDetail.incoterms,
          packagingType: productDetail.packagingType,
          
          _id: id,  

        });
      }
    }, [mode, productDetail]);
   
    const onFieldChange = (key, value) => {
        setData((prev) => ({
          ...prev,
          [key]: value,
        }));
      };

      
      
      const validate = () => {
        const newErrors = {};
        if (!data.productName)
          newErrors.productName = "Product Name is required";
        if (!data.chemicalName)
          newErrors.chemicalName = "Chemical  Name is required";
        if (!data.chemicalFamily)
          newErrors.chemicalFamily = "chemical Family is required";
        if (!data.polymerType)
          newErrors.polymerType = "polymer Type is required";
        if (!data.industry)
          newErrors.industry = "industry is required";
        if (!data.physicalForm)
          newErrors.physicalForm = "physical Form is required";
        if (!data.minimum_order_quantity)
          newErrors.minimum_order_quantity = "minimum order quantityis required";
        if (!data.stock)
          newErrors.stock = "stock is required";
        if (!data.uom)
          newErrors.uom = "uom is required";
        if (!data.price)
          newErrors.price = "price is required";
        if (!data.incoterms)
          newErrors.incoterms = "incoterms is required";
        if (!data.price)
          newErrors.price = "price is required";

        setErrors(newErrors);
        setTimeout(() => {
          setErrors({});
        }, 2000); 
        return Object.keys(newErrors).length === 0;
      };
      
  console.log(data?.packagingType ,"data?.chemicalFamily");
  
    const handleSave = () => {
      if (!validate()) return; 
      dispatch(setProductLoader(true));
      let payload = { ...data }; 
           

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
        (setData({ ...data, productImages: file }));
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
            value={data.productName || ""}
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
            value={data.chemicalName || ""}
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
            value={data.tradeName || ""}
            onChange={(e) => onFieldChange("tradeName", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
          />
  </div>
  <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" sx={{ my: 4 }}>
  {data.additionalInfo.map((info, index) => (
    <Box key={index} display="flex" alignItems="center" gap={1}>
      <TextField
        label={`Title ${index + 1}`}
        value={info.title}
        onChange={(e) => handleChangeAdditionalInfo(index, "title", e.target.value)}
      />
      <TextField
        label={`Description ${index + 1}`}
        value={info.description}
        onChange={(e) => handleChangeAdditionalInfo(index, "description", e.target.value)}
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
    <TextField
      {...params}
      label="Chemical Family"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
    />
  )}
  onChange={(_, value) => onFieldChange("chemicalFamily", value?._id)}
  value={chemicalFamily.find((item) => item._id === data?.chemicalFamily?._id) || null}
  error={!!errors.chemicalFamily}
  helperText={<div>{errors.chemicalFamily}</div>}
/>  

<Autocomplete
            options={productFamilies}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Product Family" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("product_family", value)}
            value={data?.product_family || []}
            disabled={productFamilies.length === 0}
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
  value={polymerType.find((item) => item._id === data?.polymerType?._id) || null}

/>
<Autocomplete
            options={industries}
            multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Industry" variant="outlined" InputLabelProps={{ shrink: true }} />
            )}
            onChange={(_, value) => onFieldChange("industry", value)}
            value={data?.industry || []}
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
            value={data.manufacturingMethod || ""}
            onChange={(e) => onFieldChange("manufacturingMethod", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
           <Autocomplete
  options={physicalForm}
  getOptionLabel={(option) => option.name}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Physical Form"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
    />
  )}
  onChange={(_, value) => onFieldChange("physicalForm", value?._id)}
  value={physicalForm.find((item) => item._id === data?.physicalForm?._id) || null}
  error={!!errors.physicalForm}
  helperText={<div>{errors.physicalForm}</div>}
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
  value={data.countryOfOrigin || ""}
/>

     <TextField
            label="Color "
            variant="outlined"
            fullWidth
            value={data.color || ""}
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
  value={data.density || ""}
  onChange={(e) => onFieldChange("density", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Melt Flow Index "
  type="number" 
  variant="outlined"
  fullWidth
  value={data.mfi || ""}
  onChange={(e) => onFieldChange("mfi", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Tesile  Strength "
  type="number" 
  variant="outlined"
  fullWidth
  value={data.tensileStrength || ""}
  onChange={(e) => onFieldChange("tensileStrength", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Elongation At Break%"
  type="number" 
  variant="outlined"
  fullWidth
  value={data.elongationAtBreak || ""}
  onChange={(e) => onFieldChange("elongationAtBreak", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Shore Hardness (if applicable)"
  type="number" 
  variant="outlined"
  fullWidth
  value={data.shoreHardness || ""}
  onChange={(e) => onFieldChange("shoreHardness", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>
          <TextField
  label="Water Absorbtion "
  type="number" 
  variant="outlined"
  fullWidth
  value={data.waterAbsorption || ""}
  onChange={(e) => onFieldChange("waterAbsorption", Number(e.target.value))}
  InputLabelProps={{ shrink: true }}
/>  
<Autocomplete
  options={grade || []}
  multiple
  getOptionLabel={(option) => option?.name || ""}
  value={data.grade || []}
  onChange={(_, value) => onFieldChange("grade", value)}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Grade"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
    />
  )}
  disabled={(grade || []).length === 0}
/>

  </div>
  <h1 className="text-xl  py-4">Trade Information</h1>
 
  <div className="grid grid-cols-3 gap-4">
  <TextField
  label="Minimum Order Quantity "
  type="number" 
  variant="outlined"
  fullWidth
  value={data.minimum_order_quantity || ""}
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
            value={data.stock || ""}
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
            value={uomDropdown.find((item) => item === data.uom) || null}
          />
           <TextField
            label="Price"
            type="number" 
            variant="outlined"
            fullWidth
            value={data.price || ""}
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
  value={data.priceTerms || "fixed"}
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
            value={data.incoterms || []}
            disabled={incoterms.length === 0}
            error={!!errors.incoterms}
            helperText={
              <div>{errors.incoterms}</div>
            }
          />
         <LocalizationProvider dateAdapter={AdapterMoment}>
  <DatePicker
    label="Lead Time"
    value={data.leadTime ? moment(data.leadTime) : null}
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
    <TextField
      {...params}
      label="Payment terms"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
    />
  )}
  onChange={(_, value) => onFieldChange("paymentTerms", value?._id)}
  value={data?.paymentTerms || ""}
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
            value={data?.packagingType || []}
            />

<TextField
            label="Packaging weight"
            variant="outlined"
            fullWidth
            value={data.packagingWeight || ""}
            onChange={(e) => onFieldChange("packagingWeight", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
<TextField
            label="Storage conditions"
            variant="outlined"
            fullWidth
            value={data.storageConditions || ""}
            onChange={(e) => onFieldChange("storageConditions", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
<TextField
            label="Shelf Life"
            variant="outlined"
            fullWidth
            value={data.shelfLife || ""}
            onChange={(e) => onFieldChange("shelfLife", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />

</div>


<h1 className="text-xl  py-4">Environmental</h1>

<div className="grid grid-cols-3 gap-4"> 
<FormControlLabel
        control={
          <Checkbox
            checked={data.recyclable || false}
            onChange={(e) => onFieldChange("recyclable", e.target.checked)}
          />
        }
        label="Recyclable"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={data.bioDegradable || false}
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
            checked={data.fdaApproved || false}
            onChange={(e) => onFieldChange("fdaApproved", e.target.checked)}
          />
        }
        label="FDA Approved"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={data.medicalGrade || false}
            onChange={(e) => onFieldChange("medicalGrade", e.target.checked)}
          />
        }
        label="Medical Grade"
      />
</div>
        <div className="grid grid-cols-3 gap-4">
         
        
         
           <div className="mt-2">
  

          </div>
          
          
          <h1 className="text-xl  py-4 col-span-3">Product Images</h1>
          
                   <MultipleFileUpload onFileUpload={handleImageUpload} existingFiles={productDetail.productImages ? [data.productImages] : []}/>

         
      

        </div>
  
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outlined" 
        onClick={() => {
            // dispatch(setProductCrud({})); 
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
  