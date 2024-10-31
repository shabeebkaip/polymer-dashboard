import { globalPostService } from "../../utils/globalApiServices";

export const loginApi = async (data) => {
  try {
    const response = await globalPostService("/login", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
