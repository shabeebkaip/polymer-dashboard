import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const Lookup = ({ data, onChange }) => {
  const handleChange = (key, value) => {
    // If value is an object with a `value` key, extract it
    const finalValue = value?.value !== undefined ? value.value : value;
    onChange(key, finalValue);
  };

  const getOptionLabel = (option) => {
    if (typeof option === "boolean") return option ? "Yes" : "No";
    if (typeof option === "string" || typeof option === "number")
      return String(option);
    if (typeof option === "object" && option !== null) {
      return option.label || option.name || option.displayName || "Unknown";
    }
    return "Unknown";
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="">{data?.displayName}</label>

      {Array.isArray(data?.data) && data.data.length > 0 ? (
        <Autocomplete
          onChange={(event, newValue) => handleChange(data.name, newValue)}
          disablePortal
          options={data.data}
          fullWidth
          getOptionLabel={getOptionLabel}
          renderInput={(params) => (
            <TextField {...params} label={`Select ${data.displayName}`} />
          )}
        />
      ) : (
        <TextField
          fullWidth
          type="number"
          label={`Enter ${data?.displayName}`}
          onChange={(e) => handleChange(data.name, Number(e.target.value))}
          inputProps={{ min: 1, max: 9 }}
        />
      )}
    </div>
  );
};

export default Lookup;
