export const downloadFileType = (fileData, fileName, fileExtension) => {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(fileData, fileName + "." + fileExtension);
  } else {
    const url = window.URL.createObjectURL(new Blob([fileData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName + "." + fileExtension);
    document.body.appendChild(link);
    link.click();
  }
};
