import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Nav from "./Nav";
import Button from "@mui/material/Button";
//REDUX
import { connect } from "react-redux";
import Modal from './Modal';
import Snack from "../components/Snack";
import { loggedUser, loggedUserPass, fetchApi, passError } from "../actions";

const Login = ({ user, handleName, handlePass, login }) => {
  const [value, setValue] = React.useState("");

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  }
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChangePass = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handlePass(event.target.value);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClick = async () => {
    setOpen(true);
    await login();
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <>
      <Nav />
      <Box className="loginBox">
        <Modal handleClose={handleClose} loader={open} />
        <Snack />
        <FormControl sx={{ m: 1, width: "25ch", mb: 3 }}>
          <InputLabel id="demo-simple-select-label">USER</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="userName"
            onChange={handleChange}
          >
            {user.map((x, i) => (
              <MenuItem
                onClick={() => handleName(x.user)}
                key={x.value}
                value={i}
              >
                {x.user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 3, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChangePass("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button onClick={handleClick} variant="contained">
          LOGIN
        </Button>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  handleName: loggedUser,
  handlePass: loggedUserPass,
  login: fetchApi,
})(Login);
