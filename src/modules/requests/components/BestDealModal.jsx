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

const BestDealModal = () => {
  const dispatch = useDispatch();
  const { modal, bestDeal } = useSelector((state) => state.requestState);

  const closeModal = () => {
    dispatch(setModal(false));
  };

const sellerName = bestDeal?.sellerId?.name || "—";
  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="xl">
      <DialogTitle>Best Deal Details</DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-3 gap-4">
          <LabelValue
            label="Product Name"
            value={bestDeal?.productId?.productName || "—"}
          />
          <LabelValue
            label="Offer Price"
            value={bestDeal?.offerPrice ? `$${bestDeal?.offerPrice}` : "—"}
          />
          <LabelValue
            label="Seller Name"
            value={sellerName || "—"}
          />
          <LabelValue
            label="Seller Email"
            value={bestDeal?.sellerId?.email || "—"}
          />
          <LabelValue
            label="Status"
            value={bestDeal?.status || "—"}
          />
          <LabelValue
            label="Created At"
            value={bestDeal?.createdAt}
            type="date"
          />
          <LabelValue
            label="Updated At"
            value={bestDeal?.updatedAt}
            type="date"
          />
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

export default BestDealModal;
