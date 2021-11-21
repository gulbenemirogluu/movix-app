import React from "react";
import { Container } from "react-bootstrap";
import "./HomeStyle.css";

export function HomeScreen() {
  return (
    <Container
      className="home-title"
      style={{ height: "100vh", verticalAlign: "center", align: "center", fontSize: "64px"}}
    >
      WELCOME TO HOMEPAGE
    </Container>
  );
}
