import { useEffect, useState } from "react";
import Title from "../../../shared/Title";
import UserList from "../components/UserList";
import { getUsersApi } from "../api";
import PaginationContainer from "../../../shared/PaginationContainer";
import PageLoader from "../../../shared/PageLoader";
import { setPageTitle } from "../../../slices/sharedSlice";
import { useDispatch } from "react-redux";

const Sellers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = (query) => {
    setLoading(true);
    dispatch(setPageTitle("Sellers List"));
    const updatedQuery = { ...query, type: 'seller' };
    getUsersApi(updatedQuery).then((response) => {
      setLoading(false);
      if (response.success) {
        const processedUsers = response.data.map(seller => ({
          ...seller,
          company: seller.company,
          company_logo: seller.company_logo,
          products: seller.products || []
        }));
        
        setUsers(processedUsers);

        const paginationData = {
          total: response.total,
          currentPage: response.page,
          totalPages: response.totalPages,
        };
        setPagination(paginationData);
      } else {
        console.log("Error While Fetching Users");
      }
    });
  };

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <UserList users={users} getResponseBack={() => fetchUsers()} />
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchUsers({ page })}
          />
        </>
      )}
    </div>
  );
};

export default Sellers;