import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Chip,
  Grid,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../slices/requestSlice";
import PropTypes from "prop-types";
import LabelValue from "../../../shared/LabelValue";
import { Package, User, Building2, Truck } from "lucide-react";

const QuoteModal = () => {
  const dispatch = useDispatch();
  const { modal, quote } = useSelector((state) => state.requestState);

  const closeModal = () => {
    dispatch(setModal(false));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return { bg: "#FEF3C7", color: "#D97706", border: "#FDE68A" };
      case "approved":
        return { bg: "#D1FAE5", color: "#065F46", border: "#A7F3D0" };
      case "rejected":
        return { bg: "#FEE2E2", color: "#DC2626", border: "#FECACA" };
      default:
        return { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" };
    }
  };

  const statusStyle = getStatusColor(quote?.status);

  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="lg">
      <DialogTitle sx={{ pb: 2, borderBottom: "1px solid #E5E7EB" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 700, color: "#059669" }}
          >
            Quote Request Details
          </Typography>
          <Chip
            label={
              quote?.quoteType ||
              quote?.requestType?.replace("_", " ").toUpperCase()
            }
            sx={{
              background: "#059669",
              color: "white",
              fontWeight: 600,
              fontSize: "0.875rem",
              textTransform: "capitalize",
            }}
          />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Header Section */}
        <Box
          sx={{ p: 3, background: "white", borderBottom: "1px solid #F3F4F6" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Package size={20} style={{ color: "#059669" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#1F2937",
                    fontSize: "1.125rem",
                  }}
                >
                  {quote?.productName || "N/A"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <User size={16} style={{ color: "#6B7280" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#6B7280", fontSize: "0.875rem" }}
                  >
                    {quote?.buyer?.name || "N/A"}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Building2 size={16} style={{ color: "#6B7280" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#6B7280", fontSize: "0.875rem" }}
                  >
                    {quote?.buyer?.company || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="right">
                <Chip
                  label={quote?.status?.toUpperCase() || "UNKNOWN"}
                  sx={{
                    background: statusStyle.bg,
                    color: statusStyle.color,
                    border: `1px solid ${statusStyle.border}`,
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "0.75rem",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}
                >
                  Request ID: {quote?._id?.slice(-8) || "N/A"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Content Sections */}
        <Box sx={{ p: 3, background: "#FAFBFC" }}>
          <Grid container spacing={3}>
            {/* Buyer Details Card */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  background: "white",
                  borderRadius: 2,
                  p: 2.5,
                  border: "1px solid #E5E7EB",
                  height: "fit-content",
                }}
              >
                <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                  <Avatar sx={{ bgcolor: "#059669", width: 28, height: 28 }}>
                    <User size={16} />
                  </Avatar>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#059669", fontSize: "1rem" }}
                  >
                    Buyer Details
                  </Typography>
                </Box>
                <Box sx={{ display: "grid", gap: 1.5 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Name
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {quote?.buyer?.name || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {quote?.buyer?.email || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Company
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {quote?.buyer?.company || "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Order Details Card */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  background: "white",
                  borderRadius: 2,
                  p: 2.5,
                  border: "1px solid #E5E7EB",
                  height: "fit-content",
                }}
              >
                <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                  <Avatar sx={{ bgcolor: "#059669", width: 28, height: 28 }}>
                    <Package size={16} />
                  </Avatar>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#059669", fontSize: "1rem" }}
                  >
                    Order Details
                  </Typography>
                </Box>
                <Box sx={{ display: "grid", gap: 1.5 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Quantity
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {quote?.quantity?.toLocaleString() || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Unit
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {quote?.unit || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Grade
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {quote?.grade || "N/A"}
                    </Typography>
                  </Box>
                  {quote?.requestType === "product_quote" &&
                    quote?.productQuote?.application && (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#6B7280",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          Application
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                        >
                          {quote?.productQuote?.application}
                        </Typography>
                      </Box>
                    )}
                  {quote?.requestType === "deal_quote" &&
                    quote?.dealQuote?.offerPrice && (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#6B7280",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          Offer Price
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                        >
                          ${quote?.dealQuote?.offerPrice}
                        </Typography>
                      </Box>
                    )}
                </Box>
              </Box>
            </Grid>

            {/* Logistics Card */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  background: "white",
                  borderRadius: 2,
                  p: 2.5,
                  border: "1px solid #E5E7EB",
                  height: "fit-content",
                }}
              >
                <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                  <Avatar sx={{ bgcolor: "#059669", width: 28, height: 28 }}>
                    <Truck size={16} />
                  </Avatar>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#059669", fontSize: "1rem" }}
                  >
                    Logistics
                  </Typography>
                </Box>
                <Box sx={{ display: "grid", gap: 1.5 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Destination
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {quote?.destination || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Delivery Date
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {formatDate(quote?.deliveryDate)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Priority
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#1F2937",
                        fontSize: "0.875rem",
                        textTransform: "uppercase",
                      }}
                    >
                      {quote?.unified?.priorityLevel || "N/A"}
                    </Typography>
                  </Box>
                  {quote?.message && (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        Additional Notes
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          fontSize: "0.875rem",
                          fontStyle: "italic",
                          background: "#F9FAFB",
                          p: 1,
                          borderRadius: 1,
                          border: "1px solid #F3F4F6",
                        }}
                      >
                        {quote?.message}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 2.5,
          background: "white",
          borderTop: "1px solid #E5E7EB",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={closeModal}
          variant="outlined"
          size="medium"
          sx={{
            borderColor: "#D1D5DB",
            color: "#6B7280",
            fontWeight: 600,
            px: 3,
            py: 1,
            fontSize: "0.875rem",
            textTransform: "none",
            "&:hover": {
              borderColor: "#9CA3AF",
              background: "#F9FAFB",
            },
          }}
        >
          CLOSE
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
