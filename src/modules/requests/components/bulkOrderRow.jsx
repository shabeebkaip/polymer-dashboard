import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import EditAction from "../../../shared/EditAction";
import { useDispatch } from "react-redux";
import { setModal, setBulkOrder } from "../../../slices/requestSlice";
import { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { enqueueSnackbar } from "notistack";
import { PatchBulkOrderApi } from "../api";
import { setBulkOrderCrud, setBulkOrderModal, setMode } from "../../../slices/sharedSlice";

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

const BulkOrderRow = ({ order, index, isLastRow, getResponseBack }) => {
  const dispatch = useDispatch();
  const [localStatus, setLocalStatus] = useState(
    order?.status?.toLowerCase() === "approved"
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // Update local state when order status changes
  useEffect(() => {
    setLocalStatus(order?.status?.toLowerCase() === "approved");
  }, [order?.status]);

  const handleStatusUpdate = async (orderId, isApproved) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    const payload = { status: isApproved ? "approved" : "rejected" };

    try {
      const res = await PatchBulkOrderApi(orderId, payload);

      if (res?.success) {
        enqueueSnackbar(
          res.message || `Bulk order ${payload.status} successfully.`,
          {
            variant: "success",
            anchorOrigin: { horizontal: "right", vertical: "top" },
          }
        );
        setLocalStatus(isApproved);
        
        // Refresh data after successful update
        if (getResponseBack) {
          setTimeout(() => {
            getResponseBack();
          }, 500);
        }
      } else {
        enqueueSnackbar(res?.message || "Failed to update bulk order.", {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      }
    } catch (error) {
      console.error("Patch error:", error);
      enqueueSnackbar("Something went wrong.", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{order.product?.productName || "—"}</td>
      <td>{order.user?.name || "—"}</td>
      <td>{order.user?.email || "—"}</td>
      <td>{order.quantity ?? "—"}</td>
      <td>{order.uom || "—"}</td>
      <td>{order.city || "—"}</td>
      <td>{order.country || "—"}</td>
      <td>{order.status || "—"}</td>
      <td>
        <div className="flex items-center gap-2">
          <ViewAction
            handleClick={() => {
              dispatch(setModal(true));
              dispatch(setBulkOrder(order));
            }}
          />
          <EditAction
            handleClick={() => {
              dispatch(setBulkOrderModal(true));
              dispatch(setMode("edit"));
              dispatch(setBulkOrderCrud(order));
            }}
          />
        </div>
      </td>
      <td className="px-8">
        <FormControlLabel
          control={
            <IOSSwitch
              checked={localStatus}
              disabled={isUpdating}
              onChange={(e) =>
                handleStatusUpdate(order._id, e.target.checked)
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

BulkOrderRow.propTypes = {
  order: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default BulkOrderRow;