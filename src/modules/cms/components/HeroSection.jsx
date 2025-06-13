import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { heroCrud } from '../Cms-Service';
import { useLanguage } from '../../../shared/hooks/LanguageContext';
import { setPageTitle } from '../../../slices/sharedSlice';
import StyledHelperText from '../../../shared/styles/StyledHelperText';

const HeroSection = () => {
  const [heroData, setHeroData] = useState({
    title: '',
    ar_title: '',
    ger_title: '',
    cn_title: '',
    description: '',
    ar_description: '',
    ger_description: '',
    cn_description: ''
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { language } = useLanguage();

  useEffect(() => {
    fetchData();
    dispatch(setPageTitle(language === 'ar' ? 'قسم البطل' : 'Hero Section'));
  }, [language]);

  const isEmptyHeroData = (data) => {
    return !data.title?.trim() && 
           !data.ar_title?.trim() && 
           !data.ger_title?.trim() && 
           !data.cn_title?.trim() &&
           !data.description?.trim() && 
           !data.ar_description?.trim() && 
           !data.ger_description?.trim() && 
           !data.cn_description?.trim();
  };

  const fetchData = async () => {
    try {
      const response = await heroCrud.fetch();
      const content = response?.data?.data?.content;

      if (content) {
        const updated = {
          title: content.title || '',
          ar_title: content.ar_title || '',
          ger_title: content.ger_title || '',
          cn_title: content.cn_title || '',
          description: content.description || '',
          ar_description: content.ar_description || '',
          ger_description: content.ger_description || '',
          cn_description: content.cn_description || ''
        };
        setHeroData(updated);

        if (isEmptyHeroData(updated)) {
          setOpen(true);
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleFieldChange = (field, value) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    
    if (!heroData.title?.trim()) newErrors.title = "English title required";
    if (!heroData.ar_title?.trim()) newErrors.ar_title = "Arabic title required";
    if (!heroData.ger_title?.trim()) newErrors.ger_title = "German title required";
    if (!heroData.cn_title?.trim()) newErrors.cn_title = "Chinese title required";
    
    if (!heroData.description?.trim()) newErrors.description = "English description required";
    if (!heroData.ar_description?.trim()) newErrors.ar_description = "Arabic description required";
    if (!heroData.ger_description?.trim()) newErrors.ger_description = "German description required";
    if (!heroData.cn_description?.trim()) newErrors.cn_description = "Chinese description required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 3000);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      enqueueSnackbar('Please fill all required fields', { 
        variant: 'error', 
        anchorOrigin: { vertical: 'top', horizontal: 'right' } 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        content: {
          title: heroData.title.trim(),
          ar_title: heroData.ar_title.trim(),
          ger_title: heroData.ger_title.trim(),
          cn_title: heroData.cn_title.trim(),
          description: heroData.description.trim(),
          ar_description: heroData.ar_description.trim(),
          ger_description: heroData.ger_description.trim(),
          cn_description: heroData.cn_description.trim()
        }
      };

      const response = await heroCrud.updateSection(payload);
      if (response?.data?.status) {
        enqueueSnackbar(response.data.message, { 
          variant: 'success', 
          anchorOrigin: { vertical: 'top', horizontal: 'right' }
        });
        fetchData();
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to save', { variant: 'error' });
    }
    setIsSubmitting(false);
  };

  const getCurrentTitle = () => {
    switch (language) {
      case 'ar':
        return heroData.ar_title || heroData.title;
      case 'ger':
        return heroData.ger_title || heroData.title;
      case 'cn':
        return heroData.cn_title || heroData.title;
      default:
        return heroData.title;
    }
  };

  const getCurrentDescription = () => {
    switch (language) {
      case 'ar':
        return heroData.ar_description || heroData.description;
      case 'ger':
        return heroData.ger_description || heroData.description;
      case 'cn':
        return heroData.cn_description || heroData.description;
      default:
        return heroData.description;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">Hero Section</h2>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>

      <div className="p-6 rounded-lg bg-gray-50">
        <h3 className="mb-4 text-2xl font-bold text-gray-800">
          {getCurrentTitle() || 'No title set'}
        </h3>
        <p className="leading-relaxed text-gray-600">
          {getCurrentDescription() || 'No description set'}
        </p>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Edit Hero Section</DialogTitle>
        <DialogContent dividers>
          {/* Title Fields */}
          <div className="mb-6">
            <h4 className="mb-3 text-lg font-semibold text-gray-700">Titles</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextField
                label="English Title"
                fullWidth
                value={heroData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                error={!!errors.title}
                helperText={<StyledHelperText>{errors.title}</StyledHelperText>}
              />
              <TextField
                label="Arabic Title"
                fullWidth
                value={heroData.ar_title}
                onChange={(e) => handleFieldChange('ar_title', e.target.value)}
                error={!!errors.ar_title}
                helperText={<StyledHelperText>{errors.ar_title}</StyledHelperText>}
              />
              <TextField
                label="German Title"
                fullWidth
                value={heroData.ger_title}
                onChange={(e) => handleFieldChange('ger_title', e.target.value)}
                error={!!errors.ger_title}
                helperText={<StyledHelperText>{errors.ger_title}</StyledHelperText>}
              />
              <TextField
                label="Chinese Title"
                fullWidth
                value={heroData.cn_title}
                onChange={(e) => handleFieldChange('cn_title', e.target.value)}
                error={!!errors.cn_title}
                helperText={<StyledHelperText>{errors.cn_title}</StyledHelperText>}
              />
            </div>
          </div>

          {/* Description Fields */}
          <div>
            <h4 className="mb-3 text-lg font-semibold text-gray-700">Descriptions</h4>
            <div className="grid grid-cols-1 gap-4">
              <TextField
                label="English Description"
                multiline
                rows={3}
                fullWidth
                value={heroData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                error={!!errors.description}
                helperText={<StyledHelperText>{errors.description}</StyledHelperText>}
              />
              <TextField
                label="Arabic Description"
                multiline
                rows={3}
                fullWidth
                value={heroData.ar_description}
                onChange={(e) => handleFieldChange('ar_description', e.target.value)}
                error={!!errors.ar_description}
                helperText={<StyledHelperText>{errors.ar_description}</StyledHelperText>}
              />
              <TextField
                label="German Description"
                multiline
                rows={3}
                fullWidth
                value={heroData.ger_description}
                onChange={(e) => handleFieldChange('ger_description', e.target.value)}
                error={!!errors.ger_description}
                helperText={<StyledHelperText>{errors.ger_description}</StyledHelperText>}
              />
              <TextField
                label="Chinese Description"
                multiline
                rows={3}
                fullWidth
                value={heroData.cn_description}
                onChange={(e) => handleFieldChange('cn_description', e.target.value)}
                error={!!errors.cn_description}
                helperText={<StyledHelperText>{errors.cn_description}</StyledHelperText>}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting} variant="contained">
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HeroSection;