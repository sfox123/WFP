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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";
//react
import { connect } from "react-redux";
import { handleAlert } from "../actions";

const emails = ["username@gmail.com", "user02@gmail.com"];

const Alert = (props) => {
  const { handleAlert, alertOpen, list, setCart } = props;

  const handleClose = () => {
    handleAlert(false);
  };

  const removeCart = (e) => {
    let tmp = [...list];

    tmp.splice(tmp.indexOf(e), 1);
    setCart(tmp);
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
              autoFocus
              button
              onClick={() => console.log("addAccount")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
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
export default connect(mapStateToProps, { handleAlert })(Alert);
