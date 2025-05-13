import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, CircularProgress, Modal, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { CloudUpload, Close, PictureAsPdf } from "@mui/icons-material";
import { postFileUpload } from "./api";

const MultipleFileUpload = ({ onFileUpload, existingFiles = [], multiple = true, setCloudinaryImage }) => {

    console.log(existingFiles);

    const [files, setFiles] = useState(existingFiles);

    useEffect(() => {
        setFiles(existingFiles);
    }, [existingFiles]);

    const [loading, setLoading] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);


    const onDrop = useCallback(
        async (acceptedFiles) => {
            setLoading(true);
            const newFiles = [];

            for (const file of acceptedFiles) {
                const formData = new FormData();
                formData.append("file", file);
                try {
                    const response = await postFileUpload(formData);
                    const { fileUrl, id, type, name } = response.data;
                    const uploadedFile = {
                        fileUrl,
                        id,
                        type: type || file.type.split("/")[1],
                        name: name || file.name,
                    };
                    newFiles.push(uploadedFile);
                    onFileUpload(newFiles);
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            }

            setFiles((prevFiles) => (multiple ? [...prevFiles, ...newFiles] : newFiles));
            setLoading(false);
        },
        [onFileUpload, multiple]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ".png,.jpg,.jpeg,.mp4,.mp3,.pdf",
        multiple,
    });

    const handleRemoveFile = (fileId) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
        if (typeof apiService !== 'undefined' && apiService.fileDelete) {
            apiService.fileDelete(fileId);
        }
        if (setCloudinaryImage) {
            setCloudinaryImage("");
        }
    };

    const handlePreviewFile = (file) => {
        setPreviewFile(file);
    };

    const getFileType = (file) => {
        if (typeof file === 'string') {
            const url = file.toLowerCase();
            if (url.endsWith('.pdf')) return 'pdf';
            if (url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.avi') || url.endsWith('.mkv') || url.endsWith('.webm')) return 'mp4';
            if (url.endsWith('.mp3')) return 'mp3';
            return 'image';
        } else if (file && file.type) {
            const type = file.type.toLowerCase();
            if (type === 'application/pdf' || type.includes('pdf')) return 'pdf';
            if (type.includes('video')) return 'mp4';
            if (type.includes('audio')) return 'mp3';
            return 'image';
        } else if (file && file.fileUrl) {
            return getFileType(file.fileUrl);
        }
        return 'image';
    };

    const getFileUrl = (file) => {
        if (typeof file === 'string') return file;
        return file?.fileUrl || '';
    };

    return (
        <div className="flex gap-5">
            <div className="relative" {...getRootProps()}>
                <div
                    className={`flex p-2.5 w-40 rounded-lg ${isDragActive ? "bg-blue-100" : "bg-gray-300"}`}
                    aria-label="Upload files"
                >
                    <div className="flex gap-2.5">
                        <CloudUpload />
                        {loading ? (
                            <CircularProgress size={16} />
                        ) : (
                            <span>Upload Files</span>
                        )}
                    </div>
                </div>
                <input {...getInputProps()} />
            </div>

            <Box display="flex" flexWrap="wrap" gap={2}>
                {files?.map((file, index) => {
                    const fileUrl = getFileUrl(file);

                    const fileType = getFileType(file);

                    if (!fileUrl) {
                        console.error(`Invalid fileUrl at index ${index}:`, file);
                        return null;
                    }

                    return (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "8px",
                                width: "120px",
                                textAlign: "center",
                                position: "relative",
                                cursor: "pointer"
                            }}
                            onClick={() => handlePreviewFile({ ...file, fileUrl, type: fileType })}
                        >
                            {fileType === 'pdf' ? (
                                <PictureAsPdf
                                    style={{ width: "50px", height: "50px", marginBottom: "8px" }}
                                />
                            ) : fileType === 'mp3' ? (
                                <audio
                                    src={fileUrl}
                                    style={{ width: "50px", height: "50px", marginBottom: "8px" }}
                                    controls
                                />
                            ) : fileType === 'mp4' ? (
                                <video
                                    src={fileUrl}
                                    style={{ width: "50px", height: "50px", marginBottom: "8px" }}
                                    controls
                                />
                            ) : (
                                <img
                                    src={fileUrl}
                                    alt={file?.name || "file-preview"}
                                    style={{ width: "50px", height: "50px", marginBottom: "8px", objectFit: "cover" }}
                                />
                            )}

                            <Typography variant="caption" noWrap sx={{ width: "100%" }}>
                                {file?.name || `File ${index + 1}`}
                            </Typography>

                            <IconButton
                                size="small"
                                sx={{ position: "absolute", top: 0, right: 0 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile(file?.id);
                                }}
                            >
                                <Close fontSize="small" />
                            </IconButton>
                        </Box>
                    );
                })}
            </Box>

            {previewFile && (
                <Modal open={Boolean(previewFile)} onClose={() => setPreviewFile(null)}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            padding: "16px",
                            width: "80%",
                            height: "80%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconButton
                            size="small"
                            sx={{ position: "absolute", top: "8px", right: "8px" }}
                            onClick={() => setPreviewFile(null)}
                        >
                            <Close fontSize="small" />
                        </IconButton>

                        {(() => {
                            const fileType = getFileType(previewFile);
                            const fileUrl = getFileUrl(previewFile);

                            if (fileType === 'pdf') {




                                return (
                                    <iframe
                                        src={fileUrl}
                                        title="PDF Viewer"
                                        style={{ width: "100%", height: "100%", border: "none" }}
                                    />
                                );

                            } else if (fileType === 'mp4') {
                                return (
                                    <video
                                        src={fileUrl}
                                        controls
                                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                                    />
                                );
                            } else if (fileType === 'mp3') {
                                return (
                                    <audio
                                        src={fileUrl}
                                        controls
                                        style={{ width: "100%" }}
                                    />
                                );
                            } else {
                                return (
                                    <img
                                        src={fileUrl}
                                        alt="Preview"
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                    />
                                );
                            }
                        })()}
                    </Box>
                </Modal>
            )}
        </div>
    );
};

MultipleFileUpload.propTypes = {
    onFileUpload: PropTypes.func.isRequired,
    existingFiles: PropTypes.array,
    multiple: PropTypes.string,
    setCloudinaryImage: PropTypes.func
};

export default MultipleFileUpload;