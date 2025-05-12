import { setLoader, setGrade } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getGradeApi = ( query = {}) => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    if (!query.page) {
      query.page = 1;
    }

    let response = await globalGetService("/grade/list", query);
    if (response.data.success) {
      dispatch(setGrade(response.data.data));
      return response.data
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const createGradeApi = async (data) => {
    console.log(data);
    
  try {
    let response = await globalPostService("/grade/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateGradeApi = async (data) => {
  try {
    let response = await globalPutService(
      `/grade/edit/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteGradeApi = async (id) => {
  try {
    let response = await globalDeleteService(`/grade/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
