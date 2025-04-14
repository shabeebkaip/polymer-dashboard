import { globalPostService } from "../../utils/globalApiServices";

export const loginApi = async (data) => {
  try {
    const response = await globalPostService("/auth/admin/login", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const signUpApi = async (data) => {
  try {
    const response = await globalPostService("/users", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
