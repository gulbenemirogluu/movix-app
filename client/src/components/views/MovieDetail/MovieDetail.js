import React, { useEffect, useState } from "react";
import { Row, Col, Button, Spin } from "antd";
import axios from "axios";

import Comments from "./Sections/Comments";
import LikeDislikes from "./Sections/LikeDislikes";
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from "../../Config";
import GridCard from "../../commons/GridCards";
import MainImage from "../../views/LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";
function MovieDetailPage(props) {
  const pathname = window.location.pathname
  const type = pathname.substring(1,pathname.lastIndexOf('/'))
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieVariable = {
    movieId: movieId,
    type: type
  };

  useEffect(() => {
    let endpointForMovieInfo = `${API_URL}${type}/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchDetailInfo(endpointForMovieInfo);

    axios.post("/api/comment/getComments", movieVariable).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to get comments Info");
      }
    });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  const fetchDetailInfo = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result);
        setLoadingForMovie(false);

        let endpointForCasts = `${API_URL}${type}/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            setCasts(result.cast);
          });

        setLoadingForCasts(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  const renderRows = () => {
    let finalArr = [],
      columns = [];
    const CastData = Casts.map((cast) => {
      if (cast.profile_path) {
        return cast;
      }
    }).filter((cast) => cast != null);
    CastData.forEach((cast, index) => {
      // prepare the array
      if (cast.profile_path) {
        columns.push(
          <React.Fragment key={index}>
            <Col span={5}>
              <GridCard
                actor
                image={cast.profile_path}
                characterName={cast.name}
              />
            </Col>
          </React.Fragment>
        );
      }

      // after three items add a new row
      if ((index + 1) % 3 === 0) {
        finalArr.push(
          <>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              {columns}
            </Row>
            <br />
          </>
        );
        columns = [];
      }
    });
    return LoadingForCasts ? <Spin /> : finalArr;
  };

  console.log(Movie)

  return (
    <div>
      {/* Header */}
      {!LoadingForMovie ? (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      ) : (
        <div>loading...</div>
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem("userId")}
            type={type}
          />
        </div>

        {/* Movie Info */}
        {!LoadingForMovie ? <MovieInfo movie={Movie} /> : <div>loading...</div>}

        <br />
        {/* Actors Grid*/}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button onClick={toggleActorView}>Toggle Actor View </Button>
        </div>

        {ActorToggle && renderRows()}
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <LikeDislikes
            video
            videoId={movieId}
            userId={localStorage.getItem("userId")}
            type={type}
          />
        </div>

        {/* Comments */}
        <Comments
          movieTitle={Movie.original_title}
          CommentLists={CommentLists}
          postId={movieId}
          type={type}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
}

export default MovieDetailPage;
