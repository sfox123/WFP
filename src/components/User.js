import * as React from "react";
import { InstantSearch, SearchBox } from "react-instantsearch-hooks-web";
import { connectSearchBox } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import TextField from "@mui/material/TextField";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Button from "@mui/material/Button";
import PendingIcon from "@mui/icons-material/Pending";
import Fingerprint from "@mui/icons-material/Fingerprint";
import PersonIcon from "@mui/icons-material/Person";
import FormControl from "@mui/material/FormControl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { matchScore, toggleLoader, toggleSnack, handleAlert } from "../actions";
import NewUser from "./views/NewUser";
import History from "./views/History";
import "../style.css";
import Legend from "./views/Legend";
import Modal from "./Modal";
import Snack from "./Snack";
import Alert from "./Alert";
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

const searchClient = algoliasearch(
  "O1TFPYIGTD",
  "fca90bb7e73bbd3a2a81c43430cc4e82"
);

const itemList = [
  { itemName: "LAPTOP", gems: false },
  { itemName: "LAPTOP - CHARGER", gems: false },
  { itemName: "LAPTOP - DOCKING", gems: false },
  { itemName: "LAPTOP - CARRYBAG BAG", gems: false },
  { itemName: "MONITOR", gems: false },
  { itemName: "KEYBOARD / MOUSE", gems: false },
  { itemName: "WEBCAM", gems: false },
  { itemName: "HEADSET", gems: false },
  { itemName: "MOBILE-PHONE", gems: false },
  { itemName: "MOBILE-CHARGER", gems: false },
  { itemName: "TABLET", gems: false },
  { itemName: "TABLET-CHARGER", gems: false },
  { itemName: "PROJECTOR", gems: false },
  { itemName: "POWER BANK", gems: false },
  { itemName: "DIALOG ROUTER", gems: false },
  { itemName: "POWER - EXTENTION", gems: false },
  { itemName: "OTHER", gems: false },
];
const User = ({ loader, fetchBM, handleToggle, handleAlert, alertOpen }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [inv, setInv] = React.useState("");
  const [personName, setPersonName] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [selectIndex, setSelectIndex] = React.useState(0);
  const [remarks, setRemarks] = React.useState("");
  const [btnSubmit, setBtnSubmit] = React.useState(true);
  const provideHistory = useHistory();

  const handleAlertClose = (value) => {
    setOpen(false);
  };

  const myRef = React.useRef();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleBio = () => {
    fetchBM(personName, remarks, inv);
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
  const handleInventory = (e) => {
    setInv(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectIndex(e);
  };
  const handleCart = () => {
    handleAlert(true);
  };
  const addCart = () => {
    let tmpObject = { title: personName.title, invNumber: inv };
    let newArr = [...cart];
    newArr.unshift(tmpObject);
    setCart(newArr);
    setInv("");
    setPersonName([]);
    setBtnSubmit(false);
  };
  const handleChange = (event) => {};

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
          <InstantSearch searchClient={searchClient} indexName="searchApp">
            <SearchBox placeholder="Search ..." />
          </InstantSearch>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ ml: "auto" }}>
            <IconButton
              onClick={handleCart}
              sx={{ mr: 3 }}
              className="svg_icons__person"
              aria-label="user"
              color="inherit"
            >
              <Badge badgeContent={cart.length} color="warning">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
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
                {index === 0 && <InboxIcon />}
                {index === 1 && <PersonAddAltIcon />}
                {index === 2 && <PendingIcon />}
                {index === 3 && <CategoryIcon />}
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
              <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  id="itemList"
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      setPersonName({ title: newValue });
                      setBtnSubmit(false);
                    } else if (newValue && newValue.inputValue) {
                      setPersonName({ title: newValue });
                      setBtnSubmit(false);
                    } else {
                      setPersonName({});
                      setBtnSubmit(true);
                    }
                  }}
                  freeSolo
                  options={itemList.map((option) => option.itemName)}
                  renderInput={(params) => (
                    <TextField {...params} label="itemName" />
                  )}
                />
              </Stack>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ mt: 2, mb: 2, width: 300, display: "block" }}>
              <TextField
                sx={{ width: "35ch" }}
                label="Inventory Number"
                value={inv}
                id="filled-size-normal"
                variant="filled"
                onChange={handleInventory}
              />
            </FormControl>
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
              onClick={addCart}
              disabled={btnSubmit}
              sx={{ mt: 3 }}
              className="svg_icons"
              aria-label="addCart"
              color="success"
            >
              <AddCircleIcon />
            </IconButton>
          </div>
        </Box>
      )}
      {selectIndex === 1 && <NewUser />}
      {selectIndex === 2 && <History />}
      {selectIndex === 3 && <Legend />}
      {selectIndex === 4 && <Settings />}
      <Alert list={cart} setCart={setCart} />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    logged: state.loggedIn.loggedIn,
    bioMetric: state.bioMetric,

    loader: state.loader,
    history: state.history,
    alertOpen: state.alertOpen,
  };
};

export default connect(mapStateToProps, {
  fetchBM: matchScore,
  handleToggle: toggleLoader,
  handleSnack: toggleSnack,
  handleAlert,
})(User);
