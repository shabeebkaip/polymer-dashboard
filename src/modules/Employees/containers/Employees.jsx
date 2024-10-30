import PaginationContainer from "../../../shared/PaginationContainer";
import Title from "../../../shared/Title";
import { Actions, EmployeesList, SearchBar } from "../components";

const Employees = () => {
  return (
    <div>
      <Title
        title="Employees"
        description="Displaying all employees currently assigned to the BTC department, including their Employee ID, Name, and Email for quick reference."
      />
      <div className="flex items-center justify-between p-1 mt-4 bg-white rounded-full shadow ">
        <SearchBar />
        <Actions />
      </div>
      <EmployeesList />
      <PaginationContainer />
    </div>
  );
};

export default Employees;
