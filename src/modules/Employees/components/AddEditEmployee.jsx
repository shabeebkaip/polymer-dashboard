import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { addEmployeeApi, editEmployeeApi } from "../api";
import { enqueueSnackbar } from "notistack";

const AddEditEmployee = ({
  open,
  closeModal,
  item,
  getResponseBack,
  mode,
  setMode,
}) => {
  const [data, setData] = useState({ gender: "male" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (item) {
      setData(item);
    }
  }, [item]);
  const handleSave = () => {
    let validateInput = {
      name: data.name ? "" : "Name is required",
      email: data.email ? "" : "Email is required",
      phone: data.phone ? "" : "Phone is required",
      countryCode: data.countryCode ? "" : "Country Code is required",
      position: data.position ? "" : "Position is required",
      salary: data.salary ? "" : "Salary is required",
      dob: data.dob ? "" : "Date of Birth is required",
      date: data.date ? "" : "Date of Joining is required",
      address: data.address ? "" : "Address is required",
    };
    let payload = Object.assign({}, data, {
      dob: moment(data.dob).format("YYYY-MM-DD"),
      date: moment(data.date).format("YYYY-MM-DD"),
    });
    if (Object.keys(validateInput).every((key) => validateInput[key] === "")) {
      if (mode === "add") {
        setLoading(true);
        addEmployeeApi(payload)
          .then((response) => {
            setLoading(false);
            if (response.success) {
              closeModal();
              getResponseBack();
              enqueueSnackbar(response.message, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            } else {
              enqueueSnackbar(response.message, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            enqueueSnackbar(error.message, {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          });
      } else {
        setLoading(true);
        editEmployeeApi(payload, data.id).then((response) => {
          setLoading(false);
          if (response.success) {
            closeModal();
            getResponseBack();
            enqueueSnackbar(response.message, {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
        });
      }
    } else {
      setErrors(validateInput);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="add-edit-employee"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="add-edit-employee">
          <div className="flex items-center justify-between ">
            {mode === "view"
              ? "View Employee"
              : mode === "add"
              ? "Add Employee"
              : "Edit Employee"}
            {mode === "view" && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => setMode("edit")}
              >
                Edit
              </Button>
            )}
            {mode === "edit" && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => setMode("view")}
              >
                View
              </Button>
            )}
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Name"
              variant={mode === "view" ? "standard" : "outlined"}
              margin="dense"
              fullWidth
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              slotProps={{
                input: { readOnly: mode === "view" },
              }}
              error={!!errors.name}
              helperText={errors.name}
              onFocus={() => setErrors({ ...errors, name: "" })}
              required
            />
            <TextField
              label="Email"
              variant={mode === "view" ? "standard" : "outlined"}
              margin="dense"
              fullWidth
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              slotProps={{
                input: { readOnly: mode === "view" },
              }}
              error={!!errors.email}
              helperText={errors.email}
              onFocus={() => setErrors({ ...errors, email: "" })}
              required
            />
            <div className="grid w-full grid-cols-5 gap-4">
              <TextField
                label="Country Code"
                variant={mode === "view" ? "standard" : "outlined"}
                margin="dense"
                fullWidth
                value={data.countryCode}
                onChange={(e) =>
                  setData({ ...data, countryCode: e.target.value })
                }
                slotProps={{
                  input: { readOnly: mode === "view" },
                }}
                className="col-span-2"
                error={!!errors.countryCode}
                helperText={errors.countryCode}
                onFocus={() => setErrors({ ...errors, countryCode: "" })}
                required
              />
              <TextField
                label="Phone"
                variant={mode === "view" ? "standard" : "outlined"}
                margin="dense"
                fullWidth
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="col-span-3"
                slotProps={{
                  input: { readOnly: mode === "view" },
                }}
                error={!!errors.phone}
                helperText={errors.phone}
                onFocus={() => setErrors({ ...errors, phone: "" })}
                required
              />
            </div>
            <TextField
              label="Role"
              variant={mode === "view" ? "standard" : "outlined"}
              margin="dense"
              fullWidth
              value={data.position}
              onChange={(e) => setData({ ...data, position: e.target.value })}
              slotProps={{
                input: { readOnly: mode === "view" },
              }}
              error={!!errors.position}
              helperText={errors.position}
              onFocus={() => setErrors({ ...errors, position: "" })}
              required
            />
            <TextField
              label="Salary"
              variant={mode === "view" ? "standard" : "outlined"}
              margin="dense"
              fullWidth
              value={data.salary}
              onChange={(e) => setData({ ...data, salary: e.target.value })}
              type="number"
              slotProps={{
                input: { readOnly: mode === "view" },
              }}
              error={!!errors.salary}
              helperText={errors.salary}
              onFocus={() => setErrors({ ...errors, salary: "" })}
              required
            />
            {mode === "view" ? (
              <TextField
                label="Gender"
                variant="standard"
                margin="dense"
                fullWidth
                value={data.gender}
                slotProps={{
                  input: { readOnly: mode === "view" },
                }}
              />
            ) : (
              <div>
                <label>Gender</label>
                <div>
                  <RadioGroup
                    row
                    value={data.gender}
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                    InputProps={{
                      readOnly: mode === "view",
                    }}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio checked={data.gender === "male"} />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio checked={data.gender === "female"} />}
                      label="Female"
                    />
                  </RadioGroup>
                </div>
              </div>
            )}
            <TextField
              label="Nationality"
              variant={mode === "view" ? "standard" : "outlined"}
              margin="dense"
              fullWidth
              value={data.nationality}
              onChange={(e) =>
                setData({ ...data, nationality: e.target.value })
              }
              slotProps={{
                input: { readOnly: mode === "view" },
              }}
            />
            <TextField
              label="Passport Number"
              variant={mode === "view" ? "standard" : "outlined"}
              margin="dense"
              fullWidth
              value={data.passportNumber}
              onChange={(e) =>
                setData({ ...data, passportNumber: e.target.value })
              }
              slotProps={{
                input: { readOnly: mode === "view" },
              }}
            />
            {mode === "view" ? (
              <TextField
                label="DOB"
                variant="standard"
                margin="dense"
                fullWidth
                value={data.dob ? moment(data.dob).format("DD/MM/YYYY") : ""}
                slotProps={{
                  input: { readOnly: mode === "view" },
                }}
              />
            ) : (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="DOB"
                  value={data.dob ? moment(data.dob) : null}
                  onChange={(newValue) => {
                    setData({ ...data, dob: newValue });
                  }}
                  maxDate={data.date ? moment(data.date) : moment()}
                  slotProps={{
                    textField: {
                      InputLabelProps: { shrink: true },
                      readOnly: mode === "view",
                      error: !!errors.dob,
                      helperText: errors.dob,
                      onFocus: () => setErrors({ ...errors, dob: "" }),
                      required: true,
                    },
                    input: { readOnly: mode === "view" },
                  }}
                  className="w-full"
                />
              </LocalizationProvider>
            )}
            {mode === "view" ? (
              <TextField
                label="Date of Joining"
                variant="standard"
                margin="dense"
                fullWidth
                value={data.date ? moment(data.date).format("DD/MM/YYYY") : ""}
                slotProps={{
                  input: { readOnly: mode === "view" },
                }}
              />
            ) : (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Date of Joining"
                  value={data.date ? moment(data.date) : null}
                  onChange={(newValue) => {
                    setData({ ...data, date: newValue });
                  }}
                  maxDate={moment()}
                  slotProps={{
                    textField: {
                      InputLabelProps: { shrink: true },
                      error: !!errors.date,
                      helperText: errors.date,
                      onFocus: () => setErrors({ ...errors, date: "" }),
                      required: true,
                    },
                  }}
                  className="w-full"
                  InputProps={{
                    readOnly: mode === "view",
                  }}
                />
              </LocalizationProvider>
            )}
          </div>
          <TextField
            label="Address"
            variant={mode === "view" ? "standard" : "outlined"}
            margin="dense"
            fullWidth
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            slotProps={{
              input: { readOnly: mode === "view" },
            }}
            error={!!errors.address}
            helperText={errors.address}
            onFocus={() => setErrors({ ...errors, address: "" })}
            required
          />
        </DialogContent>
        <DialogActions>
          {mode === "view" ? (
            <Button
              onClick={() => {
                closeModal();
              }}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  handleSave();
                }}
                color="primary"
                variant="contained"
              >
                {loading ? (
                  <CircularProgress size="30px" style={{ color: "#ffffff" }} />
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                onClick={() => closeModal()}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddEditEmployee.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  item: PropTypes.object,
  getResponseBack: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default AddEditEmployee;
