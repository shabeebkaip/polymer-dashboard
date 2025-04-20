import {
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getIndustriesApi = async (query) => {
  try {
    const response = await globalGetService("/industry/list", query);
    return response.data;
  } catch (err) {
    console.log(err);
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
    const response = await globalPutService(`/industry/edit/${data._id}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
