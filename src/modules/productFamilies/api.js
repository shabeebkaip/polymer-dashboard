import { globalGetService } from "../../utils/globalApiServices";

export const getProductFamiliesApi = async () => {
  try {
    let response = await globalGetService("/product-family/list");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
