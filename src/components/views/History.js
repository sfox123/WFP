import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import axios from '../../api/axios';
import { connect } from "react-redux";
import { vMail } from '../../actions/mail'

import {
  getHistory,
  updateHistory,
  toggleLoader,
  setHistory,
} from "../../actions";
import Modal from "../Modal";
import { IconButton } from "@mui/material";

const History = (props) => {
  const [rows, setRows] = useState([])
  const [data, setData] = useState([])
  const [open, setOpen] = useState(true);
  const [checkBox, setCheckBox] = useState([])

  const columns = [
    { field: "name", headerName: "Staff Name", width: 230 },
    { field: "title", headerName: "ITEMS", width: 230 },
    { field: "assignedBy", headerName: "Assigned By", width: 230 },
    { field: "verified", type: 'boolean', headerName: "Verified", width: 230 },
    { field: "date", headerName: "Date", width: 130 },
  ];

  useEffect(() => {
    async function CleanData() {
      const response = await axios.get('/wfp/getHistory');
      let subArr = response.data;
      subArr.reverse();
      setData(subArr);
      let tmp = [...data];
      let newArr = [];
      tmp.map((x, i) => {
        x.id = i;

        delete x.biometric;
        delete x.signature;
        delete x.unit
        x.items.map((y, index) => {
          newArr.push({ ...x, ['title']: y.title, ['invNumber']: y.invNumber, ['assignedBy']: y.assignedBy, ['gems']: y.gems, ['verified']: y.verified, ['date']: y.date, ['pending']: y.pending })
        });
      });
      newArr.map((x, i) => {
        delete x.items
        delete x.__v
      })
      let nowArr = newArr.filter((item) => item.pending === true);
      setRows(nowArr)
    }
    if (rows.length === 0) {
      CleanData()
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [data, rows])

  const handleSelectionRemove = (e) => {
    setCheckBox(e)
  };
  const handleModal = () => {
    setOpen(false);
  };
  //btn click
  const handleClick = async () => {
    setOpen(true)
    let tmp = [...rows];
    let arrId = [];
    checkBox.map((x, i) => {
      // console.log(x);
      arrId.push(rows[x]);
      tmp = tmp.filter((item) => !checkBox.includes(item.id));
    });
    await props.fetchUpdate(arrId, props.user.name);
    setRows(tmp)
    setCheckBox([])
    setOpen(false)
  };

  //send Mail
  const sendMail = () => {
    let user = {};
    if (checkBox[0] === 0) {
      user = rows[checkBox[0]]
    } else {
      user = rows[checkBox[0]]
    }
    vMail(user?.name, user?.title, user?.invNumber)
  }

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
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%' }}>
        <Button
          onClick={handleClick}
          disabled={checkBox.length === 0 ? true : false}
          sx={{ mt: 3, ml: 9 }}
          variant="contained"
          color="success"
        >
          Recieved
        </Button>
        <IconButton
          sx={{ mt: 3, ml: 9 }}
          color="success"
          disabled={checkBox.length === 1 ? false : true}
          onClick={sendMail}
        >
          <AlternateEmailIcon fontSize="inherit" />
        </IconButton>
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

