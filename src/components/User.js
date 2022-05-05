import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import Fingerprint from "@mui/icons-material/Fingerprint";
import PersonIcon from "@mui/icons-material/Person";
import FormControl from "@mui/material/FormControl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { matchScore, toggleLoader, toggleSnack } from "../actions";
import NewUser from "./views/NewUser";
import History from "./views/History";
import "../style.css";
import Legend from "./views/Legend";
import Modal from "./Modal";
import Snack from "./Snack";
import Settings from "./views/Settings";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "LAPTOP",
  "LAPTOP - CHARGER",
  "LAPTOP - DOCKING",
  "LAPTOP - CARRYBAG BAG",
  "MONITOR",
  "KEYBOARD / MOUSE",
  "WEBCAM",
  "HEADSET",
  "MOBILE-PHONE",
  "MOBILE-CHARGER",
  "TABLET",
  "TABLET-CHARGER",
  "PROJECTOR",
  "POWER BANK",
  "DIALOG ROUTER",
  "POWER - EXTENTION",
  "OTHER",
];
const User = ({ loader, fetchBM, handleToggle }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [selectIndex, setSelectIndex] = React.useState(0);
  const [remarks, setRemarks] = React.useState("");
  const provideHistory = useHistory();
  const myRef = React.useRef();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleBio = () => {
    fetchBM(personName, remarks);
    setPersonName([]);
  };
  const handleLogout = () => {
    window.localStorage.setItem("loggedUser", false);
    provideHistory.push("/login");
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleRemarks = (e) => {
    setRemarks(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectIndex(e);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClose = () => {
    handleToggle(false);
  };

  const handleUser = () => {
    handleSelect(4);
  };

  return (
    <Box ref={myRef} sx={{ display: "flex" }}>
      <Modal handleClose={handleClose} loader={loader} />
      <Snack />
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {selectIndex === 0
              ? "Item Assignment"
              : selectIndex === 1
              ? "Add New Staff"
              : selectIndex === 2
              ? "Pending Items"
              : selectIndex === 3
              ? "Recieved Items"
              : selectIndex === 4
              ? "User Settings"
              : null}
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <IconButton
              onClick={handleUser}
              sx={{ mr: 3 }}
              className="svg_icons__person"
              aria-label="user"
              color="inherit"
            >
              <PersonIcon />
            </IconButton>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Item Assignment",
            "Add New Staff",
            "Pending Items",
            "Recieved Items",
          ].map((text, index) => (
            <ListItem
              id={index}
              selected={index === selectIndex ? true : false}
              onClick={() => {
                handleSelect(index);
              }}
              button
              key={text}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      {selectIndex === 0 && (
        <Box className="loginBox" component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">ITEM</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ mt: 2, mb: 2, width: 300 }}>
              <TextField
                sx={{ width: "35ch" }}
                label="Remarks"
                value={remarks}
                id="filled-size-normal"
                variant="filled"
                onChange={handleRemarks}
              />
            </FormControl>
          </div>
          <div>
            <IconButton
              onClick={handleBio}
              disabled={personName.length === 0 ? true : false}
              sx={{ mt: 3 }}
              className="svg_icons"
              aria-label="fingerprint"
              color="success"
            >
              <Fingerprint />
            </IconButton>
          </div>
        </Box>
      )}
      {selectIndex === 1 && <NewUser />}
      {selectIndex === 2 && <History />}
      {selectIndex === 3 && <Legend />}
      {selectIndex === 4 && <Settings />}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    logged: state.loggedIn.loggedIn,
    bioMetric: state.bioMetric,

    loader: state.loader,
    history: state.history,
  };
};

export default connect(mapStateToProps, {
  fetchBM: matchScore,
  handleToggle: toggleLoader,
  handleSnack: toggleSnack,
})(User);
