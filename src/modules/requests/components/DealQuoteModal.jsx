import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../slices/requestSlice";
import LabelValue from "../../../shared/LabelValue";
import {
  Package,
  User,
  Building2,
  DollarSign,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react";

const DealQuoteModal = () => {
  const dispatch = useDispatch();
  const { modal, dealQuote } = useSelector((state) => state.requestState);
  const closeModal = () => {
    dispatch(setModal(false));
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "—";

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "accepted":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const buyerName = dealQuote?.buyerId?.name || "—";
  const buyerEmail = dealQuote?.buyerId?.email || "—";
  const sellerName = dealQuote?.bestDealId?.sellerId?.name || "—";
  const sellerEmail = dealQuote?.bestDealId?.sellerId?.email || "—";
  const productName = dealQuote?.bestDealId?.productId?.productName || "—";

  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="lg">
      <DialogTitle className="bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-emerald-600" />
          <span className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Deal Quote Details
          </span>
        </div>
      </DialogTitle>
      <DialogContent dividers className="bg-gray-50">
        <div className="space-y-6 p-4">
          {/* Quote Overview */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Quote Overview
                  </Typography>
                </div>
                <Chip
                  label={dealQuote?.status || "—"}
                  color={getStatusColor(dealQuote?.status)}
                  size="small"
                  className="font-medium"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-emerald-700">
                    Offer Price
                  </p>
                  <p className="text-xl font-bold text-emerald-800">
                    ${dealQuote?.bestDealId?.offerPrice || "—"}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-700">
                    Desired Quantity
                  </p>
                  <p className="text-xl font-bold text-blue-800">
                    {dealQuote?.desiredQuantity ?? "—"}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-700">
                    Payment Terms
                  </p>
                  <p className="text-lg font-bold text-purple-800">
                    {dealQuote?.paymentTerms || "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Information */}
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Product Information
                  </Typography>
                </div>
                <div className="space-y-3">
                  <LabelValue label="Product Name" value={productName} />
                  <LabelValue
                    label="Deal ID"
                    value={dealQuote?.bestDealId?._id || "—"}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Shipping Information
                  </Typography>
                </div>
                <div className="space-y-3">
                  <LabelValue
                    label="Shipping Country"
                    value={dealQuote?.shippingCountry || "—"}
                  />
                  <LabelValue
                    label="Delivery Deadline"
                    value={formatDate(dealQuote?.deliveryDeadline)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Buyer Information */}
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-emerald-600" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Buyer Information
                  </Typography>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12 bg-blue-100 text-blue-700">
                    {buyerName?.[0] || "B"}
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{buyerName}</p>
                    <p className="text-sm text-gray-600">{buyerEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Seller Information
                  </Typography>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12 bg-green-100 text-green-700">
                    {sellerName?.[0] || "S"}
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{sellerName}</p>
                    <p className="text-sm text-gray-600">{sellerEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          {(dealQuote?.message || dealQuote?.adminNote) && (
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Additional Information
                  </Typography>
                </div>
                <div className="space-y-4">
                  {dealQuote?.message && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Message
                      </p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {dealQuote.message}
                      </p>
                    </div>
                  )}
                  {dealQuote?.adminNote && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Admin Note
                      </p>
                      <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        {dealQuote.adminNote}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800"
                >
                  Timeline
                </Typography>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelValue
                  label="Created At"
                  value={formatDate(dealQuote?.createdAt)}
                />
                <LabelValue
                  label="Updated At"
                  value={formatDate(dealQuote?.updatedAt)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
      <DialogActions className="bg-gray-50 px-6 py-4">
        <Button
          onClick={closeModal}
          color="inherit"
          variant="outlined"
          className="px-6 py-2 text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DealQuoteModal;
