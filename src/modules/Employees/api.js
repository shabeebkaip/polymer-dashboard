import moment from "moment";
import { downloadFileType } from "../../utils";
import {
  globalDeleteService,
  globalExportService,
  globalFileUploadService,
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
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const exportApi = async (searchQuery) => {
  globalExportService("/employees/template", { search: searchQuery }).then(
    (response) => {
      downloadFileType(
        response.data,
        `export_employees_${moment().format("MMM DD YYYY, HH:mm:ss")}`,
        "xlsx"
      );
    }
  );
};

export const importApi = async (data) => {
  try {
    let response = await globalFileUploadService("/employees/import", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
