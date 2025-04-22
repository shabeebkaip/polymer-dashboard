import { useCallback, useEffect } from "react";
import { deleteProductApi, getProductsApi } from "../api";
import {
  setProductCrud,
  setProductLoader,
  setProductModal,
  setProducts,
} from "../../../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../shared/PageLoader";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import ProductsList from "../components/ProductsList";
import {
  setDeleteModal,
  setMode,
  setPageTitle,
} from "../../../slices/sharedSlice";
import AddEditProduct from "../components/AddEditProduct";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import {
  getAppearancesApi,
  getBrandsApi,
  getGradesApi,
  getIncotermsApi,
  getSubstancesApi,
} from "../../../shared/api";
import { getIndustriesApi } from "../../industries/api";
import { getProductFamiliesApi } from "../../productFamilies/api";

const Products = () => {
  const dispatch = useDispatch();
  const { products, productLoader } = useSelector(
    (state) => state.productState
  );
  const { deleteId } = useSelector((state) => state.sharedState);

  const fetchDropdowns = useCallback(() => {
    dispatch(getBrandsApi());
    dispatch(getIndustriesApi());
    dispatch(getProductFamiliesApi());
    dispatch(getAppearancesApi());
    dispatch(getSubstancesApi());
    dispatch(getGradesApi());
    dispatch(getIncotermsApi());
  }, [dispatch]);
  const fetchProducts = useCallback(() => {
    dispatch(setPageTitle("Products"));
    dispatch(setProductLoader(true));
    getProductsApi({}).then((response) => {
      dispatch(setProductLoader(false));
      if (response.success) {
        dispatch(setProducts(response.data));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchDropdowns();
  }, [fetchDropdowns]);

  const handleDelete = () => {
    dispatch(setProductLoader(true));
    deleteProductApi(deleteId)
      .then((response) => {
        if (response.success) {
          dispatch(setDeleteModal(false));
          fetchProducts();
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
        dispatch(setProductLoader(false));
        enqueueSnackbar("Error deleting product", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      })
      .finally(() => {
        dispatch(setProductLoader(false));
      });
  };
  return (
    <div>
      <Title
        title="Products"
        description="Displaying all the Products"
        actions={
          <ActionButton
            buttonText="Add Product"
            handleOnClick={() => {
              dispatch(setProductModal(true));
              dispatch(setProductCrud({}));
              dispatch(setMode("add"));
            }}
            textColor="#ffffff"
            bgColor="rgb(41, 82, 255)"
            icon={"/tools/create.svg"}
          />
        }
      />

      {productLoader ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <ProductsList products={products?.list} />
        </div>
      )}
      <AddEditProduct getResponseBack={fetchProducts} />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default Products;
