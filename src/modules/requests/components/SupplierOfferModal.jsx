import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../../slices/requestSlice";
import LabelValue from "../../../shared/LabelValue";
import {
  Package,
  User,
  DollarSign,
  Truck,
  Calendar,
  FileText,
  MapPin,
} from "lucide-react";

const SupplierOfferModal = () => {
  const dispatch = useDispatch();
  const { modal, supplierOffer } = useSelector((state) => state.requestState);

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

  const supplierName = supplierOffer?.supplierId?.name || "—";
  const supplierEmail = supplierOffer?.supplierId?.email || "—";
  const productName = supplierOffer?.bulkOrderId?.product?.productName || "—";
  const quantityWithUOM = supplierOffer?.bulkOrderId?.uom
    ? `${supplierOffer?.availableQuantity || "—"} ${
        supplierOffer?.bulkOrderId?.uom
      }`
    : supplierOffer?.availableQuantity || "—";

  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="lg">
      <DialogTitle className="bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-emerald-600" />
          <span className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Supplier Offer Details
          </span>
        </div>
      </DialogTitle>
      <DialogContent dividers className="bg-gray-50">
        <div className="space-y-6 p-4">
          {/* Offer Overview */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Offer Overview
                  </Typography>
                </div>
                <Chip
                  label={supplierOffer?.status || "—"}
                  color={getStatusColor(supplierOffer?.status)}
                  size="small"
                  className="font-medium"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-emerald-700">
                    Price per Unit
                  </p>
                  <p className="text-xl font-bold text-emerald-800">
                    ${supplierOffer?.pricePerUnit || "—"}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-700">
                    Available Quantity
                  </p>
                  <p className="text-xl font-bold text-blue-800">
                    {quantityWithUOM}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-700">
                    Delivery Time
                  </p>
                  <p className="text-lg font-bold text-purple-800">
                    {supplierOffer?.deliveryTimeInDays || "—"} days
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
                    label="Bulk Order ID"
                    value={supplierOffer?.bulkOrderId?._id || "—"}
                  />
                  <LabelValue
                    label="Requested Quantity"
                    value={
                      supplierOffer?.bulkOrderId?.uom
                        ? `${supplierOffer?.bulkOrderId?.quantity || "—"} ${
                            supplierOffer?.bulkOrderId?.uom
                          }`
                        : supplierOffer?.bulkOrderId?.quantity || "—"
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Shipping & Terms
                  </Typography>
                </div>
                <div className="space-y-3">
                  <LabelValue
                    label="Incoterm & Packaging"
                    value={supplierOffer?.incotermAndPackaging || "—"}
                  />
                  <LabelValue
                    label="Delivery Time"
                    value={`${supplierOffer?.deliveryTimeInDays || "—"} days`}
                  />
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Destination
                      </p>
                      <p className="text-sm text-gray-600">
                        {supplierOffer?.bulkOrderId?.destination || "—"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {supplierOffer?.bulkOrderId?.city},{" "}
                        {supplierOffer?.bulkOrderId?.country}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supplier Information */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-emerald-600" />
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800"
                >
                  Supplier Information
                </Typography>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12 bg-green-100 text-green-700">
                  {supplierName?.[0] || "S"}
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{supplierName}</p>
                  <p className="text-sm text-gray-600">{supplierEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message & Additional Info */}
          {supplierOffer?.message && (
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Message
                  </Typography>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {supplierOffer.message}
                </p>
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
                  value={formatDate(supplierOffer?.createdAt)}
                />
                <LabelValue
                  label="Updated At"
                  value={formatDate(supplierOffer?.updatedAt)}
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

export default SupplierOfferModal;
