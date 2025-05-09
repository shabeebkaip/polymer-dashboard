import { setIndustries, setLoader } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getIndustriesApi = (query = {}) => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    if (!query.page) {
      query.page = 1;
    }

    const response = await globalGetService("/industry/list", query);
    if (response.data.success) {
      dispatch(setIndustries(response.data.data));
      return response.data
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const createIndustryApi = async (data) => {
  try {
    const response = await globalPostService("/industry/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateIndustryApi = async (data) => {
  try {
    const response = await globalPutService(
      `/industry/update/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteIndustryApi = async (id) => {
  try {
    const response = await globalDeleteService(`/industry/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
