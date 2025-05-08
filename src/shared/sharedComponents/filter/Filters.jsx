import { Drawer, Box, Typography, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setOpenFilter } from "../../../slices/sharedSlice";
import ProductFilter from "./components/ProductFilter";

const Filters = ({
  buttonText = "Filter",
  drawerProps = {},
  minHeight = "200px",
  Width = "400px",
  anchor = "right",
  route,
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
              backgroundColor: "rgb(226 232 240)",
              color: "rgb(29 30 31)",
              padding: "8px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Filter Options</Typography>
            <IconButton onClick={handleClose} edge="end" sx={{ color: "#fff" }}>
              <CloseIcon style={{ color: "rgb(158 158 158)" }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
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
};

export default Filters;
