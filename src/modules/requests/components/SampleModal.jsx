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
import { Package, User, Building2, MapPin } from "lucide-react";

const SampleModal = () => {
  const dispatch = useDispatch();
  const { modal, sample } = useSelector((state) => state.requestState);

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
      case "completed":
        return { bg: "#DBEAFE", color: "#1D4ED8", border: "#BFDBFE" };
      case "rejected":
        return { bg: "#FEE2E2", color: "#DC2626", border: "#FECACA" };
      default:
        return { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" };
    }
  };

  const statusStyle = getStatusColor(sample?.status);

  return (
    <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="lg">
      <DialogTitle sx={{ pb: 2, borderBottom: "1px solid #E5E7EB" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 700, color: "#059669" }}
          >
            Sample Request Details
          </Typography>
          <Chip
            label="Sample Request"
            sx={{
              background: "#059669",
              color: "white",
              fontWeight: 600,
              fontSize: "0.875rem",
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
                  {sample?.product?.productName || "N/A"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <User size={16} style={{ color: "#6B7280" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#6B7280", fontSize: "0.875rem" }}
                  >
                    {sample?.user?.name || "N/A"}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Building2 size={16} style={{ color: "#6B7280" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#6B7280", fontSize: "0.875rem" }}
                  >
                    {sample?.user?.company || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="right">
                <Chip
                  label={sample?.status?.toUpperCase() || "UNKNOWN"}
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
                  Request ID: {sample?._id?.slice(-8) || "N/A"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Content Sections */}
        <Box sx={{ p: 3, background: "#FAFBFC" }}>
          <Grid container spacing={3}>
            {/* Requestor Details Card */}
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
                    Requestor Details
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
                      {sample?.user?.name || "N/A"}
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
                      {sample?.user?.email || "N/A"}
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
                      {sample?.user?.company || "N/A"}
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
                      Phone
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {sample?.phone || "N/A"}
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
                      Request Date
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {formatDate(sample?.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Sample Details Card */}
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
                    Sample Details
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
                      {sample?.quantity || "N/A"}
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
                      UOM
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {sample?.uom || "N/A"}
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
                      {sample?.grade?.name || "N/A"}
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
                      Application
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {sample?.application || "N/A"}
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
                      Sample Price
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {sample?.samplePrice ? `$${sample.samplePrice}` : "N/A"}
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
                      Free Sample
                    </Typography>
                    <Chip
                      label={
                        sample?.forFree === true
                          ? "Yes"
                          : sample?.forFree === false
                          ? "No"
                          : "N/A"
                      }
                      size="small"
                      sx={{
                        background: sample?.forFree ? "#D1FAE5" : "#FEE2E2",
                        color: sample?.forFree ? "#065F46" : "#DC2626",
                        fontSize: "0.75rem",
                        height: "20px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Shipping & Additional Info Card */}
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
                    <MapPin size={16} />
                  </Avatar>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#059669", fontSize: "1rem" }}
                  >
                    Shipping & Info
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
                      Street Name
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {sample?.streetName || "N/A"}
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
                      City
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {sample?.city || "N/A"}
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
                      Post Code
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {sample?.postCode || "N/A"}
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
                      Country
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {sample?.country || "N/A"}
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
                      Needed By
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1F2937", fontSize: "0.875rem" }}
                    >
                      {formatDate(sample?.neededBy)}
                    </Typography>
                  </Box>
                  {sample?.message && (
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
                        Message
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
                        {sample?.message}
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

export default SampleModal;
