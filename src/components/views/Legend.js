import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

import { getHistory, updateHistory, toggleLoader } from "../../actions";

const Legend = ({ history, loader, fetchHistory }) => {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "staff", headerName: "Staff Name", width: 230 },
    { field: "itemName", headerName: "ITEMS", width: 380 },
    { field: "assignedBy", headerName: "Assigned By", width: 230 },
    { field: "receivedBy", headerName: "Received By", width: 230 },
    {
      field: "date",
      headerName: "Date Assigned",
      type: "number",
      width: 130,
      valueGetter: (params) => `${params.row.date.substr(0, 16)}`,
    },
    {
      field: "reveivedDate",
      headerName: "Date Received",
      type: "number",
      width: 130,
      valueGetter: (params) => `${params.row.receivedDate.substr(0, 16)}`,
    },
  ];

  useEffect(() => {
    let tmp = [...history];
    tmp.map((x, i) => {
      x.id = i;
    });
    tmp = tmp.filter((item) => item.pending === false);
    setRows(tmp);
  }, []);

  return (
    <Fragment>
      <div className="tableBox" style={{ height: 600 }}>
        <DataGrid
          sx={{ width: "75rem" }}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { fetchHistory: updateHistory })(
  Legend
);
