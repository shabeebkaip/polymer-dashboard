import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import EditAction from "../../../shared/EditAction";
import { useDispatch } from "react-redux";
import { setModal, setBestDeal } from "../../../slices/requestSlice";
import {
  setBestDealCrud,
  setBestDealModal,
  setMode,
} from "../../../slices/sharedSlice";
import { FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
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
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLocalStatus(deal?.status?.toLowerCase() === "approved");
  }, [deal?.status]);

const handleStatusUpdate = async (dealId, isApproved) => {
  if (isUpdating) return;

  const payload = { status: isApproved ? "approved" : "rejected" };

  setLocalStatus(isApproved);
  setIsUpdating(true);

  try {
    const res = await PatchBestDealApi(dealId, payload);

    console.log("API PATCH Response:", res);

    const wasSuccessful =
      res?.success === true || res?.message?.toLowerCase()?.includes("success");

    if (wasSuccessful) {
      enqueueSnackbar(
        res.message || `Best deal ${payload.status} successfully.`,
        {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        }
      );

      if (getResponseBack) {
        getResponseBack();
      }
    } else {
      setLocalStatus(!isApproved);
      enqueueSnackbar(res?.message || "Failed to update best deal.", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    }
  } catch (error) {
    console.error("Patch error:", error);
    setLocalStatus(!isApproved);
    enqueueSnackbar("Something went wrong while updating the status.", {
      variant: "error",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
  } finally {
    setIsUpdating(false);
  }
};

  const getSellerName = (seller) => {
    if (!seller) return "N/A";
    const fullName = `${seller.firstName || ""} ${seller.lastName || ""}`.trim();
    return fullName || seller.name || "N/A";
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{deal?.productId?.productName || "—"}</td>
      <td className="p-4">${deal?.offerPrice || "—"}</td>
      <td className="p-4">{getSellerName(deal?.sellerId)}</td>
      <td className="p-4">{deal?.sellerId?.email || "—"}</td>
      <td className="p-4">{localStatus ? "approved" : "rejected"}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <ViewAction
            handleClick={() => {
              dispatch(setModal(true));
              dispatch(setBestDeal(deal));
            }}
          />
          <EditAction
            handleClick={() => {
              dispatch(setBestDealModal(true));
              dispatch(setMode("edit"));
              dispatch(setBestDealCrud(deal));
            }}
          />
        </div>
      </td>
      <td className="p-4 px-8">
        <FormControlLabel
          control={
            <IOSSwitch
              checked={localStatus}
              disabled={isUpdating}
              onChange={(e) =>
                handleStatusUpdate(deal?._id, e.target.checked)
              }
            />
          }
          label=""
          sx={{ margin: 0 }}
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
