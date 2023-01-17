import { useState } from "react";

import axios from "axios";

import { useAuthContext } from "../hooks";
import AUTH_TYPES from "../constants/authTypes";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const createNewUserResponse = await createNewUser(email, password);
    if (createNewUserResponse.statusText !== "Created") {
      console.log("Problem creating new user: ", createNewUserResponse)
      setLoadingFlag(false);
      setError(createNewUserResponse.error);
      return;
    }

    const createNewUserDetailsResponse = await createUserDetails( createNewUserResponse.data );
    if (createNewUserDetailsResponse.statusText !== "Created") {
      console.log("Problem creating new user details: ", createNewUserDetailsResponse)
      setLoadingFlag(false);
      setError(createNewUserDetailsResponse.error);
      return;
    }

    const createNewBookshelfResponse = await createBookshelf( createNewUserResponse.data );
    if (createNewBookshelfResponse.statusText !== "Created") {
      console.log("Problem creating new bookshelf: ", createNewBookshelfResponse)
      setLoadingFlag(false);
      setError(createNewBookshelfResponse.error);
      return;
    }

    //     localStorage.setItem("user", JSON.stringify(data));
    //     authDispatch({ type: AUTH_TYPES.SIGNUP, payload: data });

    setLoadingFlag(false);
  };

  const createNewUser = (email, password) => {
    const newUser = axios.post("http://localhost:4000/api/auth/signup", {
      email,
      password,
    });
    return newUser;
  };

  const createUserDetails = (data) => {
    const { email, id, token } = data;
    const newUserDetails = axios.post(
      "http://localhost:4000/api/user",
      { email, id },
      { headers: { Authorization: `bearer ${token}` } }
    );
    return newUserDetails;
  };

  const createBookshelf = (data) => {
    const { id, token } = data;
    const newBookshelf = axios.post(
      "http://localhost:4000/api/bookshelf",
      { id },
      { headers: { Authorization: `bearer ${token}` } }
    );
    return newBookshelf
  };

  return { signup, loadingFlag, error };
};

export default useSignup;
