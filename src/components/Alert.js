import * as React from "react";
import ReactDOM from "react-dom";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
// import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import SendIcon from '@mui/icons-material/Send';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";

import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";
//react
import { connect } from "react-redux";
import { handleAlert, matchScore } from "../actions";
import Modal from "./Modal";
import { vMail } from '../actions/mail';
import db from "../api/db.json";

const Alert = (props) => {
  const [open, setOpen] = React.useState(false);
  const [mail, setMail] = React.useState(false);
  const [user, setUser] = React.useState('');
  const [submit, setSubmit] = React.useState(true)
  const { handleAlert, alertOpen, list, setCart, fetchFP } =
    props;

  const handleClose = () => {
    handleAlert(false);
  };
  const handleMail = (e) => {
    setMail(true);
  };
  const removeCart = (e) => {
    let tmp = [...list];

    tmp.splice(tmp.indexOf(e), 1);
    setCart(tmp);
    if (tmp.length === 0) {
      setMail(false)
    }
  };
  const handleModal = () => {
    setOpen(false);
  };
  const handleBio = () => {
    fetchFP(list);
    handleAlert(false);
    setOpen(true);
    setCart([]);
  };


  return ReactDOM.createPortal(
    <>
      {!mail && list.length === 0 && (
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
            {mail && (
              <FormControl sx={{ m: 1, width: 300 }}>
                <Stack spacing={2} sx={{ width: 300 }}>
                  <Autocomplete
                    id="itemList"
                    autoSelect={true}
                    onChange={(event, newValue) => {
                      if (typeof newValue === "string") {
                        setUser(newValue)
                        setSubmit(false)
                      } else if (newValue && newValue.inputValue) {
                        setUser(newValue)
                        setSubmit(false)
                      } else {
                        setUser('')
                        setSubmit(false)
                      }
                    }}
                    freeSolo
                    options={db.EMAIL.map((option) => option)}
                    renderInput={(params) => (
                      <TextField {...params} label="MAIL LIST" key={"1"} />
                    )}
                  />
                </Stack>
              </FormControl>

            )}
            <ListItem
              div
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-around",
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
              {!mail && (<IconButton
                className=""
                aria-label="addCart"
                color="success"
                onClick={handleMail}
              >
                <AttachEmailIcon fontSize="large" />
              </IconButton>)}
              {mail && (<IconButton
                className=""
                onClick={() => vMail(user, list)}
                aria-label="addCart"
                disabled={submit}
                color="success"

              >
                <SendIcon fontSize="large" color='primary' />
              </IconButton>)}
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
export default connect(mapStateToProps, { handleAlert, fetchFP: matchScore })(Alert);
