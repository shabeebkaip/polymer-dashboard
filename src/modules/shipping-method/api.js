import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

import { setLoader, setShippingMethod } from "../../slices/sharedSlice";

export const getShippingMethodApi = (query = {}) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    if (!query.page) query.page = 1;

    const response = await globalGetService("/shipping-method/list", query);
    if (response.data.success) {
      dispatch(setShippingMethod(response.data.data));
      return response.data;
    }
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const createShippingMethodApi = async (data) => {
  try {
    const response = await globalPostService("/shipping-method/create", data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateShippingMethodApi = async (data) => {
  try {
    const response = await globalPutService(
      `/shipping-method/edit/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteShippingMethodApi = async (id) => {
  try {
    const response = await globalDeleteService(`/shipping-method/delete/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
