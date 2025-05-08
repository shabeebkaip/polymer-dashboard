import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX } from "react-icons/fi";
import { postFileUpload } from "./api";

const MultiImageUpload = ({
  onFileUpload,
  value = [],
  onRemove,
  onImageClick,
  width = "100%",
  height = "150px",
  text = "Image",
}) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setLoading(true);
      try {
        for (const file of acceptedFiles) {
          const formData = new FormData();
          formData.append("image", file);
          const response = await postFileUpload(formData);
          const { imageUrl, id } = response.data;
          onFileUpload(imageUrl, id); // Push to parent
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setLoading(false);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <Box sx={{ width }}>
      <Box
        {...getRootProps()}
        sx={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          padding: "16px",
          cursor: "pointer",
          backgroundColor: isDragActive ? "#e0f7fa" : "#f5f5f5",
          mb: 2,
        }}
      >
        <input {...getInputProps()} />
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Box display="flex" alignItems="center" gap={1} textAlign="center">
            <FiUpload size={24} color="#888" />
            <Typography variant="subtitle1">Upload {text}(s)</Typography>
          </Box>
        )}
      </Box>

      {value?.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {value.map((img, index) => (
            <Box
              key={index}
              position="relative"
              sx={{ width: "100px", height: "100px" }}
            >
              <img
                src={img}
                alt={`Uploaded ${index}`}
                onClick={() => onImageClick?.(index)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              />
              <IconButton
                size="small"
                onClick={() => onRemove(index)}
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  backgroundColor: "white",
                  boxShadow: 1,
                }}
              >
                <FiX size={14} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

MultiImageUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onRemove: PropTypes.func.isRequired,
  onImageClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  text: PropTypes.string,
};

export default MultiImageUpload;
