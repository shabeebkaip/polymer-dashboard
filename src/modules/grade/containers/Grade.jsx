import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setLoader,
  setMode,
  setPageTitle,
  setGradeCrud,
  setGradeModal,
} from "../../../slices/sharedSlice";
import { deleteGradeApi, getGradeApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import GradeList from "../components/GradeList";
import PageLoader from "../../../shared/PageLoader";
import AddEditGrade from "../components/AddEditGrade";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import PaginationContainer from "../../../shared/PaginationContainer";

const Grade = () => {
  const [grades, setGrades] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { loader, GradeModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchGrade = useCallback((query = { page: 1 }) => {
    setLoading(true);
    dispatch(getGradeApi(query))
      .then((response) => {
        if (response?.success) {
          const paginationData = {
            total: response.pagination.totalItems,
            currentPage: response.pagination.currentPage,
            totalPages: response.pagination.totalPages,
          };
          setPagination(paginationData);
          setGrades(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching grade:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Grade"));
    fetchGrade();
  }, [dispatch, fetchGrade]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deleteGradeApi(deleteId)
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
        console.error("Error deleting Grade:", error);
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchGrade();
      });
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="Grade"
        description="Displaying all the Grade"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add Grade"
              handleOnClick={() => {
                dispatch(setGradeModal(true));
                dispatch(setGradeCrud({}));
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
          <GradeList data={grades} />
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchGrade({ page })}
          />
        </div>
      )}
      <AddEditGrade
        open={GradeModal}
        mode="add"
        getResponseBack={() => fetchGrade()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default Grade;
