import axios from "axios";

const BASE_URL = "http://localhost:4000/api"; // dev
// const BASE_URL = ""; // production
const authURL = `${BASE_URL}/auth`;
const userURL = `${BASE_URL}/user`;
const socialURL = `${BASE_URL}/social`;

// auth
const signUp = async (email = "", password = "", handle = "") =>
  axios.post(`${authURL}/signup`, { email, password, handle });
const login = async (email = "", password = "") =>
  axios.post(`${authURL}/login`, { email, password });
const updatePassword = async (
  email = "",
  password = "",
  newPassword = "",
  token = ""
) =>
  axios.patch(
    `${authURL}/update-password`,
    { email, password, newPassword },
    { headers: { Authorization: `bearer ${token}` } }
  );
const updateEmail = async (
  email = "",
  password = "",
  newEmail = "",
  token = ""
) => {
  return axios.patch(
    `${authURL}/update-email`,
    { email, password, newEmail },
    { headers: { Authorization: `bearer ${token}` } }
  );
};
const deleteAccount = async (email) =>
  axios.delete(`${authURL}/delete`, { email });

// user
const createNewUser = async (email = "", id = "", handle = "") =>
  axios.post(userURL, { email, id, handle });
const getUserDetails = async (query) =>
  axios.get(userURL, { params: { ...query } });
const updateUserDetails = async (updates, token) =>
  axios.patch(userURL, {
    headers: { Authorization: `bearer ${token}` },
    data: updates,
  });

// social
const sendFriendRequest = async (userID = "", friendID = "") =>
  axios.patch(`${socialURL}/send-friend-request`, { userID, friendID });
const acceptFriendRequest = async (userID = "", friendID = "") =>
  axios.patch(`${socialURL}/accept-friend-request`, { userID, friendID });
const removeFriend = async (userID = "", friendID = "", token = "") =>
  axios.patch(`${socialURL}/remove-friend`, { userID, friendID });
// axios.patch(`${socialURL}/remove-friend`, { headers: { Authorization: `bearer ${token}` }, data: {userID, friendID}, });
const findFriend = async (query = "") =>
  axios.get(`${socialURL}/search`, { params: { body: query } });

// temp?  userDetails has a friends list attached to obejct.  Maybe use this as a refresh?
const getFriendsList = async (userID = "") =>
  axios.get(`${socialURL}/friends-list`, { params: { userID } });

export {
  signUp,
  login,
  updatePassword,
  updateEmail,
  getUserDetails,
  deleteAccount,
  createNewUser,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
  updateUserDetails,
  findFriend,
  getFriendsList,
};
