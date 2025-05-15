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

const QuoteModal = () => {
  const dispatch = useDispatch();
  const { modal, quote } = useSelector((state) => state.requestState);
  const closeModal = () => {
    dispatch(setModal(false));
  };
  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="xl">
      <DialogTitle>Quote Request</DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-3 gap-4">
          <LabelValue
            label="Product Name"
            value={quote?.product?.productName}
          />
          <LabelValue label="User Name" value={quote?.user?.name} />
          <LabelValue label="Email" value={quote?.user?.email} />
          <LabelValue label="Compamy" value={quote?.user?.company} />
          <LabelValue label="Quantity" value={quote?.quantity} />
          <LabelValue label="UOM" value={quote?.uom} />
          <LabelValue label="Grade" value={quote?.grade?.name} />
          <LabelValue label="Incotern" value={quote?.incoterm?.name} />
          <LabelValue label="Packaging Type" value={quote?.packagingType?.name} />
          <LabelValue label="Post Code" value={quote?.postCode} />
          <LabelValue label="City" value={quote?.city} />
          <LabelValue label="Destination" value={quote?.destination} />
          <LabelValue label="Packaging Size" value={quote?.packaging_size} />
          <LabelValue label="Expected Annual Volume " value={quote?.expected_annual_volume} />
          <LabelValue label="Delivery Date " value={new Date(quote?.delivery_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })} />
          <LabelValue label="Pricing" value={quote?.pricing} />
          <LabelValue label="Application" value={quote?.application} />
          <LabelValue label="Requested Document" value={quote?.request_document} />
            <LabelValue
            label="Open for Request"
            value={quote?.open_request === true ? 'Yes' : quote?.open_request === false ? 'No' : 'N/A'}
          />  
          <LabelValue label="Created At" value={quote?.createdAt} type="date" />
          <LabelValue label="Updated At" value={quote?.updatedAt} type="date" />
          <LabelValue label="Status" value={quote?.status} />
     
          <LabelValue label="Message" value={quote?.message} />
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

export default QuoteModal;
