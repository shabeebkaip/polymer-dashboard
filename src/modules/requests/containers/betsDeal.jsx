import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import { getBestDealApi } from "../api";
import BestDealList from "../components/BestDealList";
import Title from "../../../shared/Title";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";

const BestDeal = () => {
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [bestDeals, setBestDeals] = useState([]);
  const dispatch = useDispatch();

  const fetchDeals = (query = {}) => {
    setLoading(true);
    dispatch(getBestDealApi(query))
      .then((response) => {
        if (response?.success) {
          setPagination({
            total: response.total,
            currentPage: response.page,
            totalPages: response.totalPages,
          });
          setBestDeals(response.data);
        }
      })
      .catch((err) => console.error("Error fetching best deals:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    dispatch(setPageTitle("Best Deal Requests"));
    fetchDeals({ page: 1 });
  }, [dispatch]);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title title="Best Deal Requests" description="Display all the Best Deal Submissions" />
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="mt-4">
            <BestDealList bestDeals={bestDeals} getResponseBack={() => fetchDeals()} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchDeals({ page })}
          />
        </>
      )}
    </div>
  );
};

export default BestDeal;
