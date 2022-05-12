import * as React from "react";
import ReactDOM from "react-dom";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";
//react
import { connect } from "react-redux";
import { handleAlert, matchScore } from "../actions";
import Modal from "./Modal";

const Alert = (props) => {
  const [open, setOpen] = React.useState(false);
  const { handleAlert, alertOpen, list, setCart, matchScore, openSnack } =
    props;
  const { snackOpen } = openSnack;

  const handleClose = () => {
    handleAlert(false);
  };

  const removeCart = (e) => {
    let tmp = [...list];

    tmp.splice(tmp.indexOf(e), 1);
    setCart(tmp);
  };
  const handleModal = () => {
    setOpen(false);
  };
  const handleBio = () => {
    matchScore(list);
    handleAlert(false);
    setOpen(true);
    setCart([]);
  };
  return ReactDOM.createPortal(
    <>
      {list.length === 0 && (
        <Dialog onClose={handleClose} open={alertOpen}>
          <DialogTitle>Bucket is Empty</DialogTitle>
        </Dialog>
      )}
      {list.length > 0 && (
        <Dialog onClose={handleClose} open={alertOpen}>
          <Modal handleClose={handleModal} loader={open} />
          <DialogTitle>Bucket Items</DialogTitle>
          <List sx={{ pt: 0 }}>
            {list.length > 0 &&
              list.map((item) => (
                <ListItem button key={item.title}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} />
                  <IconButton
                    onClick={removeCart}
                    sx={{ ml: 3 }}
                    aria-label="removeCart"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            <ListItem
              div
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton
                className="svg_icons"
                aria-label="addCart"
                color="success"
                onClick={handleBio}
              >
                <Fingerprint />
              </IconButton>
            </ListItem>
          </List>
        </Dialog>
      )}
    </>,
    document.querySelector("#alert")
  );
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { handleAlert, matchScore })(Alert);
