import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

export const MovieCard = ({
  title,
  description,
  image,
  rating,
  onDetailsClick,
  style
}) => {
  return (
    <Card style={style ?? { width: "20rem", marginTop: "2rem" }}>
      <Card.Img variant="top" src={image} style={{ height: "500px" }} />
      <Card.Body>
        <Card.Title className={"title"}>{title}</Card.Title>
        <Card.Text className={"description"}>{description}</Card.Text>
        <div style={{ justifyContent: "space-evenly", alignItems: "flex-end" }}>
          {rating?.toString() && (
            <Button
              style={{
                backgroundColor: "gold",
                border: "none",
                color: "black",
                fontWeight: "bolder",
                marginRight: "10px",
              }}
              disabled
            >
              IMDB Score{" "}
              <Badge style={{ backgroundColor: "darkgoldenrod" }}>
                {rating?.toString()}
              </Badge>
            </Button>
          )}
          <Button variant="primary" onClick={onDetailsClick}>
            Go Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
