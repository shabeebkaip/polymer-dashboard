import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { addEmployeeApi, editEmployeeApi } from "../api";
import { createLogApi } from "../../Logs/api";

const AddEditEmployee = ({ open, closeModal, item, getResponseBack, mode }) => {
  const [data, setData] = React.useState({});
  useEffect(() => {
    if (item) {
      setData(item);
    }
  }, [item]);
  console.log(data, "data");

  const handleSave = () => {
    if (mode === "add") {
      addEmployeeApi(data).then((response) => {
        if (response.success) {
          closeModal();
          getResponseBack();
          createLogApi({
            user_name: JSON.parse(localStorage.getItem("user")).username,
            activity: `Added ${data.name} to the employees list`,
          });
        }
      });
    } else {
      editEmployeeApi(data, data._id).then((response) => {
        console.log(response, "response");
        if (response.success) {
          closeModal();
          getResponseBack();
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
        <DialogTitle id="add-edit-employee">Add Employee</DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Name"
              variant="outlined"
              margin="dense"
              fullWidth
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="dense"
              fullWidth
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <div className="grid w-full grid-cols-5 gap-4">
              <TextField
                label="Country Code"
                variant="outlined"
                margin="dense"
                fullWidth
                value={data.countryCode}
                onChange={(e) =>
                  setData({ ...data, countryCode: e.target.value })
                }
                className="col-span-2"
              />
              <TextField
                label="Phone"
                variant="outlined"
                margin="dense"
                fullWidth
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <TextField
              label="Role"
              variant="outlined"
              margin="dense"
              fullWidth
              value={data.position}
              onChange={(e) => setData({ ...data, position: e.target.value })}
            />
            <TextField
              label="Salary"
              variant="outlined"
              margin="dense"
              fullWidth
              value={data.salary}
              onChange={(e) => setData({ ...data, salary: e.target.value })}
              type="number"
            />
            <div>
              <label>Gender</label>
              <div>
                <RadioGroup
                  row
                  value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
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
            <TextField
              label="Nationality"
              variant="outlined"
              margin="dense"
              fullWidth
              value={data.nationality}
              onChange={(e) =>
                setData({ ...data, nationality: e.target.value })
              }
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
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleSave();
            }}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
          <Button
            onClick={() => closeModal()}
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
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
};

export default AddEditEmployee;
