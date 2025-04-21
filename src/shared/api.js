import { setAppearance, setBrands, setSubstance } from "../slices/sharedSlice";
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
