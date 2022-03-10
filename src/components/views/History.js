import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { blue } from "@mui/material/colors";
import { connect } from "react-redux";

import { getHistory, updateHistory } from "../../actions";

const columns = [
  { field: "staff", headerName: "Staff Name", width: 230 },
  { field: "itemName", headerName: "ITEMS", width: 380 },
  { field: "assignedBy", headerName: "Assigned By", width: 230 },
  {
    field: "date",
    headerName: "Date",
    type: "number",
    width: 130,
    valueGetter: (params) => `${params.row.date.substr(0, 16)}`,
  },
];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, remarks } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>ITEM LIST</DialogTitle>
      <List sx={{ pt: 0 }}>
        {selectedValue.map((x, i) => (
          <ListItem button key={i}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "white", color: blue[600] }}>
                <ArrowRightIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={x} />
          </ListItem>
        ))}
        {remarks.length > 0 && (
          <>
            <DialogTitle sx={{ fontSize: 3 }}>REMARKS</DialogTitle>
            <ListItem button>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "white", color: blue[600] }}>
                  <ArrowRightIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={remarks} />
            </ListItem>
          </>
        )}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  remarks: PropTypes.string.isRequired,
};

const History = ({ history, fetchHistory, user, fetchUpdate }) => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [remarks, setRemarks] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [checkBox, setCheckBox] = React.useState([]);

  useEffect(() => {
    fetchHistory();
    history.map((x, i) => {
      if (x.pending === false) {
        history.splice(i, 1);
      } else {
        x.id = i;
      }
    });
    setRows(history);
  }, []);

  const handleRowClick = (e) => {
    setRemarks(e.row.remarks);
    setSelectedValue(e.row.itemName);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSelectionRemove = (e) => {
    setCheckBox(e);
  };

  const handleClick = () => {
    let arrId = [];
    checkBox.map((x, i) => {
      arrId.push(history[x]._id);
    });
    fetchUpdate(arrId, user.name);
  };

  return (
    <Box>
      <div className="tableBox" style={{ height: 400 }}>
        <DataGrid
          sx={{ width: "75rem" }}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={handleSelectionRemove}
          onRowClick={handleRowClick}
          onRowDoubleClick={handleOpen}
        />
        <SimpleDialog
          open={open}
          selectedValue={selectedValue}
          onClose={handleClose}
          remarks={remarks}
        />
      </div>
      <div>
        <Button
          onClick={handleClick}
          disabled={checkBox.length === 0 ? true : false}
          sx={{ mt: 3, ml: 9 }}
          variant="contained"
          color="success"
        >
          Recieved
        </Button>
      </div>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return { history: state.history, user: state.fetchData };
};

export default connect(mapStateToProps, {
  fetchHistory: getHistory,
  fetchUpdate: updateHistory,
})(History);
