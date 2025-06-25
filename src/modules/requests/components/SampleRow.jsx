import TableRow from "../../../shared/TableRow";
import PropTypes from "prop-types";
import ViewAction from "../../../shared/ViewAction";
import { useDispatch } from "react-redux";
import { setModal, setSample } from "../../../slices/requestSlice";
import { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { enqueueSnackbar } from "notistack";
import { patchSampleRequestApi } from "../api";

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

const SampleRow = ({ isLastRow, sample, index, getResponseBack }) => {
  const dispatch = useDispatch();
  const [localStatus, setLocalStatus] = useState(
    sample?.status?.toLowerCase() === "approved"
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLocalStatus(sample?.status?.toLowerCase() === "approved");
  }, [sample?.status]);

  const handleStatusUpdate = async (id, isApproved) => {
    if (isUpdating) return;

    setIsUpdating(true);
    const payload = { status: isApproved ? "approved" : "rejected" };

    try {
      const res = await patchSampleRequestApi(id, payload);
      if (res?.success) {
        enqueueSnackbar(`Sample ${payload.status} successfully.`, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setLocalStatus(isApproved);
        if (getResponseBack) {
          setTimeout(() => getResponseBack(), 500);
        }
      } else {
        enqueueSnackbar(res?.message || "Failed to update sample status.", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Something went wrong.", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <TableRow isLastRow={isLastRow} index={index}>
      <td className="p-4">{sample?.product?.productName}</td>
      <td>{sample?.user?.name}</td>
      <td>{sample?.user?.email}</td>
      <td>{sample.quantity}</td>
      <td>{sample.uom}</td>
      <td>
        <span className={`status-badge ${sample?.status?.toLowerCase()}`}>
          {sample?.status}
        </span>
      </td>
      <td>
        <ViewAction
          handleClick={() => {
            dispatch(setModal(true));
            dispatch(setSample(sample));
          }}
        />
      </td>
      <td className="px-8">
        <FormControlLabel
          control={
            <IOSSwitch
              checked={localStatus}
              disabled={isUpdating}
              onChange={(e) =>
                handleStatusUpdate(sample._id, e.target.checked)
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

SampleRow.propTypes = {
  isLastRow: PropTypes.bool.isRequired,
  sample: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  getResponseBack: PropTypes.func.isRequired,
};

export default SampleRow;
