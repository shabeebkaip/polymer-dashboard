import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getBulkOrderApi } from "../api";
import BulkOrderList from "../components/bulkOrderList";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";
import ActionButton from "../../../shared/ActionButton";
import createIcon from "../../../assets/create.svg";
import AddEditBulkOrder from "../components/addEditBulkOrder";
import { setBulkOrderModal, setMode, setBulkOrderCrud } from "../../../slices/sharedSlice";
import BulkOrderModal from "../components/BulkOrderModal";

const BulkOrder = () => {
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentQuery, setCurrentQuery] = useState({ page: 1 });
  const dispatch = useDispatch();

  const fetchBulkOrders = async (query = {}) => {
    setLoading(true);
    setCurrentQuery(query);
    
    try {
      const response = await dispatch(getBulkOrderApi(query));
      if (response?.success) {
        setPagination({
          total: response.total,
          currentPage: response.page,
          totalPages: response.totalPages,
        });
      }
    } catch (error) {
      console.error("Error fetching bulk orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCurrentPage = () => {
    return fetchBulkOrders(currentQuery);
  };

  const handleCreateOrder = () => {
    dispatch(setBulkOrderModal(true));
    dispatch(setMode("add"));
    dispatch(setBulkOrderCrud({}));
  };

  useEffect(() => {
    dispatch(setPageTitle("Bulk Order Requests"));
    fetchBulkOrders({ page: 1 });
  }, [dispatch]);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="Bulk Order Requests"
        description="Display all the Bulk Order submissions"
        actions={
          <div className="flex items-center justify-between">
            <ActionButton
              buttonText="Add Bulk Order"
              handleOnClick={handleCreateOrder}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon={createIcon}
            />
          </div>
        }
      />
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="mt-4">
            <BulkOrderList getResponseBack={refreshCurrentPage} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchBulkOrders({ page })}
          />
        </>
      )}
      <AddEditBulkOrder getResponseBack={refreshCurrentPage} />
      <BulkOrderModal />
    </div>
  );
};

export default BulkOrder;