import { setChemicalFamily, setGrade, setIncoterms, setIndustries, setLoader, setPackagingType, setPaymentTerms, setPhysicalForm, setPolymerType, setProductFamilies } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getProductsApi = async (query) => {
  try {
    let response = await globalPostService("/product/list", query);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getProductsDetailApi = async (id, query = {}) => {
  try {
    let response = await globalGetService(`/product/detail/${id}`, query);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createProductApi = async (data) => {
  try {
    let response = await globalPostService("/product/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProductApi = async (data) => {
  try {
    
    let response = await globalPutService(`/product/edit/${data._id}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductApi = async (id) => {
  try {
    let response = await globalDeleteService(`/product/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProductFiltersApi = async (filters = {}) => {
  try {
    const response = await globalPostService('/product/filter', filters);
    return response.data;
  } catch (error) {
    console.error('Error fetching product filters:', error);
    throw error;
  }
};

//Drop down api without pagination

export const listChemicalFamily = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    let response = await globalGetService("/chemical-family/list");
    if (response.data.success) {
      dispatch(setChemicalFamily(response.data.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};


export const listPolymerType = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    let response = await globalGetService("/polymer-type/list", );
    if (response.data.success) {
      dispatch(setPolymerType(response.data.data));
    
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const listIndustries = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    const response = await globalGetService("/industry/list");
    if (response.data.success) {
      dispatch(setIndustries(response.data.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};


export const listPhysicalForm = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    let response = await globalGetService("/physical-form/list");
    if (response.data.success) {
      dispatch(setPhysicalForm(response.data.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};


export const listProductFamilies = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    
    let response = await globalGetService("/product-family/list");

    if (response.data.success) {
      dispatch(setProductFamilies(response.data.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};


export const listGrade = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    let response = await globalGetService("/grade/list");
    if (response.data.success) {
      dispatch(setGrade(response.data.data));
     
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const listIncoterms = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    let response = await globalGetService("/incoterm/list");
    if (response.data.success) {
      dispatch(setIncoterms(response.data.data));
     
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const listPaymentTerms = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    let response = await globalGetService("/payment-terms/list");
    if (response.data.success) {
      dispatch(setPaymentTerms(response.data.data));
      
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const listPackagingType= () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    let response = await globalGetService("/packaging-type/list");
    if (response.data.success) {
      dispatch(setPackagingType(response.data.data));
     
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};