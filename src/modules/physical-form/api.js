import { setLoader, setPhysicalForm } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getPhysicalFormApi = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    let response = await globalGetService("/physical-form/list");
    if (response.data.success) {
      dispatch(setPhysicalForm(response.data.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const createPhysicalFormApi = async (data) => {
    console.log(data);
    
  try {
    let response = await globalPostService("/physical-form/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updatePhysicalFormApi = async (data) => {
  try {
    let response = await globalPutService(
      `/physical-form/edit/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePhysicalFormApi = async (id) => {
  try {
    let response = await globalDeleteService(`/physical-form/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
 