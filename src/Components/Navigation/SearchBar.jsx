import React from "react";

import { Link } from "react-router-dom";
import { Dropdown, Image, Row, Col } from "react-bootstrap";

import FavoritesIcon from "../elements/FavoritesIcon";

import ACTIONS from "../../constants/actionTypes";
import { createAuthorString } from "../../utilities";
import { useBookshelfContext } from "../../hooks";

const SearchBar = () => {
  const { state, dispatch } = useBookshelfContext();

  const { searchData, searchResults } = state;
  const { searchQuery } = searchData;

  const handleChange = (e) =>
    dispatch({ type: ACTIONS.UPDATE_SEARCH_PARAMS, payload: e.target });

  const handleSearchDetails = (details) =>
    dispatch({ type: ACTIONS.SET_BOOK_DETAILS, payload: details });

  return (
    <Dropdown className="w-50">
      <Dropdown.Toggle style={{ width: "100%" }}>
        <input
          name="searchQuery"
          placeholder="Search for books"
          onChange={handleChange}
          value={searchQuery}
          type="search"
          aria-label="Search"
          className="w-100"
          style={{ maxWidth: "95%" }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {searchResults?.items?.length > 0 &&
          searchResults.items.map((result, index) => (
            <Dropdown.Item key={`searchResultDropdownItem-${index}`} as="div">
              <Row>
                <Col
                  as={Link}
                  to="details"
                  xs={0}
                  sm={3}
                  style={{ height: "90px" }}
                  className="justify-content-center d-none d-sm-flex"
                  onClick={() => handleSearchDetails(result.volumeInfo)}
                >
                  <Image
                    src={result.volumeInfo.imageLinks?.thumbnail}
                    alt="cover"
                    style={{ width: "auto", maxWidth: "100px" }}
                  />
                </Col>
                <Col
                  as={Link}
                  to="details"
                  xs={10}
                  sm={7}
                  style={{ height: "90px" }}
                  onClick={() => handleSearchDetails(result.volumeInfo)}
                >
                  <div style={{ overflow: "hidden" }}>
                    {result.volumeInfo.title}
                  </div>
                  {result.volumeInfo.subtitle && (
                    <div style={{ overflow: "hidden" }}>
                      {result.volumeInfo.subtitle}
                    </div>
                  )}
                  <div style={{ overflow: "hidden" }}>
                    by:
                    <span className="ms-1">
                      {createAuthorString(result.volumeInfo.authors)}
                    </span>
                  </div>
                </Col>
                <Col xs={2}>
                  {/* <FavoritesIcon toggle={isOnBookshelf( null, result.volumeInfo.industryIdentifiers )} onClick={() => toggleToBookshelf(result.volumeInfo.industryIdentifiers) } /> */}
                </Col>
              </Row>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchBar;
