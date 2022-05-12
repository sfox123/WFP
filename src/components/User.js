import * as React from "react";
// import { connectSearchBox } from "react-instantsearch-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Button from "@mui/material/Button";
import PendingIcon from "@mui/icons-material/Pending";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toggleLoader, toggleSnack, handleAlert, matchScore } from "../actions";
import NewUser from "./views/NewUser";
import History from "./views/History";
import Assign from "./views/Assign";
import Legend from "./views/Legend";
import Modal from "./Modal";
import Snack from "./Snack";
import Alert from "./Alert";
import Search from "./Search";
import Settings from "./views/Settings";
import "../style.css";

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

const User = ({ loader, handleToggle, handleAlert }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  const [selectIndex, setSelectIndex] = React.useState(0);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const provideHistory = useHistory();

  const myRef = React.useRef();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    window.localStorage.setItem("loggedUser", false);
    provideHistory.push("/login");
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSelect = (e) => {
    setSelectIndex(e);
  };
  const handleCart = () => {
    handleAlert(true);
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
      <Search openSearch={searchOpen} setOpen={setSearchOpen} />
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
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ ml: "auto" }}>
            <IconButton
              onClick={() => {
                setSearchOpen(true);
              }}
              sx={{ mr: 3, mt: 0.6 }}
              className="svg_icons__person"
              aria-label="user"
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
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
      {selectIndex === 0 && <Assign cart={cart} setCart={setCart} />}
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
  };
};

export default connect(mapStateToProps, {
  handleToggle: toggleLoader,
  handleSnack: toggleSnack,
  handleAlert,
  matchScore,
})(User);
