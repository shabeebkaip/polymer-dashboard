import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle, setBestDealModal, setMode, setBestDealCrud } from "../../../slices/sharedSlice";
import { getBestDealApi } from "../api";
import BestDealList from "../components/bestDealList";
import AddEditBestDeal from "../components/addEditBestDeal";
import Title from "../../../shared/Title";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";
import ActionButton from "../../../shared/ActionButton";
import createIcon from "../../../assets/create.svg";
import BestDealModal from "../components/BestDealModal";

const BestDeal = () => {
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentQuery, setCurrentQuery] = useState({ page: 1 });
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
      <Title
        title="Best Deal Requests"
        description="Display all the Best Deal Submissions"
        actions={
          <div className="flex items-center justify-between">
            <ActionButton
              buttonText="Add Best Deal"
              handleOnClick={handleCreateDeal}
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
            <BestDealList bestDeals={bestDeals} getResponseBack={refreshCurrentPage} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchDeals({ page })}
          />
        </>
      )}
      <AddEditBestDeal getResponseBack={refreshCurrentPage} />
      <BestDealModal />
    </div>
  );
};

export default BestDeal;