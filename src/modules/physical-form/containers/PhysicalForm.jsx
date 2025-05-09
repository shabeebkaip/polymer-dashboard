import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setLoader,
  setMode,
  setPageTitle,
  setPhysicalFormCrud,
  setPhysicalFormModal,
} from "../../../slices/sharedSlice";
import { deletePhysicalFormApi, getPhysicalFormApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import PhysicalFormList from "../components/PhysicalFormList";
import PageLoader from "../../../shared/PageLoader";
import AddEditPhysicalForm from "../components/AddEditPhysicalForm";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";

const PhysicalForm = () => {
  const dispatch = useDispatch();
  const { loader, PhysicalFormModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchProducts = useCallback(() => {
    dispatch(getPhysicalFormApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Physical Form"));
    fetchProducts();
  }, [dispatch, fetchProducts]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deletePhysicalFormApi(deleteId)
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
        console.error("Error deleting Physical Form:", error);
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchProducts();
      });
  };

  return (
    <div>
      <Title
        title="Physical Form"
        description="Displaying all the Physical Form"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add Physical Form"
              handleOnClick={() => {
                dispatch(setPhysicalFormModal(true));
                dispatch(setPhysicalFormCrud({}));
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
          <PhysicalFormList />
        </div>
      )}
      <AddEditPhysicalForm
        open={PhysicalFormModal}
        mode="add"
        getResponseBack={() => fetchProducts()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default PhysicalForm;
