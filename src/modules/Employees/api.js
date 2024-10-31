import {
  globalDeleteService,
  globalGetService,
} from "../../utils/globalApiServices";

export const getEmployeesApi = async (query) => {
  try {
    let respone = await globalGetService("/employees", query);
    return respone.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteEmployeeApi = async (id) => {
  try {
    let response = await globalDeleteService(`/employees/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
