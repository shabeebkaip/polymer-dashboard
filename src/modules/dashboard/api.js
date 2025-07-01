import { globalGetService } from "../../utils/globalApiServices";


const fetchDashboardData = async (filterData) => {
  try {
    const response = await globalGetService(`/dashboard/list`, filterData);
    return response;
  } catch (error) {
    console.error('Error fetching dashboard list:', error);
    throw error;
  }
};

export const DashboardApi = {
  fetchDashboardData,
};
