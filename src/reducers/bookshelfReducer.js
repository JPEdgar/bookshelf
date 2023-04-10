import SHELF_TYPES from "../constants/types/bookshelfTypes";

const bookshelfReducer = (state, action) => {
  // console.log("in bookshelfReducer - data = ", {state, action})
  switch (action.type) {
    case SHELF_TYPES.SET_BOOKSHELF:
      return action.payload;

    default:
      console.log("dispatch - else");
      return state;
  }
};

export default bookshelfReducer;
