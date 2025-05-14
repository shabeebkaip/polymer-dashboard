import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setFinance, setModal } from "../../../slices/requestSlice";
import { useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { enqueueSnackbar } from "notistack"; 
import { PatchFinanceApi } from "../api";

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
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
  },
}));

const FinanceRow = ({ isLastRow, finance, index, getResponseBack }) => {
  const dispatch = useDispatch();

  const [localStatus, setLocalStatus] = useState(
    finance?.status?.toLowerCase() === "approved"
  );

  const handleStatusUpdate = (financeId, newStatus) => {
    setLocalStatus(newStatus);

    const payload = { status: newStatus ? "approved" : "rejected" };

    PatchFinanceApi(financeId, payload).then((response) => {
      if (response?.success) {
        debugger
        enqueueSnackbar(response.message, {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        
        getResponseBack(); 
      }
    });
  };

  return (
    <TableRow isLastRow={isLastRow} index={index}>
      <td className="p-4">{finance?.userId?.name}</td>
      <td className="p-4">{finance?.productId?.productName}</td>
      <td>{finance?.emiMonths}</td>
      <td>{finance.quantity}</td>
      <td>{finance?.estimatedPrice}</td>

      <td>
        {new Date(finance?.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className="max-w-[200px] truncate">{finance?.status}</td>

      <td>
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setFinance(finance));
          }}
        />
      </td>

      <td className="px-4">
        <FormControlLabel
          control={
            <IOSSwitch
              checked={localStatus}
              onChange={(e) =>
                handleStatusUpdate(finance?._id, e.target.checked)
              }
            />
          }
         
        />
      </td>
    </TableRow>
  );
};

FinanceRow.propTypes = {
  isLastRow: PropTypes.bool.isRequired,
  finance: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default FinanceRow;
