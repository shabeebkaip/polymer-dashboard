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

const Incoterm = () => {
  const dispatch = useDispatch();
  const { loader, IncotermModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchProducts = useCallback(() => {
    dispatch(getIncotermsApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Incoterm"));
    fetchProducts();
  }, [dispatch, fetchProducts]);

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
        fetchProducts();
      });
  };

  return (
    <div>
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
              icon={"/tools/create.svg"}
            />
          </div>
        }
      ></Title>
      {loader ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <IncotermList />
        </div>
      )}
      <AddEditIncoterm
        open={IncotermModal}
        mode="add"
        getResponseBack={() => fetchProducts()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default Incoterm;
