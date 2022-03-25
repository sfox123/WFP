import React from "react";
import ReactDOM from "react-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Modal = ({ handleClose, loader }) => {
  return ReactDOM.createPortal(
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loader}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>,
    document.querySelector("#modal")
  );
};

export default Modal;
