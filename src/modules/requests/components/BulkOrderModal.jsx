import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../slices/requestSlice";
import LabelValue from "../../../shared/LabelValue";
import PropTypes from "prop-types";

const BulkOrderModal = () => {
  const dispatch = useDispatch();
  const { modal, bulkOrder } = useSelector((state) => state.requestState);

  const closeModal = () => {
    dispatch(setModal(false));
  };

  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";
  };

  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="xl">
      <DialogTitle>Bulk Order Details</DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-3 gap-4">
          <LabelValue label="Product Name" value={bulkOrder?.product?.productName} />
          <LabelValue label="User Name" value={bulkOrder?.user?.name} />
          <LabelValue label="Email" value={bulkOrder?.user?.email} />
          <LabelValue label="Quantity" value={bulkOrder?.quantity?.toString()} />
          <LabelValue label="UOM" value={bulkOrder?.uom} />
          <LabelValue label="City" value={bulkOrder?.city} />
          <LabelValue label="Country" value={bulkOrder?.country} />
          <LabelValue label="Destination" value={bulkOrder?.destination} />
          <LabelValue label="Delivery Date" value={formatDate(bulkOrder?.delivery_date)} />
          <LabelValue label="Message" value={bulkOrder?.message || "—"} />
          <LabelValue label="Request Document" value={bulkOrder?.request_document} />
          <LabelValue label="Status" value={bulkOrder?.status} />
          <LabelValue label="Created At" value={formatDate(bulkOrder?.createdAt)} />
          <LabelValue label="Updated At" value={formatDate(bulkOrder?.updatedAt)} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} variant="outlined" color="primary">
          Close
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

export default BulkOrderModal;
