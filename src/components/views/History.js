//btn click
// const handleClick = async () => {
//   setOpen(true)
//   let tmp = [...rows];
//   let arrId = [];
//   checkBox.map((x, i) => {
//     arrId.push(rows[x]);
//     tmp = tmp.filter((item) => !checkBox.includes(item.id));
//   });
//   await props.fetchUpdate(arrId, props.user.name);
//   setRows(tmp)
//   setCheckBox([])
//   setOpen(false)
// };

import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from '../../api/axios';

function createData(name, item, assignedBy, date, verified, remarks, pending) {
  return {
    name,
    item,
    assignedBy,
    date,
    verified,
    remarks,
    pending
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.item}</TableCell>
        <TableCell align="right">{row.assignedBy}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Generate Mail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.date}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="success"
                        onClick={(e) => console.log(e)}
                      >
                        <EmailIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    async function getDate() {
      let tmpArr = [];
      const { data } = await axios.get('/wfp/getHistory');
      data.map((list, index) => {
        list.items.map((x, i) => {
          const { title, invNumber, assignedBy, verified, date, pending, remarks } = x;
          tmpArr.push(createData(list.name, title, assignedBy, date, verified, remarks, pending))
        })
      })
      setRows(tmpArr);
    }
    if (rows) {
      getDate()
    }
  }, [rows])

  return (
    <TableContainer className='tableBox' component={Paper} sx={{ mt: 15 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Staff Name</TableCell>
            <TableCell align="center">ITEM</TableCell>
            <TableCell align="right">Assigned By</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
