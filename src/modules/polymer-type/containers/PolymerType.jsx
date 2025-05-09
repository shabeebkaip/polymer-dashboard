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

const PolymerType = () => {
  const dispatch = useDispatch();
  const { loader, polymerTypeModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchProducts = useCallback(() => {
    dispatch(getPolymerTypeApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Product Families"));
    fetchProducts();
  }, [dispatch, fetchProducts]);

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
        console.error("Error deleting product family:", error);
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchProducts();
      });
  };

  return (
    <div>
      <Title
        title="Product Families"
        description="Displaying all the Product Families"
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
          <PolymerTypeList />
        </div>
      )}
      <AddEditPolymerType
        open={polymerTypeModal}
        mode="add"
        getResponseBack={() => fetchProducts()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default PolymerType;
