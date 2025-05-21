import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmDialog = ({ open, onClose, onConfirm, isSubmitting }) => {
  return (
    <Dialog
      open={open}
      onClose={() => !isSubmitting && onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm Save</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to save these changes?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
