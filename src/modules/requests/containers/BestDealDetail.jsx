import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { getBestDealDetailApi } from "../api";
import LabelValue from "../../../shared/LabelValue";
import { Star, User, Package, DollarSign, FileText, Users } from "lucide-react";

const BestDealDetail = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("Quote Requests:", quoteRequests);
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <CircularProgress size={40} className="text-emerald-600" />
          <p className="mt-4 text-gray-600">Loading best deal details...</p>
        </div>
      </div>
    );

  if (!deal)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-lg font-medium text-red-600">No deal found</p>
          <p className="text-gray-500">
            The requested best deal could not be found.
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
  console.log("Deal Data:", deal);
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Best Deal Details
            </h1>
            <p className="text-gray-600 text-sm">
              Deal ID: {deal.id || deal._id}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Chip
            label={deal.status}
            color={getStatusColor(deal.status)}
            size="small"
            className="font-medium"
          />
          {deal.statusTracking?.adminStatus && (
            <Chip
              label={`Admin: ${deal.statusTracking.adminStatus}`}
              color={getStatusColor(deal.statusTracking.adminStatus)}
              size="small"
              variant="outlined"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deal Overview */}
        <Card className="lg:col-span-2 shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                Deal Overview
              </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-700">
                  Offer Price
                </p>
                <p className="text-2xl font-bold text-emerald-800">
                  ${deal.offerPrice || "—"}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-700">Status</p>
                <p className="text-lg font-bold text-blue-800 capitalize">
                  {deal.status || "—"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-700">Created At</p>
                <p className="text-lg font-bold text-blue-800 capitalize">
                  {formatDate(deal?.createdAt) || "—"}
                </p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-700">
                  Updated At
                </p>
                <p className="text-2xl font-bold text-emerald-800">
                  {formatDate(deal?.updatedAt) || "—"}
                </p>
              </div>
              {deal.adminNote && (
                <div className="md:col-span-2">
                  <LabelValue label="Admin Note" value={deal.adminNote} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-emerald-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                Deal Stats
              </Typography>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-purple-700">
                  Total Requests
                </p>
                <p className="text-xl font-bold text-purple-800">
                  {deal.statusTracking?.totalRequests || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Product Information */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-emerald-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                Product Information
              </Typography>
            </div>
            <div className="space-y-3">
              <LabelValue
                label="Product Name"
                value={deal?.product?.productName || "—"}
              />
              <LabelValue
                label="Chemical Name"
                value={deal?.product?.chemicalName || "—"}
              />
              <LabelValue
                label="Trade Name"
                value={deal?.product?.tradeName || "—"}
              />
              <LabelValue
                label="Country of Origin"
                value={deal?.product?.countryOfOrigin || "—"}
              />
              <LabelValue
                label="Manufacturing Method"
                value={deal?.product?.manufacturingMethod || "—"}
              />
              <LabelValue label="Color" value={deal?.product?.color || "—"} />
            </div>
            {deal?.product?.specifications && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Specifications
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <LabelValue
                    label="Density"
                    value={deal?.product?.specifications?.density || "—"}
                  />
                  <LabelValue
                    label="MFI"
                    value={deal?.product?.specifications?.mfi || "—"}
                  />
                  <LabelValue
                    label="Tensile Strength"
                    value={
                      deal?.product?.specifications?.tensileStrength || "—"
                    }
                  />
                  <LabelValue
                    label="Shore Hardness"
                    value={deal?.product?.specifications?.shoreHardness || "—"}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seller Information */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-emerald-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                Seller Information
              </Typography>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-12 h-12 bg-blue-100 text-blue-700">
                {deal?.seller?.name?.[0] || deal?.seller?.firstName?.[0] || "S"}
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">
                  {deal?.seller?.name ||
                    `${deal?.seller?.firstName || ""} ${
                      deal?.seller?.lastName || ""
                    }`}
                </p>
                <p className="text-sm text-gray-600">{deal?.seller?.email}</p>
              </div>
            </div>
            <div className="space-y-3">
              <LabelValue
                label="Company"
                value={deal?.seller?.company || "—"}
              />
              <LabelValue
                label="Phone"
                value={deal?.seller?.phone?.toString() || "—"}
              />
              <LabelValue
                label="Address"
                value={
                  deal?.seller?.address?.full || deal?.seller?.address || "—"
                }
              />
              {deal?.seller?.location && (
                <LabelValue label="Location" value={deal?.seller?.location} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quote Requests Section */}
      <Card className="mt-6 shadow-sm border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-emerald-600" />
            <Typography variant="h6" className="font-semibold text-gray-800">
              Quote Requests ({quoteRequests.length})
            </Typography>
          </div>

          {quoteRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                No quote requests available
              </p>
              <p className="text-gray-400 text-sm">
                Buyers haven&apos;t submitted any requests yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {quoteRequests.map((request, idx) => {
                const buyer = request.buyer || request.buyerId || {};
                const dealDetails = request.dealDetails || {};
                return (
                  <Card
                    key={request._id || request.id || idx}
                    variant="outlined"
                    className="border border-gray-200"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 bg-indigo-100 text-indigo-700">
                            {buyer?.name?.[0] || buyer?.firstName?.[0] || "B"}
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">
                              {buyer?.name ||
                                `${buyer?.firstName || ""} ${
                                  buyer?.lastName || ""
                                }`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {buyer?.company}
                            </p>
                          </div>
                        </div>
                        {request.status && (
                          <Chip
                            label={request.status}
                            color={getStatusColor(request.status)}
                            size="small"
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-green-700">
                            Desired Quantity
                          </p>
                          <p className="text-lg font-bold text-green-800">
                            {dealDetails?.desiredQuantity?.toString() ||
                              request.desiredQuantity?.toString() ||
                              "—"}
                          </p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-orange-700">
                            Payment Terms
                          </p>
                          <p className="text-sm font-semibold text-orange-800">
                            {dealDetails?.paymentTerms ||
                              request.paymentTerms ||
                              "—"}
                          </p>
                        </div>
                        <div className="bg-pink-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-pink-700">
                            Delivery Deadline
                          </p>
                          <p className="text-sm font-semibold text-pink-800">
                            {formatDate(
                              dealDetails?.deliveryDeadline ||
                                request.deliveryDeadline ||
                                request.timeline?.deadline
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <LabelValue label="Email" value={buyer?.email || "—"} />
                        <LabelValue
                          label="Phone"
                          value={buyer?.phone?.toString() || "—"}
                        />
                        <LabelValue
                          label="Address"
                          value={buyer?.address || buyer?.location || "—"}
                        />
                        <LabelValue
                          label="Shipping Country"
                          value={
                            dealDetails?.shippingCountry ||
                            request.shippingCountry ||
                            "—"
                          }
                        />
                      </div>

                      {(dealDetails?.message || request.message) && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Message
                          </p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {dealDetails?.message || request.message}
                          </p>
                        </div>
                      )}

                      {request.adminNote && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Admin Note
                          </p>
                          <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            {request.adminNote}
                          </p>
                        </div>
                      )}

                      {/* Request Type Badge */}
                      {request.requestType && (
                        <div className="mb-4">
                          <Chip
                            label={request.requestType
                              .replace("_", " ")
                              .toUpperCase()}
                            size="small"
                            variant="outlined"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          />
                        </div>
                      )}

                      {/* Timeline Information */}
                      {request.timeline && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Timeline
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500">Requested:</span>
                              <p className="font-medium">
                                {formatDate(request.timeline.requested)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Last Update:
                              </span>
                              <p className="font-medium">
                                {formatDate(request.timeline.lastUpdate)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Deadline:</span>
                              <p className="font-medium">
                                {formatDate(request.timeline.deadline)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4 pt-4 border-t text-xs text-gray-500">
                        <span>Created: {formatDate(request.createdAt)}</span>
                        <span>Updated: {formatDate(request.updatedAt)}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BestDealDetail;
