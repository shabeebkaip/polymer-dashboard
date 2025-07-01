import { useCallback, useEffect, useState } from "react";
import { deleteProductApi, getProductsApi, getProductFiltersApi } from "../api";
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
import { IconButton, InputAdornment, TextField, Chip, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PaginationContainer from "../../../shared/PaginationContainer";
import createIcon from '../../../assets/create.svg';
import FilterSidebar from "../components/FilterSidebar"; 

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({});
  const [filterActive, setFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({ filterSide: [], filterTop: [] });
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); 

  const { products, productLoader } = useSelector(
    (state) => state.productState
  );
  const { deleteId } = useSelector((state) => state.sharedState);

  // Calculate active filter count
  const calculateActiveFilters = useCallback((filters) => {
    let count = 0;
    Object.keys(filters).forEach(key => {
      if (key === 'search' || key === 'page' || key === 'limit') return;
      const value = filters[key];
      if (Array.isArray(value) && value.length > 0) {
        count += value.length;
      } else if (typeof value === 'boolean' || (typeof value === 'string' && value !== '')) {
        count += 1;
      }
    });
    return count;
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const newFilters = { ...currentFilters, search: value };
    setCurrentFilters(newFilters);
    fetchProducts(newFilters);
  };

  const handleClear = () => {
    setSearchQuery("");
    const newFilters = { ...currentFilters };
    delete newFilters.search;
    setCurrentFilters(newFilters);
    fetchProducts(newFilters);
  };

  // Fetch filter options
  const fetchFilterOptions = useCallback(async (filters = {}) => {
    try {
      const response = await getProductFiltersApi(filters);
      if (response && response.filterSide && response.filterTop) {
        setFilterOptions({
          filterSide: response.filterSide,
          filterTop: response.filterTop
        });
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  }, []);

  const fetchProducts = useCallback(
    async (filters = {}) => {
      dispatch(setPageTitle("Products"));
      dispatch(setProductLoader(true));
      
      try {
        // Fetch both products and updated filter options
        const [productsResponse] = await Promise.all([
          getProductsApi(filters),
          fetchFilterOptions(filters)
        ]);

        dispatch(setProductLoader(false));
        
        if (productsResponse.success) {
          dispatch(setProducts(productsResponse.data));
          const paginationData = {
            total: productsResponse.pagination.total,
            currentPage: productsResponse.pagination.page,
            totalPages: productsResponse.pagination.totalPages,
          };
          setPagination(paginationData);
        }
      } catch (error) {
        dispatch(setProductLoader(false));
        console.error("Error fetching products:", error);
      }
    },
    [dispatch, fetchFilterOptions]
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
          fetchProducts(currentFilters);
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

  // Updated filter toggle to open sidebar
  const handleFilterToggle = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleClearFilter = () => {
    setFilterActive(false);
    setCurrentFilters({});
    setActiveFilterCount(0);
    setSearchQuery("");
    setIsFilterSidebarOpen(false);
    fetchProducts();
  };

  // Handle filter application from sidebar
  const handleFilterApply = (filters) => {
    const cleanedFilters = {};
    
    // Add search if it exists
    if (searchQuery) {
      cleanedFilters.search = searchQuery;
    }
    
    // Process filters
    for (const key in filters) {
      const value = filters[key];
      if (Array.isArray(value) && value.length > 0) {
        cleanedFilters[key] = value;
      } else if (typeof value === 'boolean' || (typeof value === 'string' && value !== '')) {
        cleanedFilters[key] = value;
      }
    }
    
    setCurrentFilters(cleanedFilters);
    const activeCount = calculateActiveFilters(cleanedFilters);
    setActiveFilterCount(activeCount);
    setFilterActive(activeCount > 0 || searchQuery !== '');
    fetchProducts(cleanedFilters);
  };

  // Handle filter removal
  const handleFilterRemove = (filterKey, filterValue = null) => {
    const newFilters = { ...currentFilters };
    
    if (filterValue === null) {
      // Remove entire filter
      delete newFilters[filterKey];
    } else {
      // Remove specific value from array filter
      if (Array.isArray(newFilters[filterKey])) {
        newFilters[filterKey] = newFilters[filterKey].filter(item => item !== filterValue);
        if (newFilters[filterKey].length === 0) {
          delete newFilters[filterKey];
        }
      }
    }
    
    setCurrentFilters(newFilters);
    const activeCount = calculateActiveFilters(newFilters);
    setActiveFilterCount(activeCount);
    setFilterActive(activeCount > 0 || searchQuery !== '');
    fetchProducts(newFilters);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    const newFilters = { ...currentFilters, page };
    fetchProducts(newFilters);
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
      
      handleFilterApply(cleanedFilters);
    };

    eventBus.on("PRODUCT_FILTER", handleFilter);

    return () => {
      eventBus.off("PRODUCT_FILTER", handleFilter);
    };
  }, []);

  // Get display name for filter
  const getFilterDisplayName = (key, value) => {
    const allFilters = [...filterOptions.filterSide, ...filterOptions.filterTop];
    const filterConfig = allFilters.find(f => f.name === key);
    
    if (!filterConfig) return value;
    
    if (filterConfig.data) {
      const option = filterConfig.data.find(item => 
        item._id === value || item._id === value.toString()
      );
      return option ? option.name : value;
    }
    
    return value;
  };

  // Render active filter chips
  const renderActiveFilters = () => {
    const chips = [];
    
    Object.keys(currentFilters).forEach(key => {
      if (key === 'search' || key === 'page' || key === 'limit') return;
      
      const value = currentFilters[key];
      const allFilters = [...filterOptions.filterSide, ...filterOptions.filterTop];
      const filterConfig = allFilters.find(f => f.name === key);
      
      if (!filterConfig) return;
      
      if (Array.isArray(value)) {
        value.forEach(val => {
          chips.push(
            <Chip
              key={`${key}-${val}`}
              label={`${filterConfig.displayName}: ${getFilterDisplayName(key, val)}`}
              onDelete={() => handleFilterRemove(key, val)}
              size="small"
              variant="outlined"
              sx={{ margin: 0.5 }}
            />
          );
        });
      } else if (typeof value === 'boolean') {
        chips.push(
          <Chip
            key={key}
            label={`${filterConfig.displayName}: ${value ? 'Yes' : 'No'}`}
            onDelete={() => handleFilterRemove(key)}
            size="small"
            variant="outlined"
            sx={{ margin: 0.5 }}
          />
        );
      }
    });
    
    return chips;
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow md:flex-row md:items-center md:justify-between">
  {/* Search Field */}
  <div className="w-full md:max-w-md">
    <TextField
      label="Search Products"
      variant="outlined"
      value={searchQuery}
      onChange={handleSearch}
      fullWidth
      size="small"
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

  {/* Buttons */}
  <div className="flex gap-2">
    <ActionButton
      buttonText={
        filterActive 
          ? `Clear Filter${activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}` 
          : "Filter"
      }
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
        dispatch(setProductCrud({}));
        dispatch(setMode("add"));
        navigate("/add-product");
      }}
      textColor="#ffffff"
      bgColor="rgb(41, 82, 255)"
      icon={createIcon}
    />
  </div>
</div>


      {/* Active Filters Display */}
      {(filterActive || activeFilterCount > 0) && (
        <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1, margin: '16px 0' }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Active Filters:</span>
            {renderActiveFilters()}
            {(filterActive || activeFilterCount > 0) && (
              <Chip
                label="Clear All"
                onClick={handleClearFilter}
                size="small"
                color="error"
                variant="outlined"
                sx={{ margin: 0.5 }}
              />
            )}
          </div>
        </Box>
      )}

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
            handlePageChange={handlePageChange}
          />
        </>
      )}

      {/* Filter Sidebar Component */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filterOptions={filterOptions}
        onFilterApply={handleFilterApply}
        currentFilters={currentFilters}
      />

      <AddEditProduct getResponseBack={() => fetchProducts(currentFilters)} />
      <DeleteModal handleDelete={handleDelete} />
      <Filters />
    </div>
  );
};

export default Products;