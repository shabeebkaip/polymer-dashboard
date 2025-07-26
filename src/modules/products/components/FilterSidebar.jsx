import { useState, useEffect } from 'react';
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
          width: 400,
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg,#f0fdf4 0%,#e0f7fa 100%)',
          boxShadow: '0 4px 24px rgba(16,185,129,0.08)',
          borderLeft: 'none',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
          borderTopRightRadius: '0px', // Remove top right curve/space
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
          borderBottom: '1.5px solid #d1fae5',
          background: 'linear-gradient(90deg,#34d399 0%,#059669 100%)',
          color: '#fff',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterListIcon sx={{ color: '#fff', fontSize: '22px' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '19px', letterSpacing: '0.02em' }}>
              Filters
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: '#fff', background: 'rgba(16,185,129,0.08)', borderRadius: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: '#059669',
            px: 2,
            pt: 2,
            pb: 1,
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.01em',
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
          borderTop: '1.5px solid #d1fae5',
          p: 2,
          background: 'linear-gradient(90deg,#f0fdf4 0%,#e0f7fa 100%)',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              fullWidth
              sx={{
                textTransform: 'none',
                borderColor: '#10B981',
                color: '#059669',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 1px 4px rgba(16,185,129,0.07)',
                background: '#f0fdf4',
                '&:hover': { background: '#d1fae5', borderColor: '#059669' },
              }}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              onClick={applyFilters}
              disabled={!hasActiveFilters}
              fullWidth
              sx={{
                textTransform: 'none',
                background: 'linear-gradient(90deg,#10B981 0%,#059669 100%)',
                color: '#fff',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(16,185,129,0.12)',
                '&:hover': { background: 'linear-gradient(90deg,#059669 0%,#10B981 100%)' },
              }}
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