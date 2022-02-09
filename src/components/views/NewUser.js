import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Select from "@mui/material/Select";
import MuiAlert from "@mui/material/Alert";

import { createUser, toggleLoader, toggleSnack } from "../../actions";
import "../../style.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const NewUser = ({ loader, fetchBM, handleSnack, handleToggle, openSnack }) => {
  const [cat, setCat] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const { snackOpen, snackMessage } = openSnack;
  const handleClose = () => {
    handleToggle(false);
  };

  const handleChange = (event) => {
    setCat(event.target.value);
  };
  const handleCloseSnack = () => {
    const SNACK = {
      snackOpen: false,
      snackMessage: null,
    };
    handleSnack(SNACK);
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
  return (
    <Box className="loginBox" component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
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
            <MenuItem value={"PROGRAMMING"}>PROGRAMMING</MenuItem>
            <MenuItem value={"HR"}>HR</MenuItem>
            <MenuItem value={"LOGISTIC"}>LOGISTIC</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
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
          sx={{ mt: 3 }}
          className="svg_icons"
          aria-label="fingerprint"
          color="success"
        >
          <Fingerprint />
        </IconButton>
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
  handleSnack: toggleSnack,
})(NewUser);
