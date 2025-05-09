import { setQuotes, setSamples } from "../../slices/requestSlice";
import { setLoader } from "../../slices/sharedSlice";
import { globalGetService } from "../../utils/globalApiServices";

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
