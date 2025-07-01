import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setLoader,
  setMode,
  setPageTitle,
  setPackagingTypeCrud,
  setPackagingTypeModal,
} from "../../../slices/sharedSlice";
import { deletePackagingTypeApi, getPackagingTypeApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import PackagingTypeList from "../components/PackagingTypeList";
import PageLoader from "../../../shared/PageLoader";
import AddEditPackagingType from "../components/AddEditPackagingType";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import PaginationContainer from "../../../shared/PaginationContainer";
import createIcon from '../../../assets/create.svg'

const PackagingType = () => {
   const [packagingTypes, setPackagingType] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { loader, PackagingTypeModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

 const fetchPackage = useCallback((query = { page: 1 }) => {
     setLoading(true);
     dispatch(getPackagingTypeApi(query))
       .then((response) => {
         if (response?.success) {
           const paginationData = {
             total: response.pagination.totalItems,
             currentPage: response.pagination.currentPage,
             totalPages: response.pagination.totalPages,
           };
           setPagination(paginationData);
           setPackagingType(response.data);
         }
       })
       .catch((error) => {
         console.error("Error fetching packaging types:", error);
       })
       .finally(() => {
         setLoading(false);
       });
   }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Packaging Type"));
    fetchPackage();
  }, [dispatch, fetchPackage]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deletePackagingTypeApi(deleteId)
      .then((response) => {
        if (response.success) {
          dispatch(setDeleteModal(false));
          enqueueSnackbar(response?.message, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting Packaging Type:", error);
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchPackage();
      });
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        description="Displaying all the Packaging Type"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add Packaging Type"
              handleOnClick={() => {
                dispatch(setPackagingTypeModal(true));
                dispatch(setPackagingTypeCrud({}));
                dispatch(setMode("add"));
              }}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon={ createIcon }
            />
          </div>
        }
      ></Title>
      {loader ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <PackagingTypeList data={packagingTypes} />
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchPackage({ page })}
          />
        </div>
      )}
      <AddEditPackagingType
        open={PackagingTypeModal}
        mode="add"
        getResponseBack={() => fetchPackage()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default PackagingType;
