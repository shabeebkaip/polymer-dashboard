import { useCallback, useEffect } from "react";
import { getProductsApi } from "../api";
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
import { setMode, setPageTitle } from "../../../slices/sharedSlice";
import AddEditProduct from "../components/AddEditProduct";

const Products = () => {
  const dispatch = useDispatch();
  const { products, productLoader } = useSelector(
    (state) => state.productState
  );
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
    </div>
  );
};

export default Products;
