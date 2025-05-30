import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setLoader,
  setMode,
  setPageTitle,
  setProductFamilyCrud,
  setProductFamilyModal,
} from "../../../slices/sharedSlice";
import {
  deleteProductFamilyApi,
  getProductFamiliesApi,
} from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import ProductFamilyList from "../components/ProductFamilyList";
import PageLoader from "../../../shared/PageLoader";
import AddEditProductFamily from "../components/AddEditProductFamily";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import PaginationContainer from "../../../shared/PaginationContainer";

const ProductFamilies = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { loader, productFamilyModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchProducts = useCallback((query = { page: 1 }) => {
    setLoading(true);
    dispatch(getProductFamiliesApi(query))
      .then((response) => {
        if (response?.success) {
          const paginationData = {
            total: response.pagination.totalItems,
            currentPage: response.pagination.currentPage,
            totalPages: response.pagination.totalPages,
          };
          setPagination(paginationData);
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching product families:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
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
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="Product Families"
        description="Displaying all the Product Families"
        actions={
          <div className="flex items-center justify-between">
            <ActionButton
              buttonText="Add Product Family"
              handleOnClick={() => {
                dispatch(setProductFamilyModal(true));
                dispatch(setProductFamilyCrud({}));
                dispatch(setMode("add"));
              }}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon="/src/assets/create.svg"
            />
          </div>
        }
      />
      {loading ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <ProductFamilyList data={products} />
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchProducts({ page })}
          />
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
