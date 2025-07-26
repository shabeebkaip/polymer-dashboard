import { Tooltip, Switch, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { enqueueSnackbar } from "notistack";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { PatchUserApi } from "../api";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 2,
    transition: theme.transitions.create(["transform"], { duration: 300 }),
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    transition: theme.transitions.create(["transform"], { duration: 300 }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 13,
    opacity: 1,
    backgroundColor: "#E9E9EA",
    boxSizing: "border-box",
    transition: theme.transitions.create(["background-color"], { duration: 300 }),
  },
}));

const UserList = ({ users, getResponseBack }) => {
  const [localStatus, setLocalStatus] = useState({});

  useEffect(() => {
    const statusMap = {};
    users.forEach((user) => {
      statusMap[user._id] = user.verification;
    });
    setLocalStatus(statusMap);
  }, [users]);

  const handleStatusUpdate = (userId, newStatus) => {
    setLocalStatus((prev) => ({ ...prev, [userId]: newStatus }));

    const payload = { verification: newStatus };
    PatchUserApi(userId, payload).then((response) => {
      if (response?.success) {
        enqueueSnackbar(response.message, {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        getResponseBack();
      }
    });
  };

  const tableHeader = [
    "SL No",
    "Name",
    "Email",
    "Company",
    ...(users.some((user) => user?.company_logo) ? ["Company Logo"] : []),
    "Status",
    "Verification",
  ];

  return (
    <div className="mt-4">
      <div className="rounded-xl shadow-lg border border-emerald-200 bg-white/80 backdrop-blur-md p-6">
        <table className="w-full border-separate" style={{ borderSpacing: "0 12px" }}>
          <thead>
            <tr className="sticky top-0 z-20 bg-white">
              {tableHeader.map((head, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left border-b h-[56px] font-semibold align-middle whitespace-nowrap"
                  style={{ color: "#263238", fontSize: "16px", fontWeight: "500", background: "#fff" }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          {users.length > 0 ? (
            <tbody>
              {users.map((row, index) => {
                const isLastRow = index === users.length - 1;
                return (
                  <tr
                    key={row._id}
                    className={`transition-colors duration-200 border-b ${index % 2 === 1 ? "bg-white/60" : "bg-emerald-50/40"} ${isLastRow ? "border-b-emerald-400 border-b-2" : "border-b-gray-200"}`}
                  >
                    <td className="px-6 py-4 border-b text-gray-700 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 capitalize border-b text-emerald-900 font-semibold">{row.name}</td>
                    <td className="px-6 py-4 border-b text-gray-700">{row.email}</td>
                    <td className="px-6 py-4 border-b text-gray-700">{row.company || "—"}</td>
                    {row?.company_logo && (
                      <td className="px-6 py-4 border-b">
                        <img src={row.company_logo} className="w-14 h-14 object-cover rounded-lg border border-emerald-200 shadow-sm bg-white" />
                      </td>
                    )}
                    <td className="px-6 py-4 border-b text-emerald-700 font-bold capitalize">{localStatus[row._id]}</td>
                    <td className="px-6 py-4 border-b">
                      <div className="flex items-center gap-3 justify-center">
                        <Tooltip title="Toggle status" arrow>
                          <FormControlLabel
                            control={
                              <IOSSwitch
                                checked={localStatus[row._id] === "approved"}
                                onChange={(e) =>
                                  handleStatusUpdate(
                                    row._id,
                                    e.target.checked ? "approved" : "pending"
                                  )
                                }
                              />
                            }
                            label=""
                          />
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
                <td colSpan={7}>
                  <div className="flex justify-center w-full p-6 text-center text-gray-400 text-base font-semibold">
                    No data available
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
  getResponseBack: PropTypes.func,
};

export default UserList;
