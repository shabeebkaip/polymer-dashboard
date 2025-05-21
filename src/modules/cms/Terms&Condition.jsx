import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { termsCrud } from './Cms-Service';
import { useLanguage } from '../../shared/hooks/LanguageContext';
import { setPageTitle } from '../../slices/sharedSlice';
import ConfirmDialog from '../../shared/confirmationModal/confirmDiolog';


const TermsCondition = () => {
  const [data, setData] = useState();
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageTitle = language === 'ar' ? 'الشروط والأحكام' : 'Terms and Condition';

  const fetchData = async () => {
    try {
      const response = await termsCrud.fetch();
      setData(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
    dispatch(setPageTitle(pageTitle));
  }, [language]);

  const toolbarOptions = [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ];

  const onFieldChange = (value, fieldName) => {
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        content: {
          ...prevData.data.content,
          [fieldName]: value
        }
      }
    }));

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    const content = data?.data?.content;

    if (!content?.description || content.description === '<p><br></p>') {
      newErrors.description = "English description is required";
    }

    if (!content?.ar_description || content.ar_description === '<p><br></p>') {
      newErrors.ar_description = "Arabic description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      setOpenConfirmDialog(true);
    }
  };

  const handleConfirmSave = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        content: {
          description: data.data.content.description,
          ar_description: data.data.content.ar_description,
        },
      };
      const response = await termsCrud.updateSection(payload);
      if (response && response.data.status) {
        enqueueSnackbar(response.data.message, {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        await fetchData();
      }
    } catch (error) {
    }
    fetchData();
    setOpenConfirmDialog(false);
    setIsSubmitting(false);
  };

  const quillErrorStyle = {
    border: '1px solid #d32f2f',
    borderRadius: '4px',
  };

  return (
    <div>
      <div className="w-full p-8">
        <h2 className="pt-2 pb-2 text-xl">Terms and Condition</h2>
        <div style={{ height: '66dvh', position: 'relative' }}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="p-2 font-medium">English</h3>
              <div className="h-[64vh]" style={errors.description ? quillErrorStyle : {}}>
                <ReactQuill
                  className="bg-white custom-quill"
                  theme="snow"
                  value={data?.data?.content?.description || ''}
                  onChange={(value) => onFieldChange(value, 'description')}
                  modules={{ toolbar: toolbarOptions }}
                  style={{ height: '100%' }}
                />
              </div>
              {errors.description && (
                <div style={{ color: 'red', marginTop: '8px', fontSize: '12px' }}>
                  {errors.description}
                </div>
              )}
            </div>

            <div>
              <h3 className="p-2 font-medium">Arabic</h3>
              <div className="h-[64vh]" style={errors.ar_description ? quillErrorStyle : {}}>
                <ReactQuill
                  className="bg-white custom-quill"
                  theme="snow"
                  value={data?.data?.content?.ar_description || ''}
                  onChange={(value) => onFieldChange(value, 'ar_description')}
                  modules={{ toolbar: toolbarOptions }}
                  style={{ height: '100%' }}
                />
              </div>
              {errors.ar_description && (
                <div style={{ color: 'red', marginTop: '8px', fontSize: '12px' }}>
                  {errors.ar_description}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-5 py-14">
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={isSubmitting}
            sx={{ borderRadius: '20px', px: 4 }}
          >
            {isSubmitting ? 'Saving...' : 'Save details'}
          </Button>
        </Stack>
      </div>

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleConfirmSave}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default TermsCondition;
