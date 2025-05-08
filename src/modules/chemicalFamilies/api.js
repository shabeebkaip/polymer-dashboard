import { setLoader, setChemicalFamilies } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getChemicalFamiliesApi = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    let response = await globalGetService("/chemical-family/list");
    if (response.data.success) {
      dispatch(setChemicalFamilies(response.data.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const createChemicalFamilyApi = async (data) => {
  try {
    let response = await globalPostService("/chemical-family/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateChemicalFamilyApi = async (data) => {
  try {
    let response = await globalPutService(
      `/chemical-family/edit/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteChemicalFamilyApi = async (id) => {
  try {
    let response = await globalDeleteService(`/chemical-family/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
