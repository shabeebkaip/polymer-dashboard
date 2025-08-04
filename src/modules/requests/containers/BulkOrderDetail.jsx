import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBulkOrderDetailApi } from "../api";
import LabelValue from "../../../shared/LabelValue";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Package,
  User,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Truck,
} from "lucide-react";

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <CircularProgress size={40} className="text-emerald-600" />
          <p className="mt-4 text-gray-600">Loading bulk order details...</p>
        </div>
      </div>
    );

  if (!order)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-lg font-medium text-red-600">No data found</p>
          <p className="text-gray-500">
            The requested bulk order could not be found.
          </p>
        </div>
      </div>
    );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Bulk Order Details
            </h1>
            <p className="text-gray-600 text-sm">Order ID: {order._id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Chip
            label={order.status}
            color={getStatusColor(order.status)}
            size="small"
            className="font-medium"
          />
          <Chip
            label={`Seller: ${order.sellerStatus || "Pending"}`}
            color={getStatusColor(order.sellerStatus)}
            size="small"
            variant="outlined"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Information */}
        <Card className="lg:col-span-2 shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-emerald-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                Product Information
              </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LabelValue
                label="Product Name"
                value={order?.product?.productName}
              />
              <LabelValue
                label="Chemical Name"
                value={order?.product?.chemicalName}
              />
              <LabelValue
                label="Trade Name"
                value={order?.product?.tradeName}
              />
              <LabelValue
                label="Manufacturing Method"
                value={order?.product?.manufacturingMethod}
              />
              <LabelValue
                label="Country of Origin"
                value={order?.product?.countryOfOrigin}
              />
              <LabelValue label="Color" value={order?.product?.color} />
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-emerald-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                Order Details
              </Typography>
            </div>
            <div className="space-y-3">
              <LabelValue
                label="Quantity"
                value={`${order?.quantity} ${order?.uom}`}
              />
              <LabelValue
                label="Delivery Date"
                value={formatDate(order?.delivery_date)}
              />
              <LabelValue
                label="Request Document"
                value={order?.request_document || "—"}
              />
              <LabelValue
                label="Created At"
                value={formatDate(order?.createdAt)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Customer Information */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-emerald-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                Customer Information
              </Typography>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-12 h-12 bg-emerald-100 text-emerald-700">
                {order?.user?.firstName?.[0]}
                {order?.user?.lastName?.[0]}
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">
                  {order?.user?.firstName} {order?.user?.lastName}
                </p>
                <p className="text-sm text-gray-600">{order?.user?.email}</p>
              </div>
            </div>
            <div className="space-y-3">
              <LabelValue label="Company" value={order?.user?.company} />
              <LabelValue
                label="Phone"
                value={order?.user?.phone?.toString()}
              />
              <LabelValue label="Address" value={order?.user?.address} />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-emerald-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                Shipping Information
              </Typography>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Origin</p>
                  <p className="text-sm text-gray-600">
                    {order?.city}, {order?.country}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Destination
                  </p>
                  <p className="text-sm text-gray-600">{order?.destination}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Delivery Date
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(order?.delivery_date)}
                  </p>
                </div>
              </div>
              {order?.message && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Message
                  </p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {order.message}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Tracking */}
      {order?.statusTracking && (
        <Card className="mt-6 shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-emerald-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                Status Tracking
              </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <LabelValue
                label="Admin Status"
                value={order?.statusTracking?.adminStatus || "—"}
              />
              <LabelValue
                label="Seller Status"
                value={order?.statusTracking?.sellerStatus || "—"}
              />
              <LabelValue
                label="Last Update"
                value={formatDate(order?.statusTracking?.lastUpdate)}
              />
              <LabelValue
                label="Total Updates"
                value={order?.statusTracking?.totalUpdates?.toString() || "0"}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supplier Offers */}
      <Card className="mt-6 shadow-sm border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <Typography variant="h6" className="font-semibold text-gray-800">
              Supplier Offers ({offers.length})
            </Typography>
          </div>

          {offers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                No offers available
              </p>
              <p className="text-gray-400 text-sm">
                Suppliers haven&apos;t submitted any offers yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer, idx) => (
                <Card
                  key={offer._id || idx}
                  variant="outlined"
                  className="border border-gray-200"
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 bg-blue-100 text-blue-700">
                          {offer.supplierId?.firstName?.[0]}
                          {offer.supplierId?.lastName?.[0]}
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {offer.supplierId?.firstName}{" "}
                            {offer.supplierId?.lastName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {offer.supplierId?.company}
                          </p>
                        </div>
                      </div>
                      {offer.status && (
                        <Chip
                          label={offer.status}
                          color={getStatusColor(offer.status)}
                          size="small"
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-emerald-700">
                          Price per Unit
                        </p>
                        <p className="text-lg font-bold text-emerald-800">
                          ${offer.pricePerUnit}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-700">
                          Available Quantity
                        </p>
                        <p className="text-lg font-bold text-blue-800">
                          {offer.availableQuantity?.toString()}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-purple-700">
                          Delivery Time
                        </p>
                        <p className="text-lg font-bold text-purple-800">
                          {offer.deliveryTimeInDays} days
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <LabelValue
                        label="Email"
                        value={offer.supplierId?.email}
                      />
                      <LabelValue
                        label="Incoterm/Packaging"
                        value={offer.incotermAndPackaging}
                      />
                    </div>

                    {offer.message && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Message
                        </p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {offer.message}
                        </p>
                      </div>
                    )}

                    {/* Status History */}
                    {offer.statusMessage?.length > 0 && (
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <p className="text-sm font-medium text-gray-700">
                            Status History
                          </p>
                        </div>
                        <div className="space-y-2">
                          {offer.statusMessage.map((msg) => (
                            <div
                              key={msg._id}
                              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Chip
                                    label={msg.status}
                                    size="small"
                                    variant="outlined"
                                  />
                                  <span className="text-xs text-gray-500">
                                    {formatDate(msg.date)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">
                                  {msg.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Updated by {msg.updatedBy}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkOrderDetail;
