import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Chip,
  Divider,
  IconButton,
  FormControl,
  RadioGroup,
  Radio
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filterOptions, 
  onFilterApply, 
  currentFilters = {} 
}) => {
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
    onClose();
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
        sx={{ 
          boxShadow: 'none', 
          border: '1px solid #e0e0e0',
          '&:before': { display: 'none' },
          mb: 1
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: isFilterActive(filter.name) ? '#e3f2fd' : '#fafafa',
            minHeight: '48px',
            '&.Mui-expanded': {
              minHeight: '48px',
            },
            '& .MuiAccordionSummary-content': {
              margin: '8px 0',
              '&.Mui-expanded': {
                margin: '8px 0',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '14px' }}>
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
                sx={{ ml: 'auto', mr: 1, height: '20px', fontSize: '11px' }}
              />
            )}
          </Box>
        </AccordionSummary>
        
        <AccordionDetails sx={{ pt: 1, pb: 2 }}>
          {filter.searchable && (
            <TextField
              size="small"
              placeholder={`Search ${filter.displayName.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => handleSearchChange(filter.name, e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'gray', mr: 1, fontSize: '18px' }} />
              }}
            />
          )}
          
          <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <span style={{ fontSize: '14px' }}>{option.name}</span>
                          <Chip 
                            size="small" 
                            label={option.count} 
                            variant="outlined" 
                            sx={{ height: '18px', fontSize: '11px' }}
                          />
                        </Box>
                      }
                      sx={{ margin: '2px 0', width: '100%' }}
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
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span style={{ 
                          color: option.count === 0 ? '#ccc' : 'inherit',
                          textDecoration: option.count === 0 ? 'line-through' : 'none',
                          fontSize: '14px'
                        }}>
                          {option.name}
                        </span>
                        <Chip 
                          size="small" 
                          label={option.count} 
                          variant="outlined"
                          sx={{ 
                            opacity: option.count === 0 ? 0.5 : 1,
                            backgroundColor: option.count === 0 ? '#f5f5f5' : 'inherit',
                            height: '18px',
                            fontSize: '11px'
                          }}
                        />
                      </Box>
                    }
                    sx={{ margin: '2px 0', width: '100%' }}
                  />
                ))}
              </FormGroup>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;
  const allFilters = [...(filterOptions.filterTop || []), ...(filterOptions.filterSide || [])];

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 380,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          p: 2, 
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#fafafa'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterListIcon sx={{ color: '#666', fontSize: '20px' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px' }}>
              Filters
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666', 
            px: 2, 
            pt: 2, 
            pb: 1,
            fontSize: '13px'
          }}
        >
          Refine your search
        </Typography>

        {/* Filter Content */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: 2 }}>
          {allFilters.map(filter => renderFilterSection(filter))}
        </Box>

        {/* Footer Actions */}
        <Box sx={{ 
          borderTop: '1px solid #e0e0e0', 
          p: 2, 
          backgroundColor: '#fafafa'
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              onClick={applyFilters}
              disabled={!hasActiveFilters}
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

FilterSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({
    filterSide: PropTypes.array.isRequired,
    filterTop: PropTypes.array.isRequired
  }).isRequired,
  onFilterApply: PropTypes.func.isRequired,
  currentFilters: PropTypes.object
};

export default FilterSidebar;