import React, { useState, useContext, createContext, useEffect } from "react";

import {
  createISBNObject,
  createBookObject,
  getBookDetails,
} from "../../utilities";

const BookshelfContext = createContext();

const useBookshelfContext = () => useContext(BookshelfContext);

const INITIALIZE_SEARCH = {
  searchQuery: '"Bloodlines of Atmos"',
};

const INITIALIZE_BOOKSHELF = [
  createBookObject({ ISBN_13: 9798886530247 }), // BoA Bk3
  createBookObject({ ISBN_13: 9781680469035 }), // BoA Bk2
  // createBookItem("Bloodlines of Atmos", 9781680468779),
];

const BookshelfProvider = ({ children }) => {
  const API = "https://www.googleapis.com/books/v1"; // api base link
  const [searchData, setSearchData] = useState(INITIALIZE_SEARCH); // search query/parameters
  const [searchResults, setSearchResults] = useState([]); // results from search
  const [bookDetail, setBookDetail] = useState(); // details about a book.  Will this even be used?
  const [bookshelf, setBookshelf] = useState(INITIALIZE_BOOKSHELF); // main store for user's books (will replace bookDetail?)

  const toggleToBookshelf = (isbnObj) => {
    const isbn = createISBNObject(isbnObj);
    const inBookshelfIdFlag = isInBookshelf(isbn);
    let bookObj = inBookshelfIdFlag
      ? getBookshelfObject(inBookshelfIdFlag)
      : createBookObject(isbn);

    if (inBookshelfIdFlag) {
      bookObj.inBookshelfFlag = !bookObj.inBookshelfFlag
      setBookshelf(curr => ([...curr.filter(x => x.id !== bookObj.id), bookObj]))
    }
    else setBookshelf(curr => ([...curr, bookObj]))
  };

  const isInBookshelf = (isbn) => {
    let returnId;
    if (bookshelf.find((book) => book.id === isbn.ISBN_10))
      returnId = isbn.ISBN_10;
    else if (bookshelf.find((book) => book.id === isbn.ISBN_13))
      returnId = isbn.ISBN_13;
    else returnId = 0;
    return returnId;
  };

  const getBookshelfObject = (id = null, isbnObj = null) => {
    let returnObject;
    if (id) returnObject = bookshelf.find((x) => x.id === id);
    else if (isbnObj) {
      let isbnObjSearch;
      if (isbnObj.ISBN_13)
        isbnObjSearch = bookshelf.find((x) => x.isbn13 === isbnObj.ISBN_13);
      if (!isbnObjSearch && isbnObj.ISBN_10)
        isbnObjSearch = bookshelf.find((x) => x.isbn10 === isbnObj.ISBN_10);
      if (!isbnObjSearch)
        console.log(
          `isbnObjectSearch error -- id =, ${id} -- isbnObj = ${isbnObj}`
        );
    } else
      console.log(`id/isbnObj error -- id =, ${id} -- isbnObj = ${isbnObj}`);
    return returnObject;
  };

  // useEffect(() => console.log("searchData = ", searchData), [searchData]);
  // useEffect(() => console.log("searchResults = ", searchResults), [searchResults] );
  useEffect(() => console.log("bookshelf = ", bookshelf), [bookshelf]);
  // useEffect(() => console.log("bookDetail = ", bookDetail), [bookDetail]);

  return (
    <BookshelfContext.Provider
      value={{
        searchData,
        setSearchData,
        searchResults,
        setSearchResults,
        bookDetail,
        setBookDetail,
        API,
        bookshelf,
        toggleToBookshelf,
      }}
    >
      {children}
    </BookshelfContext.Provider>
  );
};

export { useBookshelfContext, BookshelfProvider };
