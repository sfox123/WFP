import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

const Assign = ({ cart, setCart }) => {
  const [personName, setPersonName] = React.useState([]);
  const [btnSubmit, setBtnSubmit] = React.useState(true);
  const [remarks, setRemarks] = React.useState("");
  const [inv, setInv] = React.useState("");

  const handleRemarks = (e) => {
    setRemarks(e.target.value);
  };
  const handleInventory = (e) => {
    setInv(e.target.value);
  };
  const addCart = () => {
    let tmpObject = {
      title: personName.title,
      invNumber: inv,
      remark: remarks,
    };
    let newArr = [...cart];
    newArr.unshift(tmpObject);
    setCart(newArr);
    setInv("");
    setBtnSubmit(false);
  };
  return (
    <Box className="loginBox" component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              id="itemList"
              autoSelect={true}
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
                <TextField {...params} label="ITEM LIST" key={"1"} />
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
  );
};

export default Assign;
