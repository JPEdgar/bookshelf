import ACTIONS from "../constants/actionTypes";
import { updateBook, setBook, deleteBook } from "../actions/bookshelf";

const bookshelfReducer = async (books = [], action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_BOOK:
      await updateBook(action.payload);
      return [...books, action.payload];
    case ACTIONS.SET_BOOK:
      await setBook(action.payload);
      console.log(action);
      // console.log([action.payload, ...books])
      return [action.payload, ...books];
    case ACTIONS.DELETE_BOOK:
      await deleteBook(action.payload);
      const filteredShelf = books.filter((x) => x.id !== action.payload);
      return filteredShelf;
    case "reset": // temp
      return [];
    default:
      return books;
  }
};

export { bookshelfReducer };
