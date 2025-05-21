import { globalDeleteService, globalGetService, globalPutService } from "../../utils/globalApiServices";

const createCrudOperations = (entityName) => {
  return {

    fetch: async (filterData) => {
      try {
        const response = await globalGetService(`cms/list/${entityName}`, filterData);
        return response;
      } catch (error) {
        throw error;
      }
    },
    ar_fetch: async (filterData) => {
      try {
        const response = await globalGetService(`cms/list/ar/${entityName}`, filterData);
        return response;
      } catch (error) {
        throw error;
      }
    },
    update: async (data, id) => {
      try {
        const response = await globalPutService(`/cms/edit/${entityName}/${id}`, data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    updateSection: async (data) => {
      try {
        const response = await globalPutService(`/cms/edit/${entityName}`, data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id) => {
      try {
        const response = await globalDeleteService(`/cms/delete/${entityName}/${id}`);
        return response;
      } catch (error) {
        throw error;
      }
    },

    create: async (data) => {
      try {
        const response = await globalPutService(`/cms/edit/${entityName}`, data);
        return response;
      } catch (error) {
        throw error;
      }
    }
  };
};

export const termsCrud = createCrudOperations('termsAndConditions');
export const privacyCrud = createCrudOperations('privacyPolicy');

