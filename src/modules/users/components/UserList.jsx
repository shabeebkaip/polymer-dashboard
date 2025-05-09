import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import deleteIcon from "../../../assets/actions/delete.svg";
import { enqueueSnackbar } from "notistack";
import UpdateStatusModal from "./UpdateStatusModal";
import { PatchUserApi } from "../api";
import MoreVertIcon from "@mui/icons-material/MoreVert";
  const UserList = ({ users, getResponseBack }) => {
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const allowedStatuses = ["pending", "approved", "rejected"];
  const handleStatusUpdate = (status) => {
    const payload = { verification: status };
    PatchUserApi(selectedUserId, payload).then((response) => {
      if (response?.success) {
        enqueueSnackbar(response.message, {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        }); 
        getResponseBack();
      }
      setStatusModalOpen(false);
      setSelectedUserId(null);
    });
  };
  
  const tableHeader = ["SL No", "Name", "Email","User Type", "Status" , "Action"];
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
        {users.length > 0 ? (
          <tbody>
            {users.map((row, index) => {
              const isLastRow = index === users?.length - 1;
              return (
                <tr
                  key={index}
                  className={` ${
                    index % 2 === 1 ? "glass-card" : "dark-glass"
                  } ${isLastRow ? "border-b-[3px]" : ""}`}
                >
                  <td className="p-4 border-b ">{index + 1}</td>
                  <td className="p-4 capitalize border-b">{row.name}</td>
                  <td className="p-4 border-b">{row.email}</td>
                  <td className="p-4 border-b">{row.user_type}</td>
                  <td className="p-4 border-b">{row.verification}</td>
                  <td className="p-4 border-b ">
                    <div className="flex items-center gap-4 ">
                      <Tooltip title="Update status" arrow>
                      <button
                          className="btn"
                          onClick={() => {
                            setStatusModalOpen(true);
                            setSelectedUserId(row._id);
                          }}
                        >
                          <MoreVertIcon/>
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tfoot>
            <tr>
              <td colSpan={users?.length || 1}>
                <div className="flex justify-center w-full p-4 text-center text-gray-500">
                  No data available
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      <UpdateStatusModal
  open={statusModalOpen}
  onClose={() => setStatusModalOpen(false)}
  onConfirm={handleStatusUpdate}
  allowedStatuses={allowedStatuses}
/>
    </div>
  );
};
UserList.propTypes = {
  users: PropTypes.array,
  getResponseBack: PropTypes.func,
};
export default UserList;
