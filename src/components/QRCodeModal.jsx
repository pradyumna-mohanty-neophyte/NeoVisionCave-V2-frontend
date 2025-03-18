import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const QRCodeModal = ({ open, setOpen, result, handleGenerateQR }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Generate QR Code</DialogTitle>
      <DialogContent>Do you want to generate and print the QR code?</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          No
        </Button>
        <Button
          onClick={() => {
            handleGenerateQR(result);
            setOpen(false);
          }}
          color="primary"
          variant="contained"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRCodeModal;
