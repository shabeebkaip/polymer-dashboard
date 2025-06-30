import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../../slices/requestSlice";
import LabelValue from "../../../shared/LabelValue";

const SupplierOfferModal = () => {
  const dispatch = useDispatch();
  const { modal, supplierOffer } = useSelector((state) => state.requestState);

  const closeModal = () => {
    dispatch(setModal(false));
  };

const supplierName = supplierOffer?.supplierId?.name || "—";
const productName = supplierOffer?.bulkOrderId?.product?.productName || "—";

  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>Supplier Offer Request</DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-2 gap-4">
          <LabelValue label="Product Name" value={productName} />
          <LabelValue label="Price Per Unit" value={supplierOffer?.pricePerUnit || "—"} />
          <LabelValue label="Available Quantity" value={supplierOffer?.availableQuantity || "—"} />
          <LabelValue label="Supplier Name" value={supplierName || "—"} />
          <LabelValue label="Email" value={supplierOffer?.supplierId?.email || "—"} />
          <LabelValue label="Status" value={supplierOffer?.status || "—"} />
          <LabelValue label="Message" value={supplierOffer?.message || "—"} />
          <LabelValue label="Created At" value={supplierOffer?.createdAt} type="date" />
          <LabelValue label="Updated At" value={supplierOffer?.updatedAt} type="date" />
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

export default SupplierOfferModal;
