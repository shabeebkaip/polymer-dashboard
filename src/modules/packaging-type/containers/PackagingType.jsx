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

const PackagingType = () => {
  const dispatch = useDispatch();
  const { loader, PackagingTypeModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchProducts = useCallback(() => {
    dispatch(getPackagingTypeApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Packaging Type"));
    fetchProducts();
  }, [dispatch, fetchProducts]);

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
        fetchProducts();
      });
  };

  return (
    <div>
      <Title
        title="Packaging Type"
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
              icon={"/tools/create.svg"}
            />
          </div>
        }
      ></Title>
      {loader ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <PackagingTypeList />
        </div>
      )}
      <AddEditPackagingType
        open={PackagingTypeModal}
        mode="add"
        getResponseBack={() => fetchProducts()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default PackagingType;
