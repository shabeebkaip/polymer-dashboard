import {
  globalDeleteService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getProductsApi = async (query) => {
  try {
    let response = await globalPostService("/product", query);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createProductApi = async (data) => {
  try {
    let response = await globalPostService("/product/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProductApi = async (data) => {
  try {
    let response = await globalPutService(`/product/edit/${data._id}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductApi = async (id) => {
  try {
    let response = await globalDeleteService(`/product/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
