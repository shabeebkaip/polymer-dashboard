import editIcon from "../../../assets/actions/edit.svg";
import deleteIcon from "../../../assets/actions/delete.svg";
import moment from "moment";

const EmployeesList = () => {
  const tableHeader = [
    "Employee ID",
    "Name",
    "Email",
    "Phone",
    "Role",
    "Nationality",
    "DOB",
    "Gender",
    "Actions",
  ];
  const dummyData = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      role: "Developer",
      nationality: "American",
      dob: "1990-01-01",
      gender: "Male",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "098-765-4321",
      role: "Designer",
      nationality: "British",
      dob: "1985-05-15",
      gender: "Female",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Sam Johnson",
      email: "sam.johnson@example.com",
      phone: "555-555-5555",
      role: "Manager",
      nationality: "Canadian",
      dob: "1978-11-30",
      gender: "Male",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Alice Brown",
      email: "alice.brown@example.com",
      phone: "321-654-0987",
      role: "Tester",
      nationality: "Australian",
      dob: "1992-07-21",
      gender: "Female",
    },
    {
      id: 5,
      employeeId: "EMP005",
      name: "Bob White",
      email: "bob.white@example.com",
      phone: "213-546-8790",
      role: "Support",
      nationality: "American",
      dob: "1988-03-12",
      gender: "Male",
    },
    {
      id: 6,
      employeeId: "EMP006",
      name: "Charlie Green",
      email: "charlie.green@example.com",
      phone: "789-123-4567",
      role: "HR",
      nationality: "British",
      dob: "1983-09-25",
      gender: "Male",
    },
    {
      id: 7,
      employeeId: "EMP007",
      name: "Diana Prince",
      email: "diana.prince@example.com",
      phone: "456-789-0123",
      role: "CEO",
      nationality: "Canadian",
      dob: "1975-12-14",
      gender: "Female",
    },
    {
      id: 8,
      employeeId: "EMP008",
      name: "Eve Adams",
      email: "eve.adams@example.com",
      phone: "654-321-0987",
      role: "CFO",
      nationality: "American",
      dob: "1980-06-30",
      gender: "Female",
    },
    {
      id: 9,
      employeeId: "EMP009",
      name: "Frank Black",
      email: "frank.black@example.com",
      phone: "987-654-3210",
      role: "CTO",
      nationality: "Australian",
      dob: "1972-04-18",
      gender: "Male",
    },
    {
      id: 10,
      employeeId: "EMP010",
      name: "Grace Lee",
      email: "grace.lee@example.com",
      phone: "123-789-4560",
      role: "COO",
      nationality: "British",
      dob: "1986-11-05",
      gender: "Female",
    },
  ];

  const data = { data: dummyData };
  return (
    <div className="mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr
            className="bg-white "
            style={{
              position: "sticky",
              top: "0",
              zIndex: 2,
            }}
          >
            {tableHeader?.map((head, index) => (
              <th
                key={index}
                className={`p-4 text-left border-b h-[20px] font-semibold w-fit `}
                style={{
                  color: "#263238",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        {data && data.data && data.data.length > 0 ? (
          <tbody>
            {data.data.map((row, index) => {
              const isLastRow = index === data.data.length - 1;
              //   const isSelected = selectedRows.includes(row.id);

              return (
                <tr
                  key={index}
                  className={` ${ 
                    index % 2 === 1 ? "glass-card" : "dark-glass"
                  } ${isLastRow ? "border-b-[3px]" : ""}`}
                >
                  <td className="p-4 border-b">{row.employeeId}</td>
                  <td className="p-4 border-b">{row.name}</td>
                  <td className="p-4 border-b">{row.email}</td>
                  <td className="p-4 border-b">{row.phone}</td>
                  <td className="p-4 border-b">{row.role}</td>
                  <td className="p-4 border-b">{row.nationality}</td>
                  <td className="p-4 border-b">{moment(row.dob).format('MMM DD YYYY')}</td>
                  <td className="p-4 border-b">{row.gender}</td>
                  <td className="p-4 border-b ">
                    <div className="flex items-center gap-4 ">
                      <button className="btn">
                        <img src={editIcon} alt="Edit" />
                      </button>
                      <button className="btn">
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tfoot>
            <tr>
              <td colSpan={data?.tableHeader?.length || 1}>
                <div className="flex justify-center w-full p-4 text-center text-gray-500">
                  No data available
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default EmployeesList;
