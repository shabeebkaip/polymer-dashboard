import React from "react";
import ProductFilter from "./components/ProductFilter";

const FilterRegistry = ({ module, route }) => {
  return (
    <div>
      <ProductFilter module={module} route={route} />
    </div>
  );
};

export default FilterRegistry;
