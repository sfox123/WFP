import React from "react";
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

import {
  getHistory,
  updateHistory,
  toggleLoader,
  setHistory,
} from "../../actions";
import Modal from "../Modal";
import Snack from "../Snack";

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

class History extends React.Component {
  state = {
    rows: [],
    open: false,
    remarks: "",
    selectedValue: [],
    checkBox: [],
    columns: [
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
    ],
  };

  componentDidMount() {
    this.props.fetchHistory();
    let tmp = [...this.props.history];
    tmp.map((x, i) => {
      x.id = i;
    });
    tmp = tmp.filter((item) => item.pending === true);
    this.setState({ rows: tmp });
    console.log("running");
  }
  // componentWillUnmount() {

  // }

  handleRowClick = (e) => {
    this.setState({ remarks: e.row.remarks, selectedValue: e.row.itemName });
  };

  handleClose = (value) => {
    this.setState({ open: false, selectedValue: value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSelectionRemove = (e) => {
    this.setState({ checkBox: e });
  };
  handleModal = () => {
    this.props.setLoad(false);
  };
  //btn click
  handleClick = () => {
    let tmp = [...this.state.rows];
    let arrId = [];
    this.state.checkBox.map((x, i) => {
      arrId.push(this.props.history[x]._id);
      tmp = tmp.filter((item) => !this.state.checkBox.includes(item.id));
    });
    this.props.fetchUpdate(arrId, this.props.user.name);
    this.setState({ rows: tmp });
    this.props.setRow(tmp);
    this.setState({ checkBox: [] });
    this.props.setLoad(false);
  };
  render() {
    return (
      <Box>
        <Modal handleClose={this.handleModal} loader={this.props.loader} />
        <Snack />
        <div className="tableBox" style={{ height: 400 }}>
          <DataGrid
            sx={{ width: "75rem" }}
            rows={this.state.rows}
            columns={this.state.columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onSelectionModelChange={this.handleSelectionRemove}
            onRowClick={this.handleRowClick}
            onRowDoubleClick={this.handleOpen}
          />
          <SimpleDialog
            open={this.state.open}
            selectedValue={this.state.selectedValue}
            onClose={this.handleClose}
            remarks={this.state.remarks}
          />
        </div>
        <div>
          <Button
            onClick={this.handleClick}
            disabled={this.state.checkBox.length === 0 ? true : false}
            sx={{ mt: 3, ml: 9 }}
            variant="contained"
            color="success"
          >
            Recieved
          </Button>
        </div>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
    history: state.history,
    user: state.fetchData,
  };
};

export default connect(mapStateToProps, {
  fetchHistory: getHistory,
  fetchUpdate: updateHistory,
  setLoad: toggleLoader,
  setRow: setHistory,
})(History);
