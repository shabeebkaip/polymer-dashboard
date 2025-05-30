import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setLoader,
  setMode,
  setPageTitle,
  setChemicalFamilyCrud,
  setChemicalFamilyModal,
} from "../../../slices/sharedSlice";
import { deleteChemicalFamilyApi, getChemicalFamilyApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import ChemicalFamilyList from "../components/ChemicalFamilyList";
import PageLoader from "../../../shared/PageLoader";
import AddEditChemicalFamily from "../components/AddEditChemicalFamily";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import PaginationContainer from "../../../shared/PaginationContainer";
import createIcon from '../../../assets/create.svg'

const ChemicalFamily = () => {
  const [chemicalFamilies, setChemicalFamilies] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { loader, ChemicalFamilyModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchChemical = useCallback((query = { page: 1 }) => {
    setLoading(true);
    dispatch(getChemicalFamilyApi(query))
      .then((response) => {
        if (response?.success) {
          const paginationData = {
            total: response.pagination.totalItems,
            currentPage: response.pagination.currentPage,
            totalPages: response.pagination.totalPages,
          };
          setPagination(paginationData);
          setChemicalFamilies(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching chemical family:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("ChemicalFamily"));
    fetchChemical();
  }, [dispatch, fetchChemical]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deleteChemicalFamilyApi(deleteId)
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
        console.error("Error deleting ChemicalFamily:", error);
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchChemical();
      });
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="ChemicalFamily"
        description="Displaying all the ChemicalFamily"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add ChemicalFamily"
              handleOnClick={() => {
                dispatch(setChemicalFamilyModal(true));
                dispatch(setChemicalFamilyCrud({}));
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
          <ChemicalFamilyList data={chemicalFamilies} />
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchChemical({ page })}
          />
        </div>
      )}
      <AddEditChemicalFamily
        open={ChemicalFamilyModal}
        mode="add"
        getResponseBack={() => fetchChemical()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default ChemicalFamily;
