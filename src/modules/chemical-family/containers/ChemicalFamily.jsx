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

const ChemicalFamily = () => {
  const dispatch = useDispatch();
  const { loader, ChemicalFamilyModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchProducts = useCallback(() => {
    dispatch(getChemicalFamilyApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("ChemicalFamily"));
    fetchProducts();
  }, [dispatch, fetchProducts]);

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
        fetchProducts();
      });
  };

  return (
    <div>
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
              icon={"/tools/create.svg"}
            />
          </div>
        }
      ></Title>
      {loader ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <ChemicalFamilyList />
        </div>
      )}
      <AddEditChemicalFamily
        open={ChemicalFamilyModal}
        mode="add"
        getResponseBack={() => fetchProducts()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default ChemicalFamily;
