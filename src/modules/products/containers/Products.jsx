import { useEffect } from "react";
import { getProductsApi } from "../api";
import { setProductLoader, setProducts } from "../../../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../shared/PageLoader";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import ProductsList from "../components/ProductsList";

const Products = () => {
  const dispatch = useDispatch();
  const { products, productLoader } = useSelector(
    (state) => state.productState
  );

  console.log("products", products);

  useEffect(() => {
    dispatch(setProductLoader(true));
    getProductsApi({}).then((response) => {
      dispatch(setProductLoader(false));
      if (response.success) {
        dispatch(setProducts(response.data));
      }
    });
  }, []);
  return (
    <div>
      <Title title="Products" description="Displaying all the Products" />
      <div className="flex items-center justify-between p-1 mt-4 bg-white rounded-full shadow">
        <ActionButton
          buttonText="Add Product"
          handleOnClick={() => {}}
          textColor="#ffffff"
          bgColor="rgb(41, 82, 255)"
          icon={"/tools/create.svg"}
        />
      </div>
        {productLoader ? (
          <PageLoader />
        ) : (
          <div className="mt-4">
            <ProductsList products={products?.list} />
          </div>
        )}
    </div>
  );
};

export default Products;
