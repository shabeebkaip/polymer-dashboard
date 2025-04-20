import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import { postFileUpload } from "./api";

const ImageUpload = ({
  onFileUpload,
  preview,
  onImageClick,
  width = "100%",
  height = "150px",
  text = "Image ",
}) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      setLoading(true);
      try {
        const response = await postFileUpload(formData);
        const { imageUrl, id } = response.data;
        onFileUpload(imageUrl, id);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: preview ? "space-between" : "center",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "16px",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#e0f7fa" : "#f5f5f5",
        position: "relative",
      }}
    >
      <input {...getInputProps()} />
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <CircularProgress size={24} />
        </Box>
      ) : preview ? (
        <Box
          position="relative"
          onClick={onImageClick}
          sx={{ cursor: "pointer" }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "120px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </Box>
      ) : (
        <Box display="flex" alignItems="center" gap={1} textAlign="center">
          <FiUpload size={24} color="#888" />
          <Typography variant="subtitle1">Upload {text}</Typography>
        </Box>
      )}
    </Box>
  );
};

ImageUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
  preview: PropTypes.string,
  onImageClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  text: PropTypes.string,
};

export default ImageUpload;
