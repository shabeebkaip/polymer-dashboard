import {
  globalDeleteService,
  globalGetService,
} from "../../utils/globalApiServices";

export const getUsersApi = async (query) => {
  try {
    const response = await globalGetService("/users", query);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserApi = async (id) => {
  try {
    const response = await globalDeleteService(`/users/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
