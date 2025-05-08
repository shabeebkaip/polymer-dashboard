import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
  } from "@mui/material";
  import { useSelector } from "react-redux";
  import { useDispatch } from "react-redux";
  import { setChemicalFamilyModal, setLoader } from "../../../slices/sharedSlice";
  import PropTypes from "prop-types";
  import { useState } from "react";
  import ImageUpload from "../../../shared/ImageUpload";
  import { createChemicalFamilyApi, updateChemicalFamilyApi } from "../api";
  import { useEffect } from "react";
  import { enqueueSnackbar } from "notistack";
  
  const AddEditChemicalFamily = ({ getResponseBack }) => {
    const dispatch = useDispatch();
    const {
      chemicalFamilyModal: open,
      chemicalFamilyCrud,
      mode,
    } = useSelector((state) => state.sharedState);
    const [data, setData] = useState(chemicalFamilyCrud);
    const { loader } = useSelector((state) => state.sharedState);
    const closeModal = () => {
      dispatch(setChemicalFamilyModal(false));
    };
    const handleSave = () => {
        debugger
      dispatch(setLoader(true));
      if (mode === "add") {
        createChemicalFamilyApi(data)
          .then((response) => {
            if (response.status === true) {
              closeModal();
              setData({});
              enqueueSnackbar(response?.message, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            }
          })
          .catch((error) => {
            console.error("Error creating chemical family:", error);
            enqueueSnackbar("Error creating chemical family", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          })
          .finally(() => {
            dispatch(setLoader(false));
            getResponseBack();
          });
      } else {
        updateChemicalFamilyApi(data)
          .then((response) => {
            if (response.status === true) {
              setData({});
              closeModal();
              enqueueSnackbar(response?.message, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            }
          })
          .catch((error) => {
            console.error("Error updating chemical family:", error);
            enqueueSnackbar("Error updating chemical family", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          })
          .finally(() => {
            dispatch(setLoader(false));
            getResponseBack();
          });
      }
    };
  
    useEffect(() => {
      setData(chemicalFamilyCrud);
    }, [chemicalFamilyCrud]);
    return (
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>
          <h4 className="capitalize">{mode} chemical Family</h4>
        </DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-1 gap-4">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            {/* <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={data.description || ""}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              required
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            /> */}
            <ImageUpload
              onFileUpload={(imageUrl, id) => {
                setData({ ...data, image: imageUrl, id });
              }}
              preview={data.image}
              onImageClick={() => {
                setData({ ...data, imageUrl: null });
              }}
              width="100%"
              height="150px"
            />
            {/* <ImageUpload
              onFileUpload={(imageUrl, id) => {
                setData({ ...data, icon: imageUrl, id });
              }}
              preview={data.icon}
              onImageClick={() => {
                setData({ ...data, icon: null });
              }}
              width="100%"
              height="150px"
              text="Icon"
            /> */}
          </div>
        </DialogContent>
        <DialogActions>
          {mode === "view" ? (
            <Button
              onClick={() => closeModal()}
              color="primary"
              variant="outlined"
            >
              Close
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  handleSave();
                }}
                color="primary"
                variant="contained"
              >
                {loader ? (
                  <CircularProgress size="30px" style={{ color: "#ffffff" }} />
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                onClick={() => closeModal()}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  };
  
  AddEditChemicalFamily.propTypes = {
    open: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    getResponseBack: PropTypes.func.isRequired,
  };
  
  export default AddEditChemicalFamily;
  