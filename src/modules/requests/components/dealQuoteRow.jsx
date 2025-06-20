import PropTypes from "prop-types";
import TableRow from "../../../shared/TableRow";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setDealQuote } from "../../../slices/requestSlice";
import { useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { enqueueSnackbar } from "notistack";
import { patchDealQuoteRequestApi } from "../api";

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

const DealQuoteRow = ({ quote, index, isLastRow, getResponseBack }) => {
  const dispatch = useDispatch();
  const [localStatus, setLocalStatus] = useState(
    quote?.status?.toLowerCase() === "approved"
  );

  const handleStatusUpdate = async (quoteId, isApproved) => {
    const payload = { status: isApproved ? "approved" : "rejected" };

    try {
      const res = await patchDealQuoteRequestApi(quoteId, payload);

      if (res?.success) {
        enqueueSnackbar(
          res.message || `Quote ${payload.status} successfully.`,
          {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          }
        );
        setLocalStatus(isApproved);
        getResponseBack();
      } else {
        enqueueSnackbar(res.message || "Failed to update quote.", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setLocalStatus(!isApproved);
      }
    } catch (error) {
      console.error("Status update failed:", error);
      enqueueSnackbar("Something went wrong.", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setLocalStatus(!isApproved);
    }
  };

  const buyerName = `${quote?.buyerId?.firstName || ""} ${quote?.buyerId?.lastName || ""}`.trim();
  const productName = quote?.bestDealId?.productId?.productName || "—";

  return (
    <TableRow index={index} isLastRow={isLastRow}>
      <td className="p-4">{productName}</td>
      <td className="p-4">{buyerName || "—"}</td>
      <td className="p-4">{quote?.buyerId?.email || "—"}</td>
      <td className="p-4">{quote?.desiredQuantity ?? "—"}</td>
      <td className="p-4">{quote?.shippingCountry || "—"}</td>
      <td className="p-4">{quote?.paymentTerms || "—"}</td>
      <td className="p-4">{quote?.status || "—"}</td>
      <td className="p-4">
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setDealQuote(quote));
          }}
        />
      </td>
      <td className="p-4 px-8">
        <FormControlLabel
          control={
            <IOSSwitch
              checked={localStatus}
              onChange={(e) =>
                handleStatusUpdate(quote._id, e.target.checked)
              }
            />
          }
        />
      </td>
    </TableRow>
  );
};

DealQuoteRow.propTypes = {
  quote: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLastRow: PropTypes.bool.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default DealQuoteRow;
