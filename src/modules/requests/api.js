import { setFinances, setQuotes, setSamples } from "../../slices/requestSlice";
import { setLoader } from "../../slices/sharedSlice";
import { globalGetService, globalPatchService } from "../../utils/globalApiServices";

export const getQuoteRequestApi = (query) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await globalGetService("/quote-request/list", query);
    if (response.data.success) {
      dispatch(setQuotes(response.data.data));
    }
    return response.data;
  } catch (error) {
    console.log("Error in getQuoteRequestApi", error);
  } finally {
    dispatch(setLoader(false));
  }
};


export const getSampleRequestApi = (query) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await globalGetService("/sample-request/list", query);
    if (response.data.success) {
      dispatch(setSamples(response.data.data));
    }
    return response.data;
  } catch (error) {
    console.log("Error in getSampleRequestApi", error);
    throw error; 
  } finally {
    dispatch(setLoader(false));
  }
};


export const getFinanceRequestApi = (query) => async (dispatch) => {
  dispatch(setLoader(true));
  // debugger
  try {
    const response = await globalGetService("/finance/list", query);
    if (response.data.success) {
      dispatch(setFinances(response.data.data));
    }
    return response.data;
  } catch (error) {
    console.log("Error in getFinanceRequestApi", error);
    throw error; 
  } finally {
    dispatch(setLoader(false));
  }
};

export const PatchFinanceApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/finance/status/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};