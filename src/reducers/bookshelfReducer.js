import ACTIONS from "../constants/actionTypes";

const bookshelfReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_SEARCH_PARAMS:
      const { searchData } = state;
      searchData[action.payload.name] = action.payload.value;
      return { ...state, searchData };
    case ACTIONS.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case ACTIONS.SET_BOOK_DETAILS:
      console.log(action.payload)
      return { ...state, bookDetail: action.payload };
    case ACTIONS.SET_BOOKSHELF:
      return { ...state, bookshelf: action.payload };
    case ACTIONS.UPDATE_BOOKSHELF_ITEM:
      const oldBookshelf = state.bookshelf.filter(
        (x) => x.bookshelfID !== action.payload.bookshelfID
      );
      const newBookshelf = [...oldBookshelf, action.payload];
      return { ...state, bookshelf: newBookshelf };
    case ACTIONS.CREATE_BOOKSHELF_ITEM:
      return { ...state, bookshelf: [...state.bookshelf, action.payload] };
    default:
      return state;
  }
};

export default bookshelfReducer;
