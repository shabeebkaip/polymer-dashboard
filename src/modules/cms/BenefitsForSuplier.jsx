import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { suplierCrud } from './Cms-Service';
import { useLanguage } from '../../shared/hooks/LanguageContext';
import { setPageTitle } from '../../slices/sharedSlice';
import StyledHelperText from '../../shared/styles/StyledHelperText';

const BenefitsForSuplier = () => {
  const [descriptions, setDescriptions] = useState({
    description: [''],
    ar_description: [''],
    ger_description: [''],
    cn_description: ['']
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { language } = useLanguage();

  useEffect(() => {
    fetchData();
    dispatch(setPageTitle(language === 'ar' ? 'الشروط والأحكام' : 'Benefits For Supplier'));
  }, [language]);

  const isEmptyDescriptions = (data) => {
    return ['description', 'ar_description', 'ger_description', 'cn_description'].every(
      (key) => !data[key]?.some((val) => val?.trim() !== '')
    );
  };

  const fetchData = async () => {
    try {
      const response = await suplierCrud.fetch();
      const content = response?.data?.data?.content;

      if (content) {
        const updated = {
          description: content.description?.length ? content.description : [''],
          ar_description: content.ar_description?.length ? content.ar_description : [''],
          ger_description: content.ger_description?.length ? content.ger_description : [''],
          cn_description: content.cn_description?.length ? content.cn_description : ['']
        };
        setDescriptions(updated);

        if (isEmptyDescriptions(updated)) {
          setOpen(true);
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleFieldChange = (index, lang, value) => {
    setDescriptions(prev => ({
      ...prev,
      [lang]: prev[lang].map((item, i) => (i === index ? value : item))
    }));
  };

  const handleAddField = () => {
    setDescriptions(prev => ({
      description: [...prev.description, ''],
      ar_description: [...prev.ar_description, ''],
      ger_description: [...prev.ger_description, ''],
      cn_description: [...prev.cn_description, '']
    }));
  };

  const handleRemoveField = (index) => {
    if (descriptions.description.length > 1) {
      setDescriptions(prev => ({
        description: prev.description.filter((_, i) => i !== index),
        ar_description: prev.ar_description.filter((_, i) => i !== index),
        ger_description: prev.ger_description.filter((_, i) => i !== index),
        cn_description: prev.cn_description.filter((_, i) => i !== index)
      }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    descriptions.description.forEach((desc, index) => {
      if (!desc?.trim()) newErrors[`description_${index}`] = "English required";
      if (!descriptions.ar_description[index]?.trim()) newErrors[`ar_description_${index}`] = "Arabic required";
      if (!descriptions.ger_description[index]?.trim()) newErrors[`ger_description_${index}`] = "German required";
      if (!descriptions.cn_description[index]?.trim()) newErrors[`cn_description_${index}`] = "Chinese required";
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 3000);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      enqueueSnackbar('Please fill all required fields', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        content: {
          description: descriptions.description.filter(d => d.trim() !== ''),
          ar_description: descriptions.ar_description.filter(d => d.trim() !== ''),
          ger_description: descriptions.ger_description.filter(d => d.trim() !== ''),
          cn_description: descriptions.cn_description.filter(d => d.trim() !== '')
        }
      };

      const response = await suplierCrud.updateSection(payload);
      if (response?.data?.status) {
        enqueueSnackbar(response.data.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }});
        fetchData();
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to save', { variant: 'error' });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">Benefits For Supplier</h2>
        <Button variant="contained" onClick={() => setOpen(true)}>Edit</Button>
      </div>

      <ul className="ml-5 list-disc">
        {descriptions.description?.map((desc, idx) => (
          <li key={idx} className="mb-1">{desc}</li>
        ))}
      </ul>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Edit Multilingual Descriptions</DialogTitle>
        <DialogContent dividers>
          {descriptions.description.map((_, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 my-4">
              <TextField
                className="col-span-3"
                label={`English ${index + 1}`}
                multiline rows={2}
                fullWidth
                value={descriptions.description[index] || ''}
                onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                error={!!errors[`description_${index}`]}
                helperText={<StyledHelperText>{errors[`description_${index}`]}</StyledHelperText>}
              />
              <TextField
                className="col-span-3"
                label={`Arabic ${index + 1}`}
                multiline rows={2}
                fullWidth
                value={descriptions.ar_description[index] || ''}
                onChange={(e) => handleFieldChange(index, 'ar_description', e.target.value)}
                error={!!errors[`ar_description_${index}`]}
                helperText={<StyledHelperText>{errors[`ar_description_${index}`]}</StyledHelperText>}
              />
              <TextField
                className="col-span-3"
                label={`German ${index + 1}`}
                multiline rows={2}
                fullWidth
                value={descriptions.ger_description[index] || ''}
                onChange={(e) => handleFieldChange(index, 'ger_description', e.target.value)}
                error={!!errors[`ger_description_${index}`]}
                helperText={<StyledHelperText>{errors[`ger_description_${index}`]}</StyledHelperText>}
              />
              <TextField
                className="col-span-2"
                label={`Chinese ${index + 1}`}
                multiline rows={2}
                fullWidth
                value={descriptions.cn_description[index] || ''}
                onChange={(e) => handleFieldChange(index, 'cn_description', e.target.value)}
                error={!!errors[`cn_description_${index}`]}
                helperText={<StyledHelperText>{errors[`cn_description_${index}`]}</StyledHelperText>}
              />
              <div className="flex items-center col-span-1 space-x-1">
                {descriptions.description.length > 1 && (
                  <IconButton onClick={() => handleRemoveField(index)}><RemoveCircleIcon /></IconButton>
                )}
                {index === descriptions.description.length - 1 && (
                  <IconButton onClick={handleAddField}><AddCircleIcon /></IconButton>
                )}
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isSubmitting}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSubmitting} variant="contained">
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BenefitsForSuplier;
