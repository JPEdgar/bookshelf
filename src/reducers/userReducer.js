import USER_TYPES from "../constants/types/userTypes";

import defaultUserDetails from "../constants/initializations/initializeUserDetails";

const userReducer = (state, action) => {
  console.log("action.payload = ", action.payload);
  switch (action.type) {
    case USER_TYPES.SET_USER:
      const returnObj = {
        userID: action.payload.userID,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        handle: action.payload.handle,
        avatar: action.payload.avatar,
        friendsList: action.payload.friendsList,
      };
      return returnObj;
    case USER_TYPES.LOGOUT:
      return defaultUserDetails();
    case USER_TYPES.UPDATE_EMAIL:
      return action.payload;
    case USER_TYPES.UPDATE_FRIENDS_LIST:
      const updatedFriendsList = state.friendsList.filter(
        (x) => x.friendUserID !== action.payload
      );
      return { ...state, friendsList: updatedFriendsList };
    case USER_TYPES.ADD_FRIEND:
      return { ...state, friendsList: action.payload };
    case USER_TYPES.ACCEPT_FRIEND_REQUEST:
      return { ...state, friendsList: action.payload };
    default:
      console.log("useUser dispatch - else");
      return state;
  }
};

export default userReducer;
