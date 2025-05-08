import {
  setAppearance,
  setBrands,
  setChemicalFamily,
  setGrade,
  setIncoterms,
  setPackagingType,
  setPaymentTerms,
  setPhysicalForm,
  setPolymerType,
  setSubstance,
} from "../slices/sharedSlice";
import {
  globalGetService,
  globalPostService,
} from "../utils/globalApiServices";

export const postFileUpload = async (data) => {
  try {
    const response = await globalPostService(`/file/upload`, data);
    return response;
  } catch (error) {
    console.error("Error uploading :", error);
    throw error;
  }
};

export const getBrandsApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/brand/list`);
    if (response.data.success) {
      dispatch(setBrands(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const getAppearancesApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/appearance/list`);
    if (response.data.success) {
      dispatch(setAppearance(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching appearances:", error);
    throw error;
  }
};

export const getSubstancesApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/substance/list`);
    if (response.data.success) {
      dispatch(setSubstance(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching substances:", error);
    throw error;
  }
};
export const getChemicalFamilyApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/chemical-family/list`);
    if (response.data.success) {
      dispatch(setChemicalFamily(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching Chemical Family:", error);
    throw error;
  }
};
export const getPolymerTypeApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/polymer-type/list`);
    if (response.data.success) {
      dispatch(setPolymerType(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching Polymer Type:", error);
    throw error;
  }
};
export const getPaymentTermsApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/payment-terms/list`);
    if (response.data.success) {
      dispatch(setPaymentTerms(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching payment terms:", error);
    throw error;
  }
};
export const getPackagingTypeApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/packaging-type/list`);
    if (response.data.success) {
      dispatch(setPackagingType(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching packaging type:", error);
    throw error;
  }
};

export const getphysicalFormApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/physical-form/list`);
    if (response.data.success) {
      dispatch(setPhysicalForm(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching physical form:", error);
    throw error;
  }
};

export const getGradesApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/grade/list`);
    if (response.data.success) {
      dispatch(setGrade(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching grades:", error);
    throw error;
  }
};

export const getIncotermsApi = () => async (dispatch) => {
  try {
    const response = await globalGetService(`/incoterm/list`);
    if (response.data.success) {
      dispatch(setIncoterms(response.data.data));
    }
    return response;
  } catch (error) {
    console.error("Error fetching incoterms:", error);
    throw error;
  }
};
