import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setLoader,
  setMode,
  setPageTitle,
  setProductFamilyCrud,
  setProductFamilyModal,
} from "../../../slices/sharedSlice";
import { deleteProductFamilyApi, getProductFamiliesApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import ProductFamilyList from "../components/ProductFamilyList";
import PageLoader from "../../../shared/PageLoader";
import AddEditProductFamily from "../components/AddEditProductFamily";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";

const ProductFamilies = () => {
  const dispatch = useDispatch();
  const { loader, productFamilyModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchProducts = useCallback(() => {
    dispatch(getProductFamiliesApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Product Families"));
    fetchProducts();
  }, [dispatch, fetchProducts]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deleteProductFamilyApi(deleteId)
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
              buttonText="Add Product Family"
              handleOnClick={() => {
                dispatch(setProductFamilyModal(true));
                dispatch(setProductFamilyCrud({}));
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
          <ProductFamilyList />
        </div>
      )}
      <AddEditProductFamily
        open={productFamilyModal}
        mode="add"
        getResponseBack={() => fetchProducts()}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default ProductFamilies;
