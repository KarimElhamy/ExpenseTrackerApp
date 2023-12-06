import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../state";
import { RootState } from "../state/reducers";
import Button from "@mui/material-next/Button";
import "../HomePage.css";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  let [newCateg, setNewCateg] = React.useState<string>("");

  const dispatch = useDispatch();

  const { addCategory } = bindActionCreators(actionCreators, dispatch);

  const categoryState = useSelector((state: RootState) => state.categoriesList);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    if (newCateg != "") {
      addCategory(newCateg);
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        size="medium"
        variant="elevated"
        style={{ margin: "5px", backgroundColor: "white" }}
      >
        Add New Category
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Add your desired category</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Category"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewCateg(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
