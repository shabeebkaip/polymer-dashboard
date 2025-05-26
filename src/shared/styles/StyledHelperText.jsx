import { styled } from "@mui/material";

const StyledHelperText = styled("span")(({ theme }) => ({
  position: "absolute",
  bottom: "-20px",
  right: 0,
  color: theme.palette.error.main,
  fontSize: "0.75rem",
}));

export default StyledHelperText;
