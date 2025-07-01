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
  const dispatch = useDispatch();

  const fetchQuotes = (query = {}) => {
    setLoading(true);
    dispatch(getQuoteRequestApi(query))
      .then((response) => {
        if (response?.success) {
          const paginationData = {
            total: response.total,
            currentPage: response.page,
            totalPages: response.totalPages,
          };
          setPagination(paginationData);
          setQuotes(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(setPageTitle("Quote Enquiries"));
  }, [dispatch]);

  useEffect(() => {
    fetchQuotes({ page: 1 });
  }, []);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      {loading ? <PageLoader />
        :
        <>
          <div className="mt-4">
            <QuoteList data={quotes} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchQuotes({ page })}
          />
        </>
      }

      <QuoteModal />
    </div>
  );
};

export default Quote;
