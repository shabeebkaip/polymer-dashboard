import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const MultiLookup = ({ data, onChange }) => {
  const handleChange = (key, value) => {
    onChange(key, value); // value is array of strings or objects depending on input
  };

  const isObjectArray = Array.isArray(data.data) && typeof data.data[0] === "object";

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="">{data.displayName}</label>
      <Autocomplete
        onChange={(event, newValue) => {
          handleChange(data.name, newValue);
        }}
        multiple
        disablePortal
        fullWidth
        options={data.data}
        getOptionLabel={(option) =>
          isObjectArray ? option.name || "" : option
        }
        isOptionEqualToValue={(option, value) =>
          isObjectArray ? option._id === value._id : option === value
        }
        renderInput={(params) => (
          <TextField {...params} label={`Select ${data.displayName}`} />
        )}
      />
    </div>
  );
};

export default MultiLookup;
