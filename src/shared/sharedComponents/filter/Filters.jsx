import { Drawer, Box, Typography, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { X, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenFilter } from "../../../slices/sharedSlice";
import ProductFilter from "./components/ProductFilter";

const Filters = ({
  drawerProps = {},
  minHeight = "200px",
  Width = "400px",
  anchor = "right",
  route
}) => {
  const { openFilter } = useSelector((state) => state.sharedState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      setOpenFilter({
        name: "",
        module: null,
        isOpen: false,
      })
    );
  };

  return (
    <div>
      <Drawer
        anchor={anchor}
        open={openFilter?.isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: Width,
            minHeight: minHeight,
            boxSizing: "border-box",
            borderRadius: "16px 0 0 16px",
            boxShadow: "0 4px 24px 0 rgba(16,185,129,0.08)",
            background: "#f0fdf4",
            border: "1px solid #d1fae5",
          },
        }}
        {...drawerProps}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: minHeight,
            width: Width,
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(90deg,#d1fae5 0%,#f0fdf4 100%)",
              color: "#059669",
              padding: "16px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #d1fae5",
              borderRadius: "16px 0 0 0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Filter className="w-5 h-5 text-emerald-600" />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#059669",
                }}
              >
                Filter Options
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              edge="end"
              sx={{ color: "#059669" }}
            >
              <X className="w-5 h-5" />
            </IconButton>
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: "24px",
              background: "#f0fdf4",
            }}
          >
            <div className="space-y-4">
              <ProductFilter module={openFilter?.module} route={route} />
            </div>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

Filters.propTypes = {
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.string,
  minHeight: PropTypes.string,
  Width: PropTypes.string,
  anchor: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  children: PropTypes.node,
  buttonProps: PropTypes.object,
  drawerProps: PropTypes.object,
  route: PropTypes.any, // Added route prop validation
};

export default Filters;
