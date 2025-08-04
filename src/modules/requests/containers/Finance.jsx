import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getFinanceRequestApi } from "../api";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";
import FinanceList from "../components/FinanceList";
import FinanceModal from "../components/FinanceModal";

const Finance = () => {
  const [finances, setFinances] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchFinances = (query = {}) => {
    setLoading(true);
    dispatch(getFinanceRequestApi(query))
      .then((response) => {
        if (response?.success) {
          const paginationData = {
            total: response.total,
            currentPage: response.page,
            totalPages: response.totalPages,
          };
          setPagination(paginationData);
          setFinances(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching finances:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(setPageTitle("Finance Enquiries"));
  }, [dispatch]);

  useEffect(() => {
    fetchFinances({ page: 1 });
  }, []);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="grid gap-4">
            <Title
              title="Finance Enquiries"
              description="Manage and view all finance-related enquiries."
            />
            <FinanceList
              finances={finances}
              getResponseBack={() => fetchFinances()}
            />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchFinances({ page })}
          />
        </>
      )}
      <FinanceModal />
    </div>
  );
};

export default Finance;
