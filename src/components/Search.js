import * as React from "react";
import ReactDOM from "react-dom";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import MenuList from "@mui/material/MenuList";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
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
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <MenuList>
          {hits.map((hit, i) => (
            <div key={i}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/${hit._id}/details/${currentRefinement || hit.name}`}
              >
                <ListItem
                  sx={{
                    padding: 2,
                    display: "flex",
                    alignContent: "start",
                    flexDirection: "column",
                  }}
                >
                  {currentRefinement.length > 0 &&
                    hit._highlightResult.name.matchedWords.length > 0 && (
                      <Highlight attribute={`name`} hit={hit} />
                    )}

                  {currentRefinement.length > 0 &&
                    hit._highlightResult.items.map(
                      (x, index) =>
                        x.invNumber.matchedWords.length > 0 && (
                          <Button key={index} style={{}}>
                            <span
                              style={{ marginRight: "2rem" }}
                              dangerouslySetInnerHTML={{
                                __html:
                                  hit.name +
                                  " - " +
                                  x.title.value +
                                  " - " +
                                  x.invNumber.value,
                              }}
                            />
                          </Button>
                        )
                    )}
                </ListItem>
              </Link>
            </div>
          ))}
        </MenuList>
      </List>
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
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            <CustomAutocomplete defaultRefinement="0104" />

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
