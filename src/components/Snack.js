import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { toggleSnack } from "../actions";

import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snack = ({ openSnack, handleSnack }) => {
  const { snackOpen, snackMessage, severity } = openSnack;

  const handleCloseSnack = () => {
    const SNACK = {
      snackOpen: false,
      snackMessage: null,
    };
    handleSnack(SNACK);
  };
  return ReactDOM.createPortal(
    <Snackbar
      open={snackOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnack}
    >
      <Alert
        onClose={handleCloseSnack}
        severity={severity ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {snackMessage}
      </Alert>
    </Snackbar>,
    document.querySelector("#snack")
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { handleSnack: toggleSnack })(Snack);
