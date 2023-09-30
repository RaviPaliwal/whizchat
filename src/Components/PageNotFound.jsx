import React from "react";
import { Container, Typography } from "@mui/material";
import IMG from "../Assets/Images/404.svg";

const PageNotFound = () => {
  return (
    <Container
      style={{ margin: "16px 8px 8px 16px", width: "90%" }}
      className="bg-light rounded-3 d-flex flex-column align-items-center justify-content-center"
    >
      <Container className="text-center">
        <img className="h-75 w-75" src={IMG} alt="svg" />
      </Container>
      <Container className="text-center mt-2">
        <Typography variant="h5" color="initial">
          Unauthorized Access
        </Typography>
      </Container>
    </Container>
  );
};

export default PageNotFound;
