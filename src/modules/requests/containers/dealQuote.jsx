import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getDealQuoteListApi } from "../api";
import DealQuoteList from "../components/dealQuoteList";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";
import DealQuoteModal from "../components/DealQuoteModal";

const DealQuote = () => {
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchDealQuotes = (query = {}) => {
    setLoading(true);
    dispatch(getDealQuoteListApi(query))
      .then((response) => {
        if (response?.success) {
          setPagination({
            total: response.total,
            currentPage: response.page,
            totalPages: response.totalPages,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching deal quotes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(setPageTitle("Deal Quote Requests"));
    fetchDealQuotes({ page: 1 });
  }, [dispatch]);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="grid gap-4">
            <Title
              title="Deal Quote Requests"
              description="Display all the Deal Quote Requests"
            />
            <DealQuoteList getResponseBack={() => fetchDealQuotes()} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchDealQuotes({ page })}
          />
        </>
      )}
      <DealQuoteModal />
    </div>
  );
};

export default DealQuote;
