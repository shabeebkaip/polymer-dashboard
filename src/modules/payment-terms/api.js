import { setLoader, setPaymentTerms,  } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getPaymentTermsApi = () => async (dispatch) => {
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

export const createPaymentTermsApi = async (data) => {
    console.log(data);
    
  try {
    let response = await globalPostService("/payment-terms/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updatePaymentTermsApi = async (data) => {
  try {
    let response = await globalPutService(
      `/payment-terms/edit/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePaymentTermsApi = async (id) => {
  try {
    let response = await globalDeleteService(`/payment-terms/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
