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
  
  const FinanceModal = () => {
    const dispatch = useDispatch();
    const { modal, finance } = useSelector((state) => state.requestState);
    const closeModal = () => {
      dispatch(setModal(false));
    };
    return (
      <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="xl">
        <DialogTitle>Finance Request</DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-3 gap-4">
            <LabelValue label="User Name" value={finance?.userId?.name} />
            <LabelValue
              label="Product Name"
              value={finance?.productId?.productName}
            />
            <LabelValue label="EMI Duration" value={finance?.emiMonths} />
            <LabelValue label="Quantity" value={finance?.quantity} />
            <LabelValue label="Price" value={finance?.estimatedPrice} />
            <LabelValue label="Requested On" value={new Date(finance?.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })} />
            <LabelValue label="Email" value={finance?.userId?.email} />
            <LabelValue label="Company" value={finance?.userId?.company} />
            <LabelValue label="Status" value={finance?.status} />
       
            <LabelValue label="Notes" value={finance?.notes} />
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
  
  export default FinanceModal;
  