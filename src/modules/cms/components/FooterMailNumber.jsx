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
import { footerCrud } from '../Cms-Service';
import { useLanguage } from '../../../shared/hooks/LanguageContext';
import { setPageTitle } from '../../../slices/sharedSlice';
import StyledHelperText from '../../../shared/styles/StyledHelperText';

const FooterMailNumber = () => {
  const [footerData, setFooterData] = useState({
    mail: '',
    mobile: ''
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { language } = useLanguage();

  useEffect(() => {
    fetchData();
    dispatch(setPageTitle(language === 'ar' ? 'البريد الإلكتروني والهاتف' : 'Footer Mail & Mobile'));
  }, [language]);

  const isEmptyFooterData = (data) => {
    return !data.mail?.trim() && !data.mobile?.trim();
  };

  const fetchData = async () => {
    try {
      const response = await footerCrud.fetch();
      const content = response?.data?.data?.content;

      if (content) {
        const updated = {
          mail: content.mail || '',
          mobile: content.mobile || ''
        };
        setFooterData(updated);

        if (isEmptyFooterData(updated)) {
          setOpen(true);
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleFieldChange = (field, value) => {
    setFooterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    
    if (!footerData.mail?.trim()) {
      newErrors.mail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(footerData.mail.trim())) {
      newErrors.mail = "Please enter a valid email address";
    }
    
    if (!footerData.mobile?.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 3000);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      enqueueSnackbar('Please fill all required fields correctly', { 
        variant: 'error', 
        anchorOrigin: { vertical: 'top', horizontal: 'right' } 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        content: {
          mail: footerData.mail.trim(),
          mobile: footerData.mobile.trim()
        }
      };

      const response = await footerMailMobileCrud.updateSection(payload);
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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">Footer Mail & Mobile</h2>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>

      <div className="p-6 rounded-lg bg-gray-50">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">{footerData.mail || 'No email set'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Mobile</h3>
              <p className="text-gray-600">{footerData.mobile || 'No mobile set'}</p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Footer Contact Information</DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-1 gap-6">
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={footerData.mail}
              onChange={(e) => handleFieldChange('mail', e.target.value)}
              error={!!errors.mail}
              helperText={<StyledHelperText>{errors.mail}</StyledHelperText>}
              placeholder="info@example.com"
            />
            <TextField
              label="Mobile Number"
              fullWidth
              value={footerData.mobile}
              onChange={(e) => handleFieldChange('mobile', e.target.value)}
              error={!!errors.mobile}
              helperText={<StyledHelperText>{errors.mobile}</StyledHelperText>}
              placeholder="+966 537346577"
            />
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

export default FooterMailNumber;