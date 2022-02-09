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
const emails = ["username@gmail.com", "user02@gmail.com"];

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

const History = ({ history }) => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [remarks, setRemarks] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState([]);

  useEffect(() => {
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

  return (
    <Box>
      <div className="tableBox" style={{ height: 400 }}>
        <DataGrid
          sx={{ width: "75rem" }}
          rows={rows}
          columns={columns}
          pageSize={2}
          rowsPerPageOptions={[10]}
          checkboxSelection
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
        <Button variant="contained" color="primary">
          Recieved
        </Button>
      </div>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return { history: state.history };
};

export default connect(mapStateToProps)(History);
