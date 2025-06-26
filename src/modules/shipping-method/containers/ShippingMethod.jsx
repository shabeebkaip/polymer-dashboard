import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModal,
  setDeleteId,
  setLoader,
  setMode,
  setPageTitle,
  setShippingMethodCrud,
  setShippingMethodModal,
} from "../../../slices/sharedSlice";
import { enqueueSnackbar } from "notistack";

import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import AddEditShippingMethod from "../components/AddEditShippingMethod";
import DeleteModal from "../../../shared/DeleteModal";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";
import createIcon from "../../../assets/create.svg";
import ShippingMethodList from "../components/shippingMethodList";
import { deleteShippingMethodApi, getShippingMethodApi } from "../api";

const ShippingMethod = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { loader, shippingMethodModal, deleteId } = useSelector(
    (state) => state.sharedState
  );

  const fetchData = useCallback((query = { page: 1 }) => {
    setLoading(true);
    dispatch(getShippingMethodApi(query))
      .then((res) => {
        if (res?.success) {
          setShippingMethods(res.data);
          setPagination({
            total: res.pagination.totalItems,
            currentPage: res.pagination.currentPage,
            totalPages: res.pagination.totalPages,
          });
        }
      })
      .catch((err) => console.error("Error fetching shipping methods:", err))
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Shipping Method"));
    fetchData();
  }, [dispatch, fetchData]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    deleteShippingMethodApi(deleteId)
      .then((res) => {
        if (res.success) {
          dispatch(setDeleteModal(false));
          enqueueSnackbar(res.message, { variant: "success" });
        }
      })
      .catch((err) => {
        console.error("Error deleting shipping method:", err);
      })
      .finally(() => {
        dispatch(setLoader(false));
        fetchData();
      });
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="Shipping Method"
        description="Displaying all shipping methods"
        actions={
          <ActionButton
            buttonText="Add Shipping Method"
            handleOnClick={() => {
              dispatch(setShippingMethodModal(true));
              dispatch(setShippingMethodCrud({}));
              dispatch(setMode("add"));
            }}
            textColor="#fff"
            bgColor="rgb(41, 82, 255)"
            icon={createIcon}
          />
        }
      />
      {loader || loading ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <ShippingMethodList data={shippingMethods} />
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchData({ page })}
          />
        </div>
      )}
      <AddEditShippingMethod getResponseBack={fetchData} />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default ShippingMethod;
