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
  import { setLoader, setGradeModal } from "../../../slices/sharedSlice";
  import PropTypes from "prop-types";
  import { useState } from "react";
  import { createGradeApi, updateGradeApi } from "../api";
  import { useEffect } from "react";
  import { enqueueSnackbar } from "notistack";
  
  const AddEditGrade = ({ getResponseBack }) => {
    const dispatch = useDispatch();
    const {
      gradeModal: open,
      gradeCrud,
      mode,
    } = useSelector((state) => state.sharedState);
    const [data, setData] = useState(gradeCrud);
    const { loader } = useSelector((state) => state.sharedState);
    const closeModal = () => {
      dispatch(setGradeModal(false));
    };
    const handleSave = () => {
      dispatch(setLoader(true));
      if (mode === "add") {
        createGradeApi(data)
          .then((response) => {
            if (response.success) {
              closeModal();
              setData({});
              enqueueSnackbar(response?.message, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            }
          })
          .catch((error) => {
            console.error("Error creating packaging type:", error);
            enqueueSnackbar("Error creating packaging type", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          })
          .finally(() => {
            dispatch(setLoader(false));
            getResponseBack();
          });
      } else {
        updateGradeApi(data)
          .then((response) => {
            if (response.success) {
              setData({});
              closeModal();
              enqueueSnackbar(response?.message, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            }
          })
          .catch((error) => {
            console.error("Error updating packaging type:", error);
            enqueueSnackbar("Error updating packaging type", {
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
      setData(gradeCrud);
    }, [gradeCrud]);
    return (
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>
          <h4 className="capitalize">{mode} packaging type</h4>
        </DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-2 gap-4">
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
            <TextField
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
            />
          
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
  
  AddEditGrade.propTypes = {
    open: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    getResponseBack: PropTypes.func.isRequired,
  };
  
  export default AddEditGrade;
  