import { setLoader, setPackagingType } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getPackagingTypeApi = (query = {}) => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    if (!query.page) {
      query.page = 1;
    }

    let response = await globalGetService("/packaging-type/list", query);
    if (response.data.success) {
      dispatch(setPackagingType(response.data.data));
      return response.data
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const createPackagingTypeApi = async (data) => {
    console.log(data);
    
  try {
    let response = await globalPostService("/packaging-type/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updatePackagingTypeApi = async (data) => {
  try {
    let response = await globalPutService(
      `/packaging-type/edit/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePackagingTypeApi = async (id) => {
  try {
    let response = await globalDeleteService(`/packaging-type/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
