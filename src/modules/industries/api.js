import { globalGetService } from "../../utils/globalApiServices";

export const getIndustriesApi = async (query) => {
  try {
    const response = await globalGetService("/industry/list", query);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
