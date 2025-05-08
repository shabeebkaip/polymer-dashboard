import React from "react";
import MultiLookup from "./components/MultiLookup";
import Date from "./components/Date";
import Lookup from "./components/Lookup";

const FormComponents = {
  multiLookup: MultiLookup,
  lookup: Lookup,
  date: Date,
};

const FormRegistry = ({ data, onChange }) => {
  const Component = FormComponents[data.component];

  const handleChange = (key, value) => {
    onChange(key, value);
  };

  return (
    <div>
      {Component ? (
        <Component data={data} onChange={handleChange} />
      ) : (
        <p>Component not found</p>
      )}
    </div>
  );
};

export default FormRegistry;
