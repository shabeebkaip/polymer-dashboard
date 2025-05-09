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
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="xl">
      <DialogTitle>Sample Request</DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-3 gap-4">
          <LabelValue
            label="Product Name"
            value={sample?.product?.productName}
          />
          <LabelValue
            label="User Name"
            value={sample?.user?.name || "--"}
          />
          <LabelValue
            label="Email"
            value={sample?.user?.email || "--"}
          />
          <LabelValue label="Company" value={sample?.user?.company} />
          <LabelValue label="Street Name" value={sample?.streetName} />
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
          <LabelValue label="Post Code" value={sample?.postCode} />
          <LabelValue label="City" value={sample?.city} />
          <LabelValue label="Grade" value={sample?.grade?.name} />
          <LabelValue label="Application" value={sample?.application} />
          <LabelValue label="Expected Annual Volume" value={sample?.expected_annual_volume} />
          <LabelValue label="Country" value={sample?.country} />
          <LabelValue label="Message" value={sample?.message || "--"} />
          <LabelValue label="Address" value={sample?.address} />
          <LabelValue label="Ordered Date" value={sample?.orderDate} />
          <LabelValue label="Sample Price" value={sample?.samplePrice} />
          <LabelValue
  label="Sample for free"
  value={sample?.forFree === true ? 'Yes' : sample?.forFree === false ? 'No' : 'N/A'}
/>          <LabelValue label="Needed by" value={sample?.neededBy} />
          <LabelValue label="Phone Number" value={sample?.phone} />
          <LabelValue label="Requested Document" value={sample?.request_document} />
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
