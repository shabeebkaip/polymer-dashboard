import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../../slices/requestSlice";
import LabelValue from "../../../shared/LabelValue";

const BulkOrderModal = () => {
  const dispatch = useDispatch();
  const { modal, bulkOrder } = useSelector((state) => state.requestState);

  const closeModal = () => dispatch(setModal(false));

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "—";

  const order = bulkOrder?.order;
  const offers = bulkOrder?.offers;

  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="xl">
      <DialogTitle>Bulk Order Details</DialogTitle>
      <DialogContent dividers>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Order Info */}
          <LabelValue label="Product Name" value={order?.product?.productName} />
          <LabelValue label="Chemical Name" value={order?.product?.chemicalName} />
          <LabelValue label="User Name" value={`${order?.user?.firstName} ${order?.user?.lastName}`} />
          <LabelValue label="Email" value={order?.user?.email} />
          <LabelValue label="Phone" value={order?.user?.phone?.toString()} />
          <LabelValue label="Company" value={order?.user?.company} />
          <LabelValue label="Quantity" value={order?.quantity?.toString()} />
          <LabelValue label="UOM" value={order?.uom} />
          <LabelValue label="City" value={order?.city} />
          <LabelValue label="Country" value={order?.country} />
          <LabelValue label="Destination" value={order?.destination} />
          <LabelValue label="Delivery Date" value={formatDate(order?.delivery_date)} />
          <LabelValue label="Message" value={order?.message || "—"} />
          <LabelValue label="Request Document" value={order?.request_document} />
          <LabelValue label="Status" value={order?.status} />
          <LabelValue label="Seller Status" value={order?.sellerStatus || "—"} />
          <LabelValue label="Created At" value={formatDate(order?.createdAt)} />
          <LabelValue label="Updated At" value={formatDate(order?.updatedAt)} />
        </div>

        {/* Status Tracking */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Status Tracking</h3>
          <LabelValue label="Admin Status" value={order?.statusTracking?.adminStatus || "—"} />
          <LabelValue label="Seller Status" value={order?.statusTracking?.sellerStatus || "—"} />
          <LabelValue label="Last Update" value={formatDate(order?.statusTracking?.lastUpdate)} />
          <LabelValue label="Total Updates" value={order?.statusTracking?.totalUpdates?.toString() || "0"} />
        </div>

        {/* Offers */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Supplier Offers</h3>
          {offers?.length > 0 ? (
            offers.map((offer, i) => (
              <div key={offer._id} className="p-4 mb-4 border rounded-md">
                <LabelValue label="Supplier Name" value={`${offer.supplierId?.firstName} ${offer.supplierId?.lastName}`} />
                <LabelValue label="Company" value={offer.supplierId?.company} />
                <LabelValue label="Email" value={offer.supplierId?.email} />
                <LabelValue label="Price/Unit" value={`$${offer.pricePerUnit}`} />
                <LabelValue label="Available Qty" value={offer.availableQuantity.toString()} />
                <LabelValue label="Delivery Time" value={`${offer.deliveryTimeInDays} days`} />
                <LabelValue label="Incoterm/Packaging" value={offer.incotermAndPackaging} />
                <LabelValue label="Message" value={offer.message} />
                <LabelValue label="Status" value={offer.status} />

                {/* Offer Status Messages */}
                {offer.statusMessage?.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Status History:</h4>
                    {offer.statusMessage.map((msg) => (
                      <div key={msg._id} className="ml-4 text-sm text-gray-600">
                        <p>• {msg.status} - {msg.message} ({formatDate(msg.date)}) by {msg.updatedBy}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No offers available.</p>
          )}
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

export default BulkOrderModal;
