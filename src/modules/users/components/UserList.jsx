import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import deleteIcon from "../../../assets/actions/delete.svg";
import DeleteModal from "../../../shared/DeleteModal";
import { enqueueSnackbar } from "notistack";
import { deleteUserApi } from "../api";
const UserList = ({ users, getResponseBack }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = (id) => {
    deleteUserApi(id).then((response) => {
      if (response.success) {
        enqueueSnackbar(response.message, {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        getResponseBack();
        setDeleteModal(false);
      }
    });
  };
  const tableHeader = ["SL No", "Name", "Email", "Action"];
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
                  <td className="p-4 border-b ">
                    <div className="flex items-center gap-4 ">
                      <Tooltip title="Delete" arrow>
                        <button
                          className="btn"
                          onClick={() => {
                            setDeleteModal(true);
                            setDeleteId(row._id);
                          }}
                        >
                          <img src={deleteIcon} alt="Delete" />
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
      <DeleteModal
        open={deleteModal}
        closeModal={() => {
          setDeleteId(null);
          setDeleteModal(false);
        }}
        handleDelete={() => handleDelete(deleteId)}
      />
    </div>
  );
};
UserList.propTypes = {
  users: PropTypes.array,
  getResponseBack: PropTypes.func,
};
export default UserList;
