import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, CircularProgress, Grid, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import img from '../assets/drop.svg';
import CloseIcon from '@mui/icons-material/Close';
import { postFileUpload } from './api';

const UploadMultipleImages = ({
  onFilesUpload,
  previews = [],
  setPreviews, 
  onImageClick,
  width = '100%',
  height = '150px',
}) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    setLoading(true);
    const uploadedFiles = [];

    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await postFileUpload(formData);
        const { fileUrl, id, type, name } = response.data;
        uploadedFiles.push({
          fileUrl,
          id,
          type: type || file.type.split('/')[1],
          name: name || file.name,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    if (uploadedFiles.length) {
      onFilesUpload(uploadedFiles);
    }

    setLoading(false);
  }, [onFilesUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  const handleRemoveImage = (index) => {
    setPreviews(index);
  };

  return (
    <Box
      {...getRootProps()}
      sx={{
        width,
        minHeight: height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#e0f7fa' : '#f5f5f5',
        position: 'relative',
      }}
    >
      <input {...getInputProps()} />
      {loading ? (
        <CircularProgress size={24} />
      ) : previews.length > 0 ? (
        <Grid container spacing={1}>
          {previews.map((url, index) => (
            <Grid item key={index} sx={{ position: 'relative' }}>
              <Box
                onClick={() => onImageClick?.(index)}
                sx={{
                  width: '100px',
                  height: '100px',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid #ddd',
                  position: 'relative',
                }}
              >
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    },
                  }}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display="flex" alignItems="center" gap={1} textAlign="center">
          <img src={img} alt="upload icon" style={{ maxWidth: '30px' }} />
          <Typography variant="subtitle1">Upload Images</Typography>
        </Box>
      )}
    </Box>
  );
};

UploadMultipleImages.propTypes = {
  onFilesUpload: PropTypes.func.isRequired,
  previews: PropTypes.arrayOf(PropTypes.string),
  setPreviews: PropTypes.func.isRequired, 
  onImageClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default UploadMultipleImages;