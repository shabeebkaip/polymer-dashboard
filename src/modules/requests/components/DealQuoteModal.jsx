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

const DealQuoteModal = () => {
  const dispatch = useDispatch();
  const { modal, dealQuote } = useSelector((state) => state.requestState);

  const closeModal = () => {
    dispatch(setModal(false));
  };

  const buyerName = dealQuote?.buyerId?.name || "—";
  const sellerName = dealQuote?.bestDealId?.sellerId?.name || "—";
  const productName = dealQuote?.bestDealId?.productId?.productName || "—";

  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="xl">
      <DialogTitle>Best Deal Quote Details</DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-3 gap-4">
          <LabelValue label="Product Name" value={productName} />
          <LabelValue label="Seller Name" value={sellerName} />
          <LabelValue label="Buyer Name" value={buyerName} />
          <LabelValue label="Email" value={dealQuote?.buyerId?.email || "—"} />
          <LabelValue label="Desired Quantity" value={dealQuote?.desiredQuantity ?? "—"} />
          <LabelValue label="Shipping Country" value={dealQuote?.shippingCountry || "—"} />
          <LabelValue label="Payment Terms" value={dealQuote?.paymentTerms || "—"} />
          <LabelValue label="Status" value={dealQuote?.status || "—"} />
          <LabelValue label="Message" value={dealQuote?.message || "—"} />
          <LabelValue label="Created At" value={dealQuote?.createdAt} type="date" />
          <LabelValue label="Updated At" value={dealQuote?.updatedAt} type="date" />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DealQuoteModal;
