import React from "react";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navigation from "./components/Navigation";
import BookDetails from "./components/BookDetails";
import Bookshelf from "./components/Bookshelf";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

import { useBookshelfContext, useAuthContext } from "./hooks"; // temp

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/index.css";

const App = () => {
  const { bookshelfState } = useBookshelfContext(); // temp
  const { userState } = useAuthContext();

  return (
    <>
      <Navigation />
      <button onClick={() => console.log(bookshelfState)}>Log bookshelfState</button>
      <button onClick={() => console.log(userState)}>Log userState</button>
      <Container>
        <Routes>
          <Route path="/" element={<Bookshelf />} />
          <Route path="/details" element={<BookDetails />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
