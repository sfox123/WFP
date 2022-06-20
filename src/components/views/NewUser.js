import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import { createUser, toggleLoader, createUserMail } from "../../actions";
import "../../style.css";
import Modal from "../Modal";

const NewUser = ({ loader, fetchBM, handleToggle, createUserMail, userName, setUserName, cat, setCat }) => {

  const handleClose = () => {
    handleToggle(false);
  };

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  const handleChangeName = (e) => {
    setUserName(e.target.value);
  };
  const handleBio = () => {
    handleToggle(true);
    fetchBM({ userName: userName, userUnit: cat });
    setCat("");
    setUserName("");
  };
  const handleMail = () => {
    createUserMail({ userName: userName, userUnit: cat });
    setCat("");
    setUserName("");
  }
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Modal loader={loader} handleClose={handleClose} />
      <div>
        <TextField
          sx={{ width: "25ch" }}
          label="STAFF NAME"
          placeholder="NAME"
          value={userName}
          id="filled-size-normal"
          variant="filled"
          onChange={handleChangeName}
        />
      </div>
      <div>
        <FormControl sx={{ mt: 2, width: "25ch" }}>
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
