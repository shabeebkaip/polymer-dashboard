import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBulkOrderDetailApi } from "../api";
import LabelValue from "../../../shared/LabelValue";
import { CircularProgress } from "@mui/material";

const BulkOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "—";

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await getBulkOrderDetailApi(id);
        if (res?.success) {
          setOrder(res.data?.order);
          setOffers(res.data?.offers || []);
        }
      } catch (error) {
        console.error("Error fetching bulk order detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <div className="p-5"><CircularProgress /></div>;

  if (!order) return <div className="p-5 text-red-500">No data found.</div>;

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Bulk Order Details</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
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
        <LabelValue label="Request Document" value={order?.request_document || "—"} />
        <LabelValue label="Status" value={order?.status} />
        <LabelValue label="Seller Status" value={order?.sellerStatus || "—"} />
        <LabelValue label="Created At" value={formatDate(order?.createdAt)} />
        <LabelValue label="Updated At" value={formatDate(order?.updatedAt)} />
      </div>

      {/* Status Tracking */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Status Tracking</h3>
        <div className="grid grid-cols-3 gap-4">
          <LabelValue label="Admin Status" value={order?.statusTracking?.adminStatus || "—"} />
          <LabelValue label="Seller Status" value={order?.statusTracking?.sellerStatus || "—"} />
          <LabelValue label="Last Update" value={formatDate(order?.statusTracking?.lastUpdate)} />
          <LabelValue label="Total Updates" value={order?.statusTracking?.totalUpdates?.toString() || "0"} />
        </div>
      </div>

      {/* Supplier Offers */}
      <div className="mt-10">
        <h3 className="mb-4 text-xl font-semibold">Supplier Offers</h3>
        {offers.length === 0 ? (
          <p className="text-gray-500">No offers available.</p>
        ) : (
          offers.map((offer, idx) => (
            <div
              key={offer._id || idx}
              className="p-4 mb-4 border border-gray-200 rounded-md shadow-sm"
            >
              <div className="grid grid-cols-3 gap-4">
                <LabelValue label="Supplier Name" value={`${offer.supplierId?.firstName} ${offer.supplierId?.lastName}`} />
                <LabelValue label="Company" value={offer.supplierId?.company} />
                <LabelValue label="Email" value={offer.supplierId?.email} />
                <LabelValue label="Price/Unit" value={`$${offer.pricePerUnit}`} />
                <LabelValue label="Available Qty" value={offer.availableQuantity?.toString()} />
                <LabelValue label="Delivery Time" value={`${offer.deliveryTimeInDays} days`} />
                <LabelValue label="Incoterm/Packaging" value={offer.incotermAndPackaging} />
                <LabelValue label="Message" value={offer.message || "—"} />
                <LabelValue label="Status" value={offer.status || "—"} />
              </div>

              {/* Status History */}
              {offer.statusMessage?.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-1 text-sm font-medium">Status History</h4>
                  {offer.statusMessage.map((msg) => (
                    <div key={msg._id} className="ml-4 text-sm text-gray-600">
                      • {msg.status} - {msg.message} ({formatDate(msg.date)}) by {msg.updatedBy}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BulkOrderDetail;
