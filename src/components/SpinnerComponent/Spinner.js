import React from "react";
import { Container, Spinner } from "react-bootstrap";
import "./style.css";

export const SpinnerComponent = () => {
  return (
    <Container className={'spinnerContainer'}>
      <Spinner animation="border" variant="primary" className={"spinner"} />
    </Container>
  );
};
