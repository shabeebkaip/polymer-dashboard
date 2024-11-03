import { useEffect, useState } from "react";
import Title from "../../../shared/Title";
import UserList from "../components/UserList";
import { getUsersApi } from "../api";
import PaginationContainer from "../../../shared/PaginationContainer";
import PageLoader from "../../../shared/PageLoader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = (query) => {
    setLoading(true);
    getUsersApi(query).then((response) => {
      setLoading(false);
      if (response.success) {
        setUsers(response.data);
        setPagination(response.pagination);
      } else {
        console.log("Error While Fetching Users");
      }
    });
  };
  return (
    <div>
      {loading && <PageLoader />}
      <Title
        title="Users"
        description={
          "A comprehensive list of all registered users within the system."
        }
      />
      <UserList users={users} getResponseBack={() => fetchUsers()} />
      <PaginationContainer
        totalPages={pagination?.totalPages}
        currentPage={pagination?.currentPage}
        handlePageChange={(page) => fetchUsers({ page })}
      />
    </div>
  );
};

export default Users;
