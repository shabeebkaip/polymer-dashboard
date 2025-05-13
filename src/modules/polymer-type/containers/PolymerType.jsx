import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setLoader,
  setMode,
  setPageTitle,
  setPolymerTypeCrud,
  setPolymerTypeModal,
} from "../../../slices/sharedSlice";
import { deletePolymerTypeApi, getPolymerTypeApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import PolymerTypeList from "../components/PolymerTypeList";
import PageLoader from "../../../shared/PageLoader";
import AddEditPolymerType from "../components/AddEditPolymerType";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import PaginationContainer from "../../../shared/PaginationContainer";

const PolymerType = () => {
  const [polymerTypes, setPolymerType] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { loader, polymerTypeModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchPolymer = useCallback((query = { page: 1 }) => {
     setLoading(true);
     dispatch(getPolymerTypeApi(query))
       .then((response) => {
         if (response?.success) {
           const paginationData = {
             total: response.pagination.totalItems,
             currentPage: response.pagination.currentPage,
             totalPages: response.pagination.totalPages,
           };
           setPagination(paginationData);
           setPolymerType(response.data);
         }
       })
       .catch((error) => {
         console.error("Error fetching polymer type:", error);
       })
       .finally(() => {
         setLoading(false);
       });
   }, [dispatch]);
 
  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Polymer Types"));
    fetchPolymer();
  }, [dispatch, fetchPolymer]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deletePolymerTypeApi(deleteId)
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
        console.error("Error deleting polyer type:", error);
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchPolymer();
      });
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="Polymer Types"
        description="Displaying all the Polymer Types"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add Polymer Type"
              handleOnClick={() => {
                dispatch(setPolymerTypeModal(true));
                dispatch(setPolymerTypeCrud({}));
                dispatch(setMode("add"));
              }}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon={"/tools/create.svg"}
            />
          </div>
        }
      ></Title>
      {loader ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
        <PolymerTypeList data={polymerTypes} />
        <PaginationContainer
          totalPages={pagination?.totalPages}
          currentPage={pagination?.currentPage}
          handlePageChange={(page) => fetchPolymer({ page })}
        />
      </div>
      )}
      <AddEditPolymerType
        open={polymerTypeModal}
        mode="add"
        getResponseBack={() => fetchPolymer()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default PolymerType;
