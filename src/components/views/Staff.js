import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import Typography from "@mui/material/Typography";

import axios from "../../api/axios";
import Modal from "../Modal";

const Staff = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(true);
  let params = useParams();

  useEffect(() => {
    async function getData() {
      const { userId } = params;
      const getData = await axios.post("/wfp/getStaff", { userId });
      setData(getData.data);
    }
    if (data.length === 0) {
      getData();
    } else {
      setOpen(false);
    }
  }, [params, data]);

  const valueToBold = (match) => {
    const regex = new RegExp(params.query, "g");
    return match.replace(regex, "<p class='highlight'>$&</p>");
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Modal handleClose={handleClose} loader={open} />
      <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
        Search Result - {params.query}
      </Typography>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        {data.name}
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {!open &&
          data.items.map((x, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={x.title} secondary={x.date} />
              <span
                dangerouslySetInnerHTML={{ __html: valueToBold(x.invNumber) }}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Staff;
