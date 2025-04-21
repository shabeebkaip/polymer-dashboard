import { useEffect } from "react";
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
import { setPageTitle } from "../../../slices/sharedSlice";
import AddEditProduct from "../components/AddEditProduct";
import { getBrandsApi } from "../../../shared/api";

const Products = () => {
  const dispatch = useDispatch();
  const { products, productLoader } = useSelector(
    (state) => state.productState
  );

  useEffect(() => {
    dispatch(setPageTitle("Products"));
    dispatch(setProductLoader(true));
    getProductsApi({}).then((response) => {
      dispatch(setProductLoader(false));
      if (response.success) {
        dispatch(setProducts(response.data));
      }
    });
  }, [dispatch]);
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
              dispatch(getBrandsApi());
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
      <AddEditProduct />
    </div>
  );
};

export default Products;
