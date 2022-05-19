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
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import axios from '../../api/axios';
import { blue } from "@mui/material/colors";
import { connect } from "react-redux";

import {
  getHistory,
  updateHistory,
  toggleLoader,
  setHistory,
} from "../../actions";
import Modal from "../Modal";

const History = (props) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [rows, setRows] = useState([])
  const [data, setData] = useState([])
  const [open, setOpen] = useState(true);
  const [checkBox, setCheckBox] = useState([])
  const [columns, setColumns] = useState([
    { field: "name", headerName: "Staff Name", width: 230 },
    { field: "title", headerName: "ITEMS", width: 230 },
    { field: "assignedBy", headerName: "Assigned By", width: 230 },
    { field: "verified", type: 'boolean', headerName: "Verified", width: 230, format: (option) => option ? <CheckRoundedIcon /> : <ClearRoundedIcon /> },
    { field: "date", headerName: "Assigned Date", width: 130 },
    { field: "recievedDate", headerName: "Recieved Date", width: 130 },
    { field: "recievedBy", headerName: "Recieved By", width: 130 },
  ])

  useEffect(() => {
    async function CleanData() {
      const response = await axios.get('/wfp/getHistory');
      setData(response.data);
      let tmp = [...data];
      tmp.reverse()
      let newArr = [];
      tmp.map((x, i) => {
        x.id = i;

        delete x.biometric;
        delete x.signature;
        delete x.unit
        x.items.map((y, index) => {
          if (y.pending === false) {
            newArr.push({
              ...x, ['title']: y.title,
              ['invNumber']: y.invNumber,
              ['assignedBy']: y.assignedBy,
              ['gems']: y.gems,
              ['verified']: y.verified,
              ['date']: y.date,
              ['pending']: y.pending,
              ['recievedDate']: y.recievedDate,
              ['recievedBy']: y.recievedBy
            })
          }
        });
      });
      newArr.map((x, i) => {
        delete x.items
        delete x.__v
      })
      let nowArr = newArr.filter((item) => item.pending === false);
      setRows(nowArr)
    }
    if (rows.length === 0) {
      CleanData()
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [data, rows])



  const handleRowClick = async (e) => {
    let tmp = [...selectedValue];
    tmp.push(e.row)
    setSelectedValue(tmp);
  };

  // const handleClose = (value) => {
  //   setState({ open: false, selectedValue: value });
  // };

  // const handleOpen = () => {
  //   setOpen({ open: true });
  // };

  const handleSelectionRemove = (e) => {
    setCheckBox(e)
  };
  const handleModal = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Modal handleClose={handleModal} loader={open} />

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
        // onRowDoubleClick={handleOpen}
        />
      </div>
    </Box>
  );

}
const mapStateToProps = (state) => {
  return {
    loader: state.loader,
    user: state.fetchData,
  };
};

export default connect(mapStateToProps, {
  fetchHistory: getHistory,
  fetchUpdate: updateHistory,
  setLoad: toggleLoader,
  setRow: setHistory,
})(History);
