import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

const ConfirmDialog: React.FC<{
  isOpen: boolean;
  handleClose: (e:any) => void;
  handleSubmit: (e:any) => void;
  title: string;
  description?: string;
}> = (props) => {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        fullWidth={true}
        maxWidth={"md"}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography color={'text.secondary'}>{props.title}</Typography>
        </DialogTitle>
        {props.description && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.description}
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={props.handleClose}>Disagree</Button>
          <Button onClick={props.handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
