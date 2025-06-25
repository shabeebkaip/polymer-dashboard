import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getQuoteRequestApi } from "../api";
import QuoteList from "../components/QuoteList";
import QuoteModal from "../components/QuoteModal";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";

const Quote = () => {
  const [quotes, setQuotes] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentQuery, setCurrentQuery] = useState({ page: 1 });

  const dispatch = useDispatch();

  const fetchQuotes = async (query = {}) => {
    setLoading(true);
    setCurrentQuery(query);
    try {
      const response = await dispatch(getQuoteRequestApi(query));
      if (response?.success) {
        const paginationData = {
          total: response.total,
          currentPage: response.page,
          totalPages: response.totalPages,
        };
        setPagination(paginationData);
        setQuotes(response.data);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setPageTitle("Quote Enquiries"));
  }, [dispatch]);

  useEffect(() => {
    fetchQuotes({ page: 1 });
  }, []);

  const refreshCurrentPage = () => {
    fetchQuotes(currentQuery);
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      <Title
        title="Quote Enquiries"
        description="Display all the Quote Requests"
      />

      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="mt-4">
            <QuoteList getResponseBack={refreshCurrentPage} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchQuotes({ page })}
          />
        </>
      )}

      <QuoteModal />
    </div>
  );
};

export default Quote;
