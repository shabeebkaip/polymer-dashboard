import {
  globalGetService,
  globalPostService,
} from "../../utils/globalApiServices";

export const getProductFamiliesApi = async () => {
  try {
    let response = await globalGetService("/product-family/list");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createProductFamilyApi = async (data) => {
  try {
    let response = await globalPostService("/product-family/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
