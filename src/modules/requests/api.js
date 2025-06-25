import { setFinances, setQuotes, setSamples, setBulkOrders, setBestDeals, setDealQuotes, setSupplierOffers } from "../../slices/requestSlice";
import { setLoader } from "../../slices/sharedSlice";
import { globalGetService, globalPatchService, globalPostService, globalPutService } from "../../utils/globalApiServices";

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
    const response = await globalGetService("/best-deal/admin-list", query);
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

export const getDealQuoteListApi = (query) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await globalGetService("/best-deal/buyer-deal-admin/list", query);
    if (response.data.success) {
      dispatch(setDealQuotes(response.data.data));
    }
    return response.data;
  } catch (error) {
    console.log("Error in getDealQuoteListApi", error);
    return { success: false, error: error.message };
  } finally {
    dispatch(setLoader(false));
  }
};

export const getSupplierOffersApi = (query) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await globalGetService("/bulk-order/supplier-offer/list", query);
    if (response.data.success) {
      dispatch(setSupplierOffers(response.data.data));
    }
    return response.data;
  } catch (error) {
    console.log("Error in getSupplierOffersApi", error);
    return { success: false, error: error.message };
  } finally {
    dispatch(setLoader(false));
  }
};

export const getAdminProductsApi = async () => {
  try {
    const response = await globalGetService("/bulk-order/admin-product/list");
    return response.data;
  } catch (error) {
    console.log("Error in getAdminProductsApi", error);
    return { success: false, error: error.message };
  }
};

export const getAdminUsersApi = async () => {
  try {
    const response = await globalGetService("/best-deal/admin-users");
    return response.data;
  } catch (error) {
    console.log("Error in getAdminUserApi", error);
    return { success: false, error: error.message };
  }
};


export const PatchFinanceApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/finance/status/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
    return { success: false, error: err.message };
  }
};

export const PatchBestDealApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/best-deal/admin-status/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
    return { success: false, error: err.message };
  }
};

export const PatchBulkOrderApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/bulk-order/verify-status/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
    return { success: false, error: err.message };
  }
};

export const patchDealQuoteRequestApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/best-deal/buyer-deal-verify/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
    return { success: false, error: err.message };
  }
};

export const patchSupplierOfferApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/bulk-order/supplier-offer/verify/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
    return { success: false, error: err.message };
  }
};

export const patchQuoteRequestApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/quote-request/status/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
    return { success: false, error: err.message };
  }
};

export const patchSampleRequestApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/sample-request/status/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
    return { success: false, error: err.message };
  }
};

export const createBulkOrderApi = async (payload) => {
  try {
    const response = await globalPostService("/bulk-order/admin-create", payload);
    return { success: true, data: response.data, message: "Bulk order created successfully." };
  } catch (error) {
    console.error("Error in createBulkOrderApi:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const createBestDealApi = async (payload) => {
  try {
    const response = await globalPostService("/best-deal/admin-create", payload);
    return { success: true, data: response.data, message: "Best deal created successfully." };
  } catch (error) {
    console.error("Error in createBestDealApi:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};


export const updateBulkOrderApi = async (payload) => {
  try {
    const response = await globalPutService(`/bulk-order/admin-edit/${payload._id}`, payload);
    return { success: true, data: response.data, message: "Bulk order updated successfully." };
  } catch (error) {
    console.error("Error in updateBulkOrderApi:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const updateBestDealApi = async (payload) => {
  try {
    const response = await globalPutService(`/best-deal/admin-edit/${payload._id}`, payload);
    return { success: true, data: response.data, message: "Best deal updated successfully." };
  } catch (error) {
    console.error("Error in updateBestDealApi:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};