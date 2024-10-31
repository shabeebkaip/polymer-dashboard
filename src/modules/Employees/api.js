import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
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

export const addEmployeeApi = async (data) => {
  try {
    let response = await globalPostService("/employees", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const editEmployeeApi = async (data, id) => {
  try {
    let response = await globalPutService(`/employees/${id}`, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
