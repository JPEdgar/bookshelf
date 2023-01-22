import { useState } from "react";

import axios from "axios";

import { useAuthContext, useUserContext, useUserDetails } from "./";

import AUTH_TYPES from "../constants/authTypes";
import USER_TYPES from "../constants/userTypes";

import { signUp } from "../actions/auth";

const useSignup = () => {
  const { setUserDetails } = useUserDetails();
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: userDispatch } = useUserContext();

  const signup = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const createUserDetails = (data) => {
      const { email, id, token } = data;
      const newUserDetails = axios.post( "http://localhost:4000/api/user", { email, id }, { headers: { Authorization: `bearer ${token}` } } );
      return newUserDetails;
    };



    const createNewUserResponse = await signUp(email, password);
    if (createNewUserResponse.statusText !== "Created") {
      console.log("Problem creating new user: ", createNewUserResponse);
      setLoadingFlag(false);
      setError(createNewUserResponse.error);
      return;
    }

    const createNewUserDetailsResponse = await createUserDetails( createNewUserResponse.data );
    if (createNewUserDetailsResponse.statusText !== "Created") {
      console.log( "Problem creating new user details: ", createNewUserDetailsResponse );
      setLoadingFlag(false);
      setError(createNewUserDetailsResponse.error);
      return;
    }







    const createBookshelf = (data) => {
      console.log("creating new bookshelf for ", data)
      const { email, id, token } = data;
      const newBookshelf = axios.post( "http://localhost:4000/api/bookshelf", { email, id }, { headers: { Authorization: `bearer ${token}` } } );
      return newBookshelf;
    };



    const createNewBookshelfResponse = await createBookshelf( createNewUserResponse.data );
    console.log("createNewBookshelfResponse = ", createNewBookshelfResponse)
    if (createNewBookshelfResponse.statusText !== "Created") {
      console.log( "Problem creating new bookshelf: ", createNewBookshelfResponse );
      setLoadingFlag(false);
      setError(createNewBookshelfResponse.error);
      return;
    }











    // console.log("useSignup data = ", createNewUserResponse.data);
    localStorage.setItem( "digital-bookshelf-user", JSON.stringify(createNewUserResponse.data) );
    authDispatch({ type: AUTH_TYPES.SIGNUP, payload: createNewUserResponse.data, });
    setUserDetails(createNewUserDetailsResponse.data);
    setLoadingFlag(false);
  };

  return { signup, loadingFlag, error };
};

export default useSignup;
