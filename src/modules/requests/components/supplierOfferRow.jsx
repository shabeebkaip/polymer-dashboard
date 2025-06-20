import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setSupplierOffer } from "../../../slices/requestSlice";
import { FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { patchSupplierOfferApi } from "../api";

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

const SupplierOfferRow = ({ offer, index, isLastRow, getResponseBack }) => {
  const dispatch = useDispatch();
  const [localStatus, setLocalStatus] = useState(
    offer?.status?.toLowerCase() === "approved"
  );

  const handleStatusUpdate = async (offerId, isApproved) => {
    const payload = { status: isApproved ? "approved" : "rejected" };

    try {
      const res = await patchSupplierOfferApi(offerId, payload);
      if (res?.success) {
        enqueueSnackbar(res?.message || `Offer ${payload.status}`, {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        setLocalStatus(isApproved);
        getResponseBack();
      } else {
        enqueueSnackbar(res?.message || "Failed to update", {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        setLocalStatus(!isApproved);
      }
    } catch (err) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      setLocalStatus(!isApproved);
    }
  };

  const supplierName = `${offer?.supplierId?.firstName || ""} ${offer?.supplierId?.lastName || ""}`.trim();

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{offer?.bulkOrderId?.product || "—"}</td>
      <td className="p-4">{offer?.pricePerUnit || "—"}</td>
      <td className="p-4">{offer?.availableQuantity || "—"}</td>
      <td className="p-4">{supplierName || "—"}</td>
      <td className="p-4">{offer?.supplierId?.email || "—"}</td>
      <td className="p-4">{offer?.status || "—"}</td>
      <td className="p-4">
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setSupplierOffer(offer));
          }}
        />
      </td>
      <td className="p-4 px-8">
        <FormControlLabel
          control={
            <IOSSwitch
              checked={localStatus}
              onChange={(e) => handleStatusUpdate(offer._id, e.target.checked)}
            />
          }
        />
      </td>
    </TableRow>
  );
};

SupplierOfferRow.propTypes = {
  offer: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default SupplierOfferRow;
