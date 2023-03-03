import * as api from "../api";

const sendFriendRequest = async (userID, friendID) => {
  try {
    const data = await api.sendFriendRequest(userID, friendID);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const acceptFriendRequest = async (userID, friendID) => {
  try {
    const data = await api.acceptFriendRequest(userID, friendID);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const removeFriend = async (userID, friendID) => {
  try {
    const data = await api.removeFriend(userID, friendID);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { sendFriendRequest, acceptFriendRequest, removeFriend };
