import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { enqueueSnackbar } from "notistack";
import EditIcon from "../../assets/edit.svg";
import ActionButton from "../../shared/ActionButton"; 
import createIcon from "../../assets/create.svg"; 

const processDisplayFields = (displayFields) => {
  if (!displayFields || !Array.isArray(displayFields)) return [];
  if (
    displayFields.length > 0 &&
    typeof displayFields[0] === "object" &&
    displayFields[0].key
  ) {
    return displayFields;
  }
  return displayFields.map((field) => ({
    key: field,
    label: field.charAt(0).toUpperCase() + field.slice(1),
    type: "text",
  }));
};

const AddEditCardSection = ({
  mode,
  cardData,
  section,
  route,
  displayFields,
  getHomePageData,
  crudOperations,
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [processedFields, setProcessedFields] = useState([]);

  useEffect(() => {
    setProcessedFields(processDisplayFields(displayFields));
  }, [displayFields]);

  useEffect(() => {
    if (mode === "edit" && cardData) {
      setData(cardData);
    } else {
      setData({});
    }
    setValidationErrors({});
  }, [cardData, mode]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValidationErrors({});
  };

  const onFieldChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
  };

  const validateFields = () => {
    const errors = {};
    processedFields.forEach((field) => {
      if (
        field.type === "text" &&
        (!data[field.key] || String(data[field.key]).trim() === "")
      ) {
        errors[field.key] = `${field.label} is required`;
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      enqueueSnackbar("Please fill in all required fields.", {
        variant: "warning",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }

    const payload = {};
    processedFields.forEach((field) => {
      payload[field.key] = data[field.key] !== undefined ? data[field.key] : "";
    });

    try {
      let response;
      if (mode === "add") {
        response = await crudOperations.create({
          section,
          content: payload,
        });
      } else {
        response = await crudOperations.update(payload, data.id);
      }

      if (response?.data?.status || response?.data?.success) {
        setOpen(false);
        if (getHomePageData) getHomePageData();
        enqueueSnackbar(
          response.data.message || `${mode} operation successful.`,
          {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          }
        );
      } else {
        enqueueSnackbar(response?.data?.message || "Operation failed.", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      console.error(`Error on ${mode} request`, error);
      enqueueSnackbar("Something went wrong!", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const StyledHelperText = ({ children }) => (
    <span className="block mt-1 text-xs text-red-500">{children}</span>
  );

  return (
    <>
      {mode === "add" ? (
        <ActionButton
          buttonText={`Add ${section}`}
          handleOnClick={handleOpen}
          textColor="#ffffff"
          bgColor="rgb(41, 82, 255)"
          icon={createIcon}
        />
      ) : (
        <div
          onClick={handleOpen}
          className="flex w-full gap-3 p-2 rounded cursor-pointer hover:bg-gray-50"
        >
          <img src={EditIcon} alt="Edit" className="w-5 h-5" />
          <div className="text-[#2B3674] text-[17px] font-bold">Edit</div>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}
      >
        <DialogTitle className="text-[24px] font-medium">
          {mode === "add" ? `Add New ${section}` : `Edit ${section}`}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent dividers>
          <Box component="form" noValidate autoComplete="off">
            {processedFields.map((field) => (
              <div key={field.key} className="mb-4">
                <h3 className="text-[15px] mb-1">{field.label}</h3>
                <TextField
                  fullWidth
                  multiline={["shortDescription", "fullStoryUrl"].includes(field.key)}
                  rows={
                    ["shortDescription"].includes(field.key) ? 3 : undefined
                  }
                  value={data[field.key] || ""}
                  onChange={(e) => onFieldChange(field.key, e.target.value)}
                  error={!!validationErrors[field.key]}
                  helperText={
                    validationErrors[field.key] ? (
                      <StyledHelperText>
                        {validationErrors[field.key]}
                      </StyledHelperText>
                    ) : (
                      ""
                    )
                  }
                />
              </div>
            ))}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", py: 2 }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ backgroundColor: "#FF6410", width: "100px" }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ color: "#FF6410", borderColor: "#FF6410" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEditCardSection;
