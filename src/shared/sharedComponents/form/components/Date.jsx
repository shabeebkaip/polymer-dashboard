import React from "react";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const Date = ({ data, onChange }) => {
  const handleChange = (key, value) => {
    onChange(key, value);
  };

  return (
    <div className="">
      <label htmlFor="">{data.displayName}</label>
      <div className="grid grid-cols-1 gap-5 my-3">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Start Date *"
            // value={data.st_date ? moment(data.st_date) : null}
            // minDate={data.end_date ? moment(data.end_date) : moment()}
            // inputFormat="DD/MM/YYYY"
            onChange={(newValue) => {
              handleChange("startDate", newValue);
            }}
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
            label="End Date *"
            // value={data.end_date ? moment(data.end_date) : null}
            inputFormat="DD/MM/YYYY"
            // minDate={data.st_date ? moment(data.st_date) : moment()}
            onChange={(newValue) => {
              handleChange("endDate", newValue);
            }}
            slotProps={{
              textField: {
                InputLabelProps: { shrink: true },
              },
            }}
            className="w-full"
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Date;
