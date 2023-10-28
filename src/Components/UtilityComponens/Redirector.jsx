import React from "react";
import HomePage from "../HomePage"; // Import your HomePage component
import PageNotFound from "./PageNotFound"; // Import your PageNotFound component

function Redirector() {
 

  const loginStatus = sessionStorage.getItem("login_status") === "true";
  // Assuming login_status is stored as a string

  return loginStatus ? (
    <HomePage />
  ) : sessionStorage.getItem("login_status") === "false" ? (
    <PageNotFound />
  ) : (
    <PageNotFound />
  );
}

export default Redirector;
