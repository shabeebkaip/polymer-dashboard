import { globalPostService } from "../utils/globalApiServices";

export const postFileUpload = async (data) => {
  try {
    const response = await globalPostService(`/file/upload`, data);
    return response;
  } catch (error) {
    console.error("Error uploading :", error);
    throw error;
  }
};
