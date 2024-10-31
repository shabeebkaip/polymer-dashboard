import { globalGetService } from "../../utils/globalApiServices";

export const getEmployeesApi = async (query) => {
  debugger;
  try {
    let respone = await globalGetService("/employees", query);
    return respone.data;
  } catch (err) {
    console.log(err);
  }
};
