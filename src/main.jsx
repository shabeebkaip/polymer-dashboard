import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  typography: {
    fontFamily: ["Kanit", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#2952FF",
    },
    secondary: {
      main: "#474747",
    },
    error: {
      main: "#FF2952",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider autoHideDuration={2000} preventDuplicate dense>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
