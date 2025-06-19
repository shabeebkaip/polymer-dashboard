import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getBulkOrderApi } from "../api";
import BulkOrderList from "../components/bulkOrderList";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";

const BulkOrder = () => {
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { bulkOrders } = useSelector((state) => state.requestState);

  const fetchBulkOrders = (query = {}) => {
    setLoading(true);
    dispatch(getBulkOrderApi(query))
      .then((response) => {
        if (response?.success) {
          const paginationData = {
            total: response.total,
            currentPage: response.page,
            totalPages: response.totalPages,
          };
          setPagination(paginationData);
        }
      })
      .catch((error) => {
        console.error("Error fetching bulk orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(setPageTitle("Bulk Order Requests"));
    fetchBulkOrders({ page: 1 });
  }, [dispatch]);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title title="Bulk Order Requests" description="Display all the Bulk Order submissions" />
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="mt-4">
            <BulkOrderList getResponseBack={() => fetchBulkOrders()} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchBulkOrders({ page })}
          />
        </>
      )}
    </div>
  );
};

export default BulkOrder;
