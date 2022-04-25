import React, { useState } from "react";
import Box from "@mui/material/Box";
import "@fontsource/roboto/300.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import Snack from "../Snack";
import { connect } from "react-redux";
import { changePass } from "../../actions";

const Settings = ({ fetchData, setPass }) => {
  const [input, setInput] = useState({ oldPass: "", newPass: "", rePass: "" });
  const [error, setError] = useState({
    oldPass: false,
    newPass: false,
    rePass: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password } = fetchData;
    if (Object.keys(input).length === 0) {
      setError(true);
    } else if (password !== input.oldPass) {
      setError({ ...error, ["oldPass"]: true });
    } else if (input.newPass !== input.rePass) {
      setError({ ...error, ["rePass"]: true });
    } else {
      setError({ ...error, ["oldPass"]: false, ["rePass"]: false });
      setPass(input.newPass);
      setInput({ oldPass: "", newPass: "", rePass: "" });
    }
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <Box
      className="SettingBox"
      component="form"
      onSubmit={handleSubmit}
      sx={{ flexGrow: 1, p: 3 }}
    >
      <Snack />
      <Typography component="h4" variant="h4" mb={3}>
        Change Password
      </Typography>
      <TextField
        type="password"
        name="oldPass"
        error={error.oldPass}
        autoComplete="current-password"
        label="Old Password"
        id="outlined-password-input"
        sx={{ borderColor: "green", borderWidth: 2, marginBottom: "2rem" }}
        onChange={handleChange}
        value={input.oldPass}
      />
      <TextField
        error={error.newPass}
        type="password"
        name="newPass"
        autoComplete="current-password"
        label="New Password"
        id="outlined-password-input"
        sx={{ marginBottom: "2rem" }}
        onChange={handleChange}
        value={input.newPass}
      />
      <TextField
        type="password"
        error={error.rePass}
        name="rePass"
        autoComplete="current-password"
        label="Re-Type Password"
        id="outlined-password-input"
        sx={{ marginBottom: "2rem" }}
        onChange={handleChange}
        value={input.rePass}
      />
      <Button
        type="submit"
        // disabled={error.newPass ? true : error.rePass ? true : false}
        variant="contained"
      >
        Change Password
      </Button>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { setPass: changePass })(Settings);
