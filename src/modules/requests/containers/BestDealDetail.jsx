import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { getBestDealDetailApi } from "../api"; 
import LabelValue from "../../../shared/LabelValue";

const BestDealDetail = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "—";

  useEffect(() => {
    const fetchDealDetail = async () => {
      try {
        setLoading(true);
        const res = await getBestDealDetailApi(id);
        if (res.success) {
          setDeal(res.data.deal);
          setQuoteRequests(res.data.quoteRequests || []);
        }
      } catch (error) {
        console.error("Failed to fetch best deal detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealDetail();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center w-full py-16"><CircularProgress /></div>;
  if (!deal) return <div className="p-8 text-emerald-600 font-semibold text-lg text-center bg-emerald-50 rounded-xl shadow">No best deal data found.</div>;

  const seller = deal.sellerId || {};
  const product = deal.productId || {};

  return (
    <div className="p-8">
      <div className="rounded-xl shadow-lg border border-emerald-200 bg-white/80 backdrop-blur-md p-8 mb-8">
        <h2 className="mb-8 text-3xl font-bold text-emerald-700 tracking-tight">Best Deal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <LabelValue label="Product Name" value={product?.productName || "—"} />
          <LabelValue label="Offer Price" value={`$${deal.offerPrice || "—"}`} />
          <LabelValue label="Seller Name" value={`${seller?.firstName || ""} ${seller?.lastName || ""}`} />
          <LabelValue label="Seller Email" value={seller?.email || "—"} />
          <LabelValue label="Seller Company" value={seller?.company || "—"} />
          <LabelValue label="Seller Phone" value={seller?.phone?.toString() || "—"} />
          <LabelValue label="Status" value={deal?.status || "—"} />
          <LabelValue label="Created At" value={formatDate(deal?.createdAt)} />
          <LabelValue label="Updated At" value={formatDate(deal?.updatedAt)} />
        </div>
        <div className="mb-10">
          <h3 className="mb-4 text-2xl font-semibold text-emerald-700">Status Tracking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LabelValue label="Admin Status" value={deal?.statusTracking?.adminStatus || "—"} />
            <LabelValue label="Last Update" value={formatDate(deal?.statusTracking?.lastUpdate)} />
            <LabelValue label="Total Requests" value={deal?.statusTracking?.totalRequests?.toString() || "0"} />
          </div>
        </div>
        <div>
          <h3 className="mb-6 text-2xl font-semibold text-emerald-700">Quote Requests</h3>
          {quoteRequests.length === 0 ? (
            <p className="text-gray-500">No quote requests available.</p>
          ) : (
            quoteRequests.map((request, idx) => {
              const buyer = request.buyerId || {};
              return (
                <div
                  key={request._id || idx}
                  className="p-6 mb-8 border border-emerald-100 rounded-xl shadow bg-white/70"
                >
                  <h4 className="mb-4 text-xl font-bold text-emerald-700">Buyer #{idx + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <LabelValue label="Buyer Name" value={`${buyer?.firstName || ""} ${buyer?.lastName || ""}`} />
                    <LabelValue label="Company" value={buyer?.company || "—"} />
                    <LabelValue label="Email" value={buyer?.email || "—"} />
                    <LabelValue label="Phone" value={buyer?.phone?.toString() || "—"} />
                    <LabelValue label="Address" value={buyer?.address || "—"} />
                    <LabelValue label="Desired Quantity" value={request.desiredQuantity?.toString() || "—"} />
                    <LabelValue label="Shipping Country" value={request.shippingCountry || "—"} />
                    <LabelValue label="Payment Terms" value={request.paymentTerms || "—"} />
                    <LabelValue label="Delivery Deadline" value={formatDate(request.deliveryDeadline)} />
                    <LabelValue label="Message" value={request.message || "—"} />
                    <LabelValue label="Status" value={request.status || "—"} />
                    <LabelValue label="Admin Note" value={request.adminNote || "—"} />
                    <LabelValue label="Created At" value={formatDate(request.createdAt)} />
                    <LabelValue label="Updated At" value={formatDate(request.updatedAt)} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDealDetail;
