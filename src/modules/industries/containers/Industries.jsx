import ActionButton from "../../../shared/ActionButton";
import Title from "../../../shared/Title";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteIndustryApi, getIndustriesApi } from "../api";
import {
  setDeleteModal,
  setIndustryCrud,
  setIndustryModal,
  setLoader,
  setMode,
  setPageTitle,
} from "../../../slices/sharedSlice";
import IndustriesList from "../components/IndustriesList";
import PageLoader from "../../../shared/PageLoader";
import AddEditIndustries from "../components/AddEditIndustries";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import PaginationContainer from "../../../shared/PaginationContainer";

const Industries = () => {
   const [industries, setIndustries] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { loader, industryModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

    const fetchIndustries = useCallback((query = { page: 1 }) => {
      setLoading(true);
      dispatch(getIndustriesApi(query))
        .then((response) => {
          if (response?.success) {
            const paginationData = {
              total: response.pagination.totalItems,
              currentPage: response.pagination.currentPage,
              totalPages: response.pagination.totalPages,
            };
            setPagination(paginationData);
            setIndustries(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching industries:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [dispatch]);
  
    useEffect(() => {
        dispatch(setPageTitle("Industries"));
        fetchIndustries(); 
      }, [dispatch, fetchIndustries]);
    

  const handleDelete = () => {
    dispatch(setLoader(true));
    deleteIndustryApi(deleteId)
      .then((response) => {
        if (response.success) {
          dispatch(setDeleteModal(false));
          fetchIndustries();
          enqueueSnackbar(response?.message, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        } else {
          enqueueSnackbar(response?.message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      })
      .catch(() => {
        dispatch(setLoader(false));
        enqueueSnackbar("Error deleting industry", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchIndustries();
      });
  };

  return (
    <div>
      <Title
        title="Industries"
        description="Displaying all the categories under Industries"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add Industry"
              handleOnClick={() => {
                dispatch(setIndustryModal(true));
                dispatch(setMode("add"));
                dispatch(setIndustryCrud({}));
              }}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon={"/tools/create.svg"}
            />
          </div>
        }
      />
      {loading ? (
              <PageLoader />
            ) : (
              <div className="mt-4">
                <IndustriesList data={industries} />
                <PaginationContainer
                  totalPages={pagination?.totalPages}
                  currentPage={pagination?.currentPage}
                  handlePageChange={(page) => fetchIndustries({ page })}
                />
              </div>
            )}
      <AddEditIndustries
             open={industryModal}
             mode="add"
             getResponseBack={() => fetchIndustries()}
           />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default Industries;
