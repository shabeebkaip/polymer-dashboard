import { setFinances, setQuotes, setSamples, setBulkOrders, setBestDeals } from "../../slices/requestSlice";
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


export const getBulkOrderApi = (query) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await globalGetService("/bulk-order/admin-list", query);
    if (response.data.success) {
      dispatch(setBulkOrders(response.data.data)); 
    }
    return response.data;
  } catch (error) {
    console.log("Error in getBulkOrderApi", error);
    return { success: false, error: error.message };
  } finally {
    dispatch(setLoader(false));
  }
};

export const getBestDealApi = (query) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await globalGetService("/best-deal/admin-list", query); // use your correct endpoint
    if (response.data.success) {
      dispatch(setBestDeals(response.data.data));
    }
    return response.data;
  } catch (error) {
    console.log("Error in getBestDealApi", error);
    return { success: false, error: error.message };
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

export const PatchBestDealApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/best-deal/admin-status/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const PatchBulkOrderApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/bulk-order/verify-status/${id}`, payload); 
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

