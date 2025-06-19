import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setBestDeal } from "../../../slices/requestSlice";
import { FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { PatchBestDealApi } from "../api";

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

const BestDealRow = ({ deal, index, isLastRow, getResponseBack }) => {
  const dispatch = useDispatch();
  const [localStatus, setLocalStatus] = useState(
    deal?.status?.toLowerCase() === "approved"
  );

  const handleStatusUpdate = async (dealId, isApproved) => {
    const payload = { status: isApproved ? "approved" : "rejected" };

    try {
      const res = await PatchBestDealApi(dealId, payload);
      if (res?.message) {
        enqueueSnackbar(res.message || `Best deal ${payload.status}`, {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        setLocalStatus(isApproved);
        getResponseBack();
      } else {
        enqueueSnackbar(res.message || "Update failed", {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        setLocalStatus(!isApproved);
      }
    } catch (error) {
      enqueueSnackbar("Error updating status", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      setLocalStatus(!isApproved);
    }
  };

  const getSellerName = (seller) => {
    if (!seller) return "N/A";
    return `${seller.firstName || ""} ${seller.lastName || ""}`.trim() || "N/A";
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{deal?.productId?.productName || "N/A"}</td>
      <td className="p-4">{deal?.offerPrice || "N/A"}</td>
      <td className="p-4">{getSellerName(deal?.sellerId)}</td>
      <td className="p-4">{deal?.sellerId?.email || "N/A"}</td>
      <td className="p-4">{deal?.status || "N/A"}</td>
      <td className="p-4">
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setBestDeal(deal));
          }}
        />
      </td>
      <td className="p-4 px-8">
        <FormControlLabel
          control={
            <IOSSwitch
              checked={localStatus}
              onChange={(e) =>
                handleStatusUpdate(deal?._id, e.target.checked)
              }
            />
          }
        />
      </td>
    </TableRow>
  );
};

BestDealRow.propTypes = {
  deal: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default BestDealRow;
