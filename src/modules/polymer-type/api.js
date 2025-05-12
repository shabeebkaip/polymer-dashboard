import { setLoader, setPolymerType } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getPolymerTypeApi = (query = {}) => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    if (!query.page) {
      query.page = 1;
    }

    let response = await globalGetService("/polymer-type/list", query);
    if (response.data.success) {
      dispatch(setPolymerType(response.data.data));
      return response.data
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const createPolymerTypeApi = async (data) => {
    console.log(data);
    
  try {
    let response = await globalPostService("/polymer-type/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updatePolymerTypeApi = async (data) => {
  try {
    let response = await globalPutService(
      `/polymer-type/edit/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePolymerTypeApi = async (id) => {
  try {
    let response = await globalDeleteService(`/polymer-type/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
