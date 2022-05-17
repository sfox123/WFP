import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import { createUser, toggleLoader, createUserMail } from "../../actions";
import "../../style.css";
import Modal from "../Modal";

const NewUser = ({ loader, fetchBM, handleToggle, createUserMail }) => {
  const [cat, setCat] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const handleClose = () => {
    handleToggle(false);
  };

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  const handleChangeName = (e) => {
    setUser(e.target.value);
  };
  const handleBio = () => {
    handleToggle(true);
    fetchBM({ userName: user, userUnit: cat });
    setCat("");
    setUser("");
  };
  const handleMail = () => {
    createUserMail({ userName: user, userUnit: cat });
    setCat("");
    setUser("");
  }
  return (
    <Box className="loginBox" component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Modal loader={loader} handleClose={handleClose} />
      <div>
        <TextField
          sx={{ width: "25ch" }}
          label="STAFF NAME"
          placeholder="NAME"
          value={user}
          id="filled-size-normal"
          variant="filled"
          onChange={handleChangeName}
        />
      </div>
      <div>
        <FormControl fullWidth sx={{ mt: 3, width: "25ch" }}>
          <InputLabel id="demo-simple-select-label">Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cat}
            label="Unit"
            onChange={handleChange}
          >
            <MenuItem value={"IT"}>IT</MenuItem>
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            <MenuItem value={"FINANCE"}>FINANCE</MenuItem>
            <MenuItem value={"PROGRAMME"}>PROGRAMME</MenuItem>
            <MenuItem value={"MANAGEMENT"}>MANAGEMENT</MenuItem>
            <MenuItem value={"HR"}>HR</MenuItem>
            <MenuItem value={"SUPPLY CHAIN"}>SUPPLY-CHAIN</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ListItem
        div
        sx={{
          mt: 3,
          display: "flex",
          width: '25%',
          justifyContent: "space-around",
        }}
      >
        <IconButton
          disabled={
            user === null ||
              user.length === 0 ||
              cat === null ||
              cat.length === 0
              ? true
              : false
          }
          onClick={handleBio}

          className="svg_icons"
          aria-label="fingerprint"
          color="success"
        >
          <Fingerprint />
        </IconButton>
        <IconButton
          disabled={
            user === null ||
              user.length === 0 ||
              cat === null ||
              cat.length === 0
              ? true
              : false
          }
          className=""
          onClick={handleMail}
          aria-label="addMail"
          color="success"
        >
          <AttachEmailIcon fontSize="large" />
        </IconButton>
      </ListItem>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  fetchBM: createUser,
  handleToggle: toggleLoader,
  createUserMail
})(NewUser);
