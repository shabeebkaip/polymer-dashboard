import {
  globalDeleteService,
  globalGetService,
  globalPatchService,
} from "../../utils/globalApiServices";

export const getUsersApi = async (query) => {
  try {
    const response = await globalGetService("/user/list", query);
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
export const PatchUserApi = async (id, payload) => {
  try {
    const response = await globalPatchService(`/user/verification/${id}`, payload);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

