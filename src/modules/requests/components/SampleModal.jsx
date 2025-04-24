import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../slices/requestSlice";
import PropTypes from "prop-types";
import LabelValue from "../../../shared/LabelValue";

const SampleModal = () => {
  const dispatch = useDispatch();
  const { modal, sample } = useSelector((state) => state.requestState);
  const closeModal = () => {
    dispatch(setModal(false));
  };
  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>Sample Request</DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-3 gap-4">
          <LabelValue
            label="Product Name"
            value={sample?.productDetails?.name}
          />
          <LabelValue
            label="User Name"
            value={sample?.userDetails?.name || "--"}
          />
          <LabelValue
            label="Email"
            value={sample?.userDetails?.email || "--"}
          />
          <LabelValue label="Industry" value={sample?.industryDetails?.name} />
          <LabelValue label="Quantity" value={sample?.quantity} />
          <LabelValue label="UOM" value={sample?.uom} />
          <LabelValue
            label="Created At"
            value={sample?.createdAt}
            type="date"
          />
          <LabelValue
            label="Updated At"
            value={sample?.updatedAt}
            type="date"
          />
          <LabelValue label="Status" value={sample?.status} />
          <LabelValue label="Application" value={sample?.application} />
          <LabelValue label="Message" value={sample?.message || "--"} />
          <LabelValue label="Purchase Plan" value={sample?.purchase_plan} />
          <LabelValue label="Address" value={sample?.address} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary" variant="outlined">
          Close{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default SampleModal;
