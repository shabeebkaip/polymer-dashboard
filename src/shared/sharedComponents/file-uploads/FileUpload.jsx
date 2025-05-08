import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, CircularProgress, Modal, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
// import pdfIcon from "../../../assets/files/pdf.png";
// import pngIcon from "../../../assets/files/png.png";
// import jpgIcon from "../../../assets/files/jpg.png";
// import videoIcon from "../assets/files/video.png";
import { CloudUpload, Close } from "@mui/icons-material";
// import defaultFileIcon from "../assets/files/default.png";
import { enqueueSnackbar } from "notistack";
import { postFileUpload } from "../../api";

const iconMap = {
    pdf: CloudUpload,
    png: CloudUpload,
    jpeg: CloudUpload,
    jpg: CloudUpload,
    mp4: CloudUpload,
    mp3: CloudUpload,
    default: CloudUpload,
};
const FileUpload = ({ onFileUpload, existingFiles = [], multiple = true, onClear, text, existingFileId }) => {
    const [files, setFiles] = useState(existingFiles);
    const [loading, setLoading] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
console.log(existingFiles , "existingFiles");

    const onDrop = useCallback(
        async (acceptedFiles) => {
            setLoading(true);
            const filteredFiles = acceptedFiles.filter(
                (file) => file.type !== "application/pdf"
            );
            const newFiles = [];

            for (const file of filteredFiles) {
                const formData = new FormData();
                formData.append("file", file);
                if (existingFileId) {
                    
                    formData.append("public_id", existingFileId);
                }
                try {
                    const response = await postFileUpload(formData);
                    const { imageUrl, id, type, name } = response.data;
                    const uploadedFile = {
                        imageUrl,
                        id,
                        type: type || file.type.split("/")[1],
                        name: name || file.name,
                    };
                    newFiles.push(uploadedFile);
                    onFileUpload(uploadedFile);
                } catch (error) {

                    enqueueSnackbar(error?.response?.data?.error, {
                        variant: "error",
                        anchorOrigin: { vertical: "top", horizontal: "right" },
                    });
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
        accept: ".png,.jpg,.jpeg,.mp4,.mkv.mp3,.webm,.pdf",
        multiple,
    });

    const handleRemoveFile = (fileId) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId.id));
        onClear(fileId)
    };

    const handlePreviewFile = (file) => {
        if (file.type === "mp4") {
            setPreviewFile(file);
        } else {
            setPreviewFile(file);
        }
    };

    return (
        <div className="flex gap-5">
            <div className="relative" {...getRootProps()}>
                <div
                    className={`flex p-2.5 w-40 rounded-lg ${isDragActive ? "bg-blue-100" : "bg-gray-300"
                        }`}
                    aria-label="Upload files"
                >
                    <div className="flex gap-2.5">
                        <CloudUpload />
                        {loading ? (
                            <CircularProgress size={16} />
                        ) : (
                            <span>Upload {text}</span>
                        )}
                    </div>
                </div>
                <input {...getInputProps()} />
            </div>

            <Box display="flex" flexWrap="wrap" gap={2}>
                {files?.map((file, index) => {
                    const fileUrl = typeof file === "string" ? file : file?.fileUrl;

                    if (!fileUrl || typeof fileUrl !== "string") {
                        console.error(`Invalid fileUrl at index ${index}:`, file);
                        return null;
                    }

                    const videoExtensions = [".mp3", ".mp4", ".mov", ".avi", ".mkv", ".webm"];
                    const isMedia =
                        videoExtensions.some((ext) => fileUrl.toLowerCase().endsWith(ext)) ||
                        fileUrl.includes("/video/") || fileUrl.includes("/audio/");

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
                                width: "210px",
                                textAlign: "center",
                                position: "relative",
                            }}
                        >
                            {isMedia ? (
                                fileUrl.endsWith(".mp3") ? (
                                    <audio
                                        src={fileUrl}
                                        style={{ width: "100%", height: "65px", margin: "10px" }}
                                        onClick={() => handlePreviewFile(fileUrl)}
                                        controls
                                    />
                                ) : (
                                    <video
                                        src={fileUrl}
                                        style={{ width: "100%", height: "90px", margin: "10px" }}
                                        onClick={() => handlePreviewFile(fileUrl)}
                                        controls
                                    />
                                )
                            ) : (
                                <img
                                    src={fileUrl}
                                    alt={file?.name || "file-preview"}
                                    style={{ width: "100px", height: "70px", margin: "10px" }}
                                    onClick={() => handlePreviewFile(fileUrl)}
                                />
                            )}
                            <IconButton
                                size="small"
                                sx={{ position: "absolute", top: 0, right: 0 }}
                                onClick={() => handleRemoveFile(file)}
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
                        {previewFile.type === "pdf" ? (
                            <iframe
                                src={previewFile}
                                title="PDF Viewer"
                                style={{ width: "100%", height: "100%" }}
                            />
                        ) : previewFile.type === "mp4" ? (
                            <video src={previewFile} controls style={{ width: "100%", height: "100%" }} />
                        ) : previewFile.type === "mp3" ? (
                            <audio src={previewFile} controls style={{ width: "100%" }} />
                        ) : (
                            <img src={previewFile} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                        )}
                    </Box>
                </Modal>
            )}
        </div>
    );
};

FileUpload.propTypes = {
    onFileUpload: PropTypes.func.isRequired,
    existingFiles: PropTypes.array,
    multiple: PropTypes.bool,
};

export default FileUpload;
