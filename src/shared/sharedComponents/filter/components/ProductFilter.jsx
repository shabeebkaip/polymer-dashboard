import React, { useEffect, useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { FilterService } from "../Filter-Service";
import FormRegistry from "../../form/FormRegistry";
import eventBus from "../../../../utils/eventBus";

const ProductFilter = ({ module, route, onFilterChange }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
 console.log(formData,"llll");
 
  const handleDataChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    eventBus.emit(`${module}_FILTER`, {
      data: { data: formData },
    });

  };

  const handleClear = (e) => {
    e.preventDefault();
    setFormData({});
    eventBus.emit(`${module}_FILTER`, {
      data: { data: {} },
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await FilterService.getFilter(route);
      setFilters(response.data.filter);
      console.log(response.data.filter);
      
    } catch (error) {
      console.error("Error fetching filter:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5">
            {filters.map((filter, index) => (
              <FormRegistry data={filter} key={index} onChange={handleDataChange} />
            ))}
          </div>

          <div className="absolute bottom-0 flex justify-center pl-24">
            <Box sx={{ padding: "8px 16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {filters.length > 0 && (
                <>
                  <Button variant="contained" color="primary" sx={{ marginRight: 1 }} onClick={handleSubmit}>
                    Apply
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleClear}>
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductFilter;
