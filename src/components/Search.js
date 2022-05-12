import * as React from "react";
import ReactDOM from "react-dom";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import { Search } from "@material-ui/icons";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import algoliasearch from "algoliasearch/lite";

import {
  Highlight,
  Pagination,
  Configure,
  InstantSearch,
  connectAutoComplete,
} from "react-instantsearch-dom";
import { Link } from "react-router-dom";
const searchClient = algoliasearch(
  "O1TFPYIGTD",
  "fca90bb7e73bbd3a2a81c43430cc4e82"
);

const MaterialSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  padding: 2,
  marginBottom: 2,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Search = ({ openSearch, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const Autocomplete = ({ hits, currentRefinement, refine }) => (
    <>
      <MaterialSearch>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={currentRefinement}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => {
            refine(event.currentTarget.value);
          }}
        />
      </MaterialSearch>
      <Paper
        sx={{
          scrollBehavior: "smooth",
          width: 320,
          marginTop: 5,
          padding: 2,
          maxWidth: "100%",
        }}
      >
        <MenuList>
          {hits.map((hit, i) => (
            <div>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/${hit._id}/details/${currentRefinement || hit.name}`}
              >
                <MenuItem sx={{ padding: 2 }}>
                  <Highlight attribute={`name`} hit={hit} />
                </MenuItem>
              </Link>
              <Divider sx={{}} />
            </div>
          ))}
        </MenuList>
      </Paper>
    </>
  );

  const CustomAutocomplete = connectAutoComplete(Autocomplete);

  return ReactDOM.createPortal(
    <div>
      <InstantSearch searchClient={searchClient} indexName="searchApp">
        <Configure analytics={false} hitsPerPage={5} distinct={true} />
        <Dialog
          color="black"
          open={openSearch}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {/* <SearchBox placeholder="Search ..." /> */}
          </DialogTitle>
          <DialogContent>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <CustomAutocomplete />
              </List>
            </ul>
            <div className="pagination">
              <Pagination />
            </div>
          </DialogContent>
        </Dialog>
      </InstantSearch>
    </div>,
    document.querySelector("#search")
  );
};

export default Search;
