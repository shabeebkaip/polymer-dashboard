import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setLoader,
  setMode,
  setPageTitle,
  setIncotermsCrud,
  setIncotermsModal,
} from "../../../slices/sharedSlice";
import { deleteIncotermsApi, getIncotermsApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import IncotermList from "../components/IncotermList";
import PageLoader from "../../../shared/PageLoader";
import AddEditIncoterm from "../components/AddEditIncoterm";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import PaginationContainer from "../../../shared/PaginationContainer";

const Incoterm = () => {
  const [incoterms, setIncoterms] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { loader, IncotermModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchIncoterms = useCallback((query = { page: 1 }) => {
    setLoading(true);
    dispatch(getIncotermsApi(query))
      .then((response) => {
        if (response?.success) {
          const paginationData = {
            total: response.pagination.totalItems,
            currentPage: response.pagination.currentPage,
            totalPages: response.pagination.totalPages,
          };
          setPagination(paginationData);
          setIncoterms(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Incoterms:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Incoterm"));
    fetchIncoterms();
  }, [dispatch, fetchIncoterms]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deleteIncotermsApi(deleteId)
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
        console.error("Error deleting Incoterm:", error);
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchIncoterms();
      });
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="Incoterm"
        description="Displaying all the Incoterm"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add Incoterm"
              handleOnClick={() => {
                dispatch(setIncotermsModal(true));
                dispatch(setIncotermsCrud({}));
                dispatch(setMode("add"));
              }}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon={"/src/assets/create.svg"}
            />
          </div>
        }
      ></Title>
      {loader ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <IncotermList data={incoterms} />
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchIncoterms({ page })}
          />
        </div>
      )}
      <AddEditIncoterm
        open={IncotermModal}
        mode="add"
        getResponseBack={() => fetchIncoterms()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default Incoterm;
