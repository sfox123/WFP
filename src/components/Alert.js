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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fingerprint from "@mui/icons-material/Fingerprint";
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";
//react
import { connect } from "react-redux";
import { handleAlert, matchScore, createUser, createUserMail } from "../actions";
import Modal from "./Modal";
import { sMail } from '../actions/mail';

import axios from "../api/axios";
import NewUser from './views/NewUser';

const Alert = (props) => {
  const [open, setOpen] = React.useState(false);
  const [mail, setMail] = React.useState(false);
  const [newUser, setNewUser] = React.useState(false);
  const [user, setUser] = React.useState('');
  const [name, setName] = React.useState(null);
  const [cat, setCat] = React.useState(null);
  const [submit, setSubmit] = React.useState(true)
  const { handleAlert, alertOpen, list, setCart, fetchFP, history, fetchData, createUser, createUserMail
  } =
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
  const handleBio = async () => {
    if (newUser) {
      handleAlert(false);
      setOpen(true);
      await createUser({ userName: name, userUnit: cat, list })
      setCart([]);
      setOpen(false);
      setName(null);
      setCat(null)
    } else {
      fetchFP(list);
      handleAlert(false);
      setOpen(true);
      setCart([]);
    };
  }
  //deciding wether it should work or not
  const masterBlaster = (e) => {
    switch (e) {
      case 1:
        if (newUser && name && cat)
          return false;
        else if (!newUser)
          return false;
        else
          return true;
      case 2:
        if (newUser)
          return false;
        else if (mail)
          return false;
        else
          return true
      case 3:
        if (mail)
          return true;
        else if (newUser)
          return true;
        else
          return false;
      case 4:
        if (user)
          return false;
        else if (newUser && name && cat)
          return false;
        else
          return true
      default:
        return true;
    }
  }

  const handleSignMail = async () => {
    //send the item verified false
    setOpen(true);
    let userName = user.split('@')[0]
    const response = await axios.post('/wfp/postMailOnly', { user: userName, list, assignedBy: fetchData.name });
    setCart([]);
    setOpen(false);
    handleClose()
    sMail(response.data, list);
  }
  const handleSignMailNew = async () => {
    // send the item verified false
    setOpen(true);
    // let userName = user.split('@')[0]
    const response = await axios.post('/wfp/getMail', { name, list, assignedBy: fetchData.name, cat });
    // console.log(name, cat, user)
    setCart([]);
    setOpen(false);
    handleClose()
    sMail(response.data, list);
  }

  const tmp = history?.filter((item) => item.name != null)

  return ReactDOM.createPortal(
    <>
      <Modal handleClose={handleModal} loader={open} />
      {!mail && list.length === 0 && (
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
                    options={tmp?.map((option) =>
                      `${option.name}@wfp.org`
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="MAIL LIST" key={"1"} />
                    )}
                  />
                </Stack>
              </FormControl>
            )}
            {!mail && <ListItem>
              <FormGroup>
                <FormControlLabel checked={newUser} onClick={(e) => setNewUser(e.target.checked)} control={<Checkbox />} label="New User" />
                {newUser && <NewUser userName={name} setUserName={setName} cat={cat} setCat={setCat} />}
              </FormGroup>
            </ListItem>}
            <ListItem
              div
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {!mail && <IconButton
                className="svg_icons"
                aria-label="addCart"
                color="success"
                disabled={masterBlaster(1)}
                onClick={handleBio}
              >
                <Fingerprint />
              </IconButton>}
              {mail && <IconButton
                className="svg_icons"
                aria-label="addCart"
                color="success"
                disabled={masterBlaster(1)}
                onClick={() => setMail(false)}
              >
                <ArrowBackIcon />
              </IconButton>}
              {masterBlaster(2) && (<IconButton
                className=""
                aria-label="addCart"
                color="success"
                onClick={handleMail}
              >
                <AttachEmailIcon fontSize="large" />
              </IconButton>)}
              {mail && (<IconButton
                className=""
                onClick={handleSignMail}
                aria-label="addCart"
                disabled={masterBlaster(4)}
                color="success"

              >
                <SendIcon fontSize="large" color='success' />
              </IconButton>)}
              {newUser && (<IconButton
                className=""
                onClick={handleSignMailNew}
                aria-label="addCart"
                disabled={masterBlaster(4)}
                color="success"

              >
                <SendIcon fontSize="large" color='success' />
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
export default connect(mapStateToProps, { handleAlert, fetchFP: matchScore, createUser, createUserMail })(Alert);
