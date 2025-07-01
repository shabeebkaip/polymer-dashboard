import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const ProductFilters = ({ filterOptions, onFilterApply, currentFilters = {} }) => {
  const [localFilters, setLocalFilters] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [expandedPanels, setExpandedPanels] = useState({});

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = (filterName, value, isArray = true) => {
    setLocalFilters(prev => {
      const newFilters = { ...prev };
      
      if (isArray) {
        if (!newFilters[filterName]) {
          newFilters[filterName] = [];
        }
        
        const currentArray = [...newFilters[filterName]];
        const valueIndex = currentArray.indexOf(value);
        
        if (valueIndex > -1) {
          currentArray.splice(valueIndex, 1);
        } else {
          currentArray.push(value);
        }
        
        if (currentArray.length === 0) {
          delete newFilters[filterName];
        } else {
          newFilters[filterName] = currentArray;
        }
      } else {
        if (newFilters[filterName] === value) {
          delete newFilters[filterName];
        } else {
          newFilters[filterName] = value;
        }
      }
      
      return newFilters;
    });
  };

  const handleSearchChange = (filterName, searchTerm) => {
    setSearchTerms(prev => ({
      ...prev,
      [filterName]: searchTerm
    }));
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanels(prev => ({
      ...prev,
      [panel]: isExpanded
    }));
  };

  const applyFilters = () => {
    onFilterApply(localFilters);
  };

  const clearFilters = () => {
    setLocalFilters({});
    setSearchTerms({});
    onFilterApply({});
  };

  const isFilterActive = (filterName, value = null) => {
    if (value === null) {
      return localFilters[filterName] !== undefined;
    }
    
    if (Array.isArray(localFilters[filterName])) {
      return localFilters[filterName].includes(value);
    }
    
    return localFilters[filterName] === value;
  };

  const getFilteredData = (data, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderFilterSection = (filter) => {
    const searchTerm = searchTerms[filter.name] || '';
    const filteredData = filter.searchable 
      ? getFilteredData(filter.data, searchTerm)
      : filter.data;

    return (
      <Accordion
        key={filter.name}
        expanded={expandedPanels[filter.name] || false}
        onChange={handleAccordionChange(filter.name)}
        sx={{ boxShadow: 1, mb: 1 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: isFilterActive(filter.name) ? '#e3f2fd' : '#fafafa',
            '&:hover': { backgroundColor: '#f0f0f0' }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {filter.displayName}
            </Typography>
            {isFilterActive(filter.name) && (
              <Chip
                size="small"
                label={
                  Array.isArray(localFilters[filter.name])
                    ? localFilters[filter.name].length
                    : '1'
                }
                color="primary"
                sx={{ ml: 'auto', mr: 2 }}
              />
            )}
          </Box>
        </AccordionSummary>
        
        <AccordionDetails sx={{ pt: 1 }}>
          {filter.searchable && (
            <TextField
              size="small"
              placeholder={`Search ${filter.displayName.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => handleSearchChange(filter.name, e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'gray', mr: 1 }} />
              }}
            />
          )}
          
          {filter.filterType === 'boolean' ? (
            <FormControl component="fieldset">
              <RadioGroup
                value={localFilters[filter.name] || ''}
                onChange={(e) => {
                  const value = e.target.value === 'true' ? true : 
                               e.target.value === 'false' ? false : undefined;
                  if (value !== undefined) {
                    handleFilterChange(filter.name, value, false);
                  }
                }}
              >
                {filteredData.map((option) => (
                  <FormControlLabel
                    key={option._id.toString()}
                    value={option._id.toString()}
                    control={<Radio size="small" />}
                    label={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{option.name}</span>
                        <Chip size="small" label={option.count} variant="outlined" />
                      </Box>
                    }
                    sx={{ margin: 0, width: '100%' }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <FormGroup>
              {filteredData.map((option) => (
                <FormControlLabel
                  key={option._id}
                  control={
                    <Checkbox
                      size="small"
                      checked={isFilterActive(filter.name, option._id)}
                      onChange={() => handleFilterChange(filter.name, option._id)}
                      disabled={option.count === 0}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{ 
                        color: option.count === 0 ? '#ccc' : 'inherit',
                        textDecoration: option.count === 0 ? 'line-through' : 'none'
                      }}>
                        {option.name}
                      </span>
                      <Chip 
                        size="small" 
                        label={option.count} 
                        variant="outlined"
                        sx={{ 
                          opacity: option.count === 0 ? 0.5 : 1,
                          backgroundColor: option.count === 0 ? '#f5f5f5' : 'inherit'
                        }}
                      />
                    </Box>
                  }
                  sx={{ margin: 0, width: '100%' }}
                />
              ))}
            </FormGroup>
          )}
        </AccordionDetails>
      </Accordion>
    );
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;

  return (
    <Paper sx={{ p: 2, mb: 2, backgroundColor: '#fafafa' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Product Filters
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={applyFilters}
            disabled={!hasActiveFilters}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Top Filters */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Quick Filters
          </Typography>
          <Grid container spacing={2}>
            {filterOptions.filterTop.map((filter, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={filter.name}>
                {renderFilterSection(filter)}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Side Filters */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Detailed Filters
          </Typography>
          <Grid container spacing={2}>
            {filterOptions.filterSide.map((filter, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={filter.name}>
                {renderFilterSection(filter)}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProductFilters.propTypes = {
  filterOptions: PropTypes.shape({
    filterSide: PropTypes.array.isRequired,
    filterTop: PropTypes.array.isRequired
  }).isRequired,
  onFilterApply: PropTypes.func.isRequired,
  currentFilters: PropTypes.object
};

export default ProductFilters;
