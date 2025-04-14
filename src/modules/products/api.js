import { globalPostService } from "../../utils/globalApiServices";

export const getProductsApi = async (query) => {
  try {
    let response = await globalPostService("/product", query);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
