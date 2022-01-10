import React, { useState, useEffect } from "react";
import { Card, Avatar, Col, Typography, Row, Button } from "antd";
import { IMAGE_BASE_URL } from "../Config";

function GridCards(props) {
  let {
    actor,
    key,
    image,
    movieId,
    movieName,
    characterName,
    movieDescription,
    category,
    name,
    onClick,
    type
  } = props;
  const POSTER_SIZE = "w780";

  const getDescription = (desc) => {
    if(desc){
      return desc.length > 80 ? (
        <>
          {" "}
          {desc.substring(0, 80)}
          <span>...</span>
        </>
      ) : (
        desc
      );
    }    
  };
  if (category) {
    return (
      <Card
        hoverable
        style={{ width: 250 }}
        cover={
          <img
            alt={name}
            src={require(`../../assets/images/mainLogo.jpg`)}
          />
        }
        onClick={onClick}
      >
        <Card.Meta title={name} />
      </Card>
    );
  }

  if (actor) {
    return (
      <Card
        hoverable
        style={{ width: 200 }}
        cover={
          <img
            alt={movieName}
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
          />
        }
        onClick={() => (window.location.href = `/${type}/${movieId}`)}
        href={`/movie/${movieId}`}
      >
        <Card.Meta title={characterName} />
      </Card>
    );
  } else {
    return (
      <Card
        hoverable
        style={{ width: 300 }}
        cover={<img alt={movieName} src={image} />}
        onClick={() => (window.location.href = `/${type}/${movieId}`)}
        href={`/movie/${movieId}`}
      >
        <Card.Meta
          title={movieName}
          description={getDescription(movieDescription)}
        />
      </Card>
    );
  }
}

export default GridCards;
