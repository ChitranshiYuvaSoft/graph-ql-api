import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import LocationPage from "./Pages/LocationPage";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" Component={LoginPage}/>
        <Route path="/home" Component={HomePage}/>
        <Route path="/location" Component={LocationPage}/>
      </Routes>
    </Router>
    </>
  )
};

export default App;
