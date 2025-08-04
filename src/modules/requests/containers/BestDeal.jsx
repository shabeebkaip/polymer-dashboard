import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageTitle,
  setBestDealModal,
  setMode,
  setBestDealCrud,
} from "../../../slices/sharedSlice";
import { getBestDealApi } from "../api";
import BestDealList from "../components/bestDealList";
import AddEditBestDeal from "../components/AddEditBestDeal";
import Title from "../../../shared/Title";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";
import ActionButton from "../../../shared/ActionButton";
import createIcon from "../../../assets/create.svg";
// import BestDealModal from "../components/BestDealModal";

const BestDeal = () => {
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentQuery, setCurrentQuery] = useState({ page: 1 });
  const [refreshKey, setRefreshKey] = useState(0);
  const dispatch = useDispatch();
  const { bestDeals } = useSelector((state) => state.requestState);

  const fetchDeals = async (query = {}) => {
    setLoading(true);
    setCurrentQuery(query);

    try {
      const response = await dispatch(getBestDealApi(query));
      if (response?.success) {
        setPagination({
          total: response.total,
          currentPage: response.page,
          totalPages: response.totalPages,
        });
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching best deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCurrentPage = () => {
    return fetchDeals(currentQuery);
  };

  const handleCreateDeal = () => {
    dispatch(setBestDealModal(true));
    dispatch(setMode("add"));
    dispatch(setBestDealCrud({}));
  };

  useEffect(() => {
    dispatch(setPageTitle("Best Deal Requests"));
    fetchDeals({ page: 1 });
  }, [dispatch]);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <div className="rounded-xl shadow-lg backdrop-blur-md mb-8">
        <Title
          title="Best Deal Requests"
          description="Display all the Best Deal Submissions"
          actions={
            <div className="flex items-center justify-between">
              <ActionButton
                buttonText="Add Best Deal"
                handleOnClick={handleCreateDeal}
                textColor="#fff"
                bgColor="#10B981"
                borderColor="#10B981"
                icon={createIcon}
                className="rounded-lg shadow-md font-semibold px-5 py-2 transition-all duration-200"
              />
            </div>
          }
        />
        {loading ? (
          <PageLoader message="Loading Best Deals..." />
        ) : (
          <>
            <div className="mt-4">
              <BestDealList
                key={refreshKey}
                bestDeals={bestDeals}
                getResponseBack={refreshCurrentPage}
              />
            </div>
            <PaginationContainer
              totalPages={pagination?.totalPages}
              currentPage={pagination?.currentPage}
              handlePageChange={(page) => fetchDeals({ page })}
            />
          </>
        )}
      </div>
      <AddEditBestDeal getResponseBack={refreshCurrentPage} />
      {/* <BestDealModal /> */}
    </div>
  );
};

export default BestDeal;
