import { setLoader, setIncoterms } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getIncotermsApi = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    let response = await globalGetService("/incoterm/list");
    if (response.data.success) {
      dispatch(setIncoterms(response.data.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const createIncotermsApi = async (data) => {
    console.log(data);
    
  try {
    let response = await globalPostService("/incoterm/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateIncotermsApi = async (data) => {
  try {
    let response = await globalPutService(
      `/incoterm/edit/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteIncotermsApi = async (id) => {
  try {
    let response = await globalDeleteService(`/incoterm/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
