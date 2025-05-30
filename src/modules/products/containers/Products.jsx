import { useCallback, useEffect, useState } from "react";
import { deleteProductApi, getProductsApi } from "../api";
import filterIcon from "./../../../assets/filters.svg";
import clearFilterIcon from "./../../../assets/clears.svg";
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
import SearchIcon from "@mui/icons-material/Search";
import {
  setDeleteModal,
  setMode,
  setOpenFilter,
  setPageTitle,
} from "../../../slices/sharedSlice";
import AddEditProduct from "../components/AddEditProduct";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Filters from "../../../shared/sharedComponents/filter/Filters";
import eventBus from "../../../utils/eventBus";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PaginationContainer from "../../../shared/PaginationContainer";
import createIcon from '../../../assets/create.svg'

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({});

  const [filterActive, setFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { products, productLoader } = useSelector(
    (state) => state.productState
  );
  const { deleteId } = useSelector((state) => state.sharedState);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchProducts({ search: value });
  };

  const handleClear = () => {
    setSearchQuery("");
    fetchProducts({ search: "" });
  };
  const fetchProducts = useCallback(
    (filters = {}) => {
      dispatch(setPageTitle("Products"));
      dispatch(setProductLoader(true));
      getProductsApi(filters).then((response) => {
        dispatch(setProductLoader(false));
        if (response.success) {
          dispatch(setProducts(response.data));
          const paginationData = {
            total: response.pagination.total,
            currentPage: response.pagination.page,
            totalPages: response.pagination.totalPages,
          };
          setPagination(paginationData);
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  const handleFilterToggle = () => {
    dispatch(
      setOpenFilter({
        name: "filter",
        module: "PRODUCT",
        isOpen: true,
      })
    );
  };

  const handleClearFilter = () => {
    setFilterActive(false);
    fetchProducts();
  };

  useEffect(() => {
    const handleFilter = async (filterData) => {
      dispatch(
        setOpenFilter({
          name: "",
          module: null,
          isOpen: false,
        })
      );
      const rawFilters = filterData.data.data;
      const cleanedFilters = {};
      for (const key in rawFilters) {
        const value = rawFilters[key];

        if (Array.isArray(value) && value.length > 0 && value[0]?._id) {
          cleanedFilters[key] = value.map((item) => item._id);
        } else {
          cleanedFilters[key] = value;
        }
      }
      setFilterActive(true);
      fetchProducts(cleanedFilters);
    };

    eventBus.on("PRODUCT_FILTER", handleFilter);

    return () => {
      eventBus.off("PRODUCT_FILTER", handleFilter);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="Products"
        description="Displaying all the Products"
        actions={
          <div className="flex gap-2">
            <div className="relative">
              <TextField
                label="Search Products"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                fullWidth
                size="small"
                className="search-input"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchQuery ? (
                        <IconButton onClick={handleClear} size="small">
                          <ClearIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                      ) : (
                        <SearchIcon sx={{ color: "gray", fontSize: "24px" }} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <ActionButton
              buttonText={filterActive ? "Clear Filter" : "Filter"}
              handleOnClick={
                filterActive ? handleClearFilter : handleFilterToggle
              }
              textColor={filterActive ? "#fa1c1c" : "#ffffff"}
              bgColor={filterActive ? "#f7f7f7" : "rgb(41, 82, 255)"}
              icon={filterActive ? clearFilterIcon : filterIcon}
            />
            <ActionButton
              buttonText="Add Product"
              handleOnClick={() => {
                // dispatch(setProductModal(true));
                dispatch(setProductCrud({}));
                dispatch(setMode("add"));
                navigate("/add-product");
              }}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon={createIcon}
            />
          </div>
        }
      />

      {productLoader ? (
        <PageLoader />
      ) : (
        <>
          <div className="mt-4">
            <ProductsList products={products} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchProducts({ page })}
          />
        </>
      )}

      <AddEditProduct getResponseBack={fetchProducts} />
      <DeleteModal handleDelete={handleDelete} />
      <Filters />
    </div>
  );
};

export default Products;
