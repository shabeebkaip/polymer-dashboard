import { globalGetService } from "../../../utils/globalApiServices";

const getFilter = async () => {
  try {
    const response = await globalGetService(`/product/filter`);
    return response;

  } catch (error) {
    console.error("Error fetching filter data:", error);
    throw error;
  }
};
export const FilterService = {
  getFilter
};