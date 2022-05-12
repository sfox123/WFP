import * as React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import { Search } from "@material-ui/icons";

import algoliasearch from "algoliasearch/lite";

import {
  Highlight,
  SearchBox,
  Pagination,
  Hits,
  Configure,
  InstantSearch,
  connectAutoComplete,
} from "react-instantsearch-dom";
const searchClient = algoliasearch(
  "O1TFPYIGTD",
  "fca90bb7e73bbd3a2a81c43430cc4e82"
);

const Search = ({ openSearch, setOpen }) => {
  const [hitCount, setHitCount] = React.useState(0);
  const handleClose = () => {
    setOpen(false);
    setHitCount(0);
  };

  const Autocomplete = ({ hits, currentRefinement, refine }) => (
    <ul>
      <li>
        <input
          type="search"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
      </li>
      {hits.map((hit, i) => (
        <>
          <Highlight attribute={`name`} hit={hit} />
          <Highlight attribute={`items[${i}].invNumber`} hit={hit} />
        </>
      ))}
    </ul>
  );

  const CustomAutocomplete = connectAutoComplete(Autocomplete);

  const Hit = ({ hit }) => {
    return (
      <>
        <ListItem>
          <Button variant="text" href="#" color="inherit" sx={{ mb: 2 }}>
            <Highlight attribute="name" hit={hit} />
          </Button>
        </ListItem>
      </>
    );
  };

  return ReactDOM.createPortal(
    <div>
      <InstantSearch
        onSearchStateChange={(searchState) => {
          if (searchState.query === "") {
            setHitCount(0);
          } else {
            setHitCount(5);
          }
        }}
        searchClient={searchClient}
        indexName="searchApp"
      >
        <Configure analytics={false} hitsPerPage={hitCount} distinct={true} />
        <Dialog
          sx={{}}
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
                {/* <Hits hitComponent={Hit} /> */}
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
