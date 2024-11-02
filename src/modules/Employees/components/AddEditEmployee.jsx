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
import { createLogApi } from "../../Logs/api";
import { enqueueSnackbar } from "notistack";

const AddEditEmployee = ({
  open,
  closeModal,
  item,
  getResponseBack,
  mode,
  setMode,
}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(mode, "item");
  useEffect(() => {
    if (item) {
      setData(item);
    }
  }, [item]);
  console.log(data, "data");

  const handleSave = () => {
    if (mode === "add") {
      setLoading(true);
      addEmployeeApi(data).then((response) => {
        setLoading(false);
        if (response.success) {
          closeModal();
          getResponseBack();
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          createLogApi({
            user_name: JSON.parse(localStorage.getItem("user")).username,
            activity: `Added ${data.name} to the employees list`,
          });
        }
      });
    } else {
      setLoading(true);
      editEmployeeApi(data, data._id).then((response) => {
        setLoading(false);
        if (response.success) {
          closeModal();
          getResponseBack();
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          createLogApi({
            user_name: JSON.parse(localStorage.getItem("user")).username,
            activity: `Edited ${data.name}'s details `,
          });
        }
      });
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
              InputProps={{
                readOnly: mode === "view",
              }}
            />
            <TextField
              label="Email"
              variant={mode === "view" ? "standard" : "outlined"}
              margin="dense"
              fullWidth
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              InputProps={{
                readOnly: mode === "view",
              }}
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
                InputProps={{
                  readOnly: mode === "view",
                }}
                className="col-span-2"
              />
              <TextField
                label="Phone"
                variant={mode === "view" ? "standard" : "outlined"}
                margin="dense"
                fullWidth
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="col-span-3"
                InputProps={{
                  readOnly: mode === "view",
                }}
              />
            </div>
            <TextField
              label="Role"
              variant={mode === "view" ? "standard" : "outlined"}
              margin="dense"
              fullWidth
              value={data.position}
              onChange={(e) => setData({ ...data, position: e.target.value })}
              InputProps={{
                readOnly: mode === "view",
              }}
            />
            <TextField
              label="Salary"
              variant={mode === "view" ? "standard" : "outlined"}
              margin="dense"
              fullWidth
              value={data.salary}
              onChange={(e) => setData({ ...data, salary: e.target.value })}
              type="number"
              InputProps={{
                readOnly: mode === "view",
              }}
            />
            {mode === "view" ? (
              <TextField
                label="Gender"
                variant="standard"
                margin="dense"
                fullWidth
                value={data.gender}
                InputProps={{
                  readOnly: true,
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
              variant="outlined"
              margin="dense"
              fullWidth
              value={data.nationality}
              onChange={(e) =>
                setData({ ...data, nationality: e.target.value })
              }
              InputProps={{
                readOnly: mode === "view",
              }}
            />
            <TextField
              label="Passport Number"
              variant="outlined"
              margin="dense"
              fullWidth
              value={data.passportNumber}
              onChange={(e) =>
                setData({ ...data, passportNumber: e.target.value })
              }
              InputProps={{
                readOnly: mode === "view",
              }}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="DOB*"
                value={data.dob ? moment(data.dob) : null}
                onChange={(newValue) => {
                  setData({ ...data, dob: newValue });
                }}
                maxDate={data.date ? moment(data.date) : moment()}
                slotProps={{
                  textField: {
                    InputLabelProps: { shrink: true },
                  },
                }}
                className="w-full"
                InputProps={{
                  readOnly: mode === "view",
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date of Joining*"
                value={data.date ? moment(data.date) : null}
                onChange={(newValue) => {
                  setData({ ...data, date: newValue });
                }}
                maxDate={moment()}
                slotProps={{
                  textField: {
                    InputLabelProps: { shrink: true },
                  },
                }}
                className="w-full"
                InputProps={{
                  readOnly: mode === "view",
                }}
              />
            </LocalizationProvider>
          </div>
          <TextField
            label="Address"
            variant="outlined"
            margin="dense"
            fullWidth
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            InputProps={{
              readOnly: mode === "view",
            }}
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
