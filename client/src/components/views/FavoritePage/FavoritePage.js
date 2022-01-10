import React, { useEffect, useState } from "react";
import { Typography, Popover, Button } from "antd";
import axios from "axios";
import "./favorite.css";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../Config";

const { Title } = Typography;

function FavoritePage() {
  const user = useSelector((state) => state.user);

  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);
  let variable = { userFrom: localStorage.getItem("userId") };
  console.log(Favorites);
  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios.post("/api/favorite/getFavoredMovie", variable).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
        setLoading(false);
      } else {
        alert("Failed to get subscription videos");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    axios
      .post("/api/favorite/removeFromFavorite", variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("Failed to Remove From Favorite");
        }
      });
  };

  const renderCardsMovie = Favorites.map((favorite, index) => {
    if (favorite.type !== "movie") {
      return <></>;
    }
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>

        <td>{favorite.movieRunTime} mins</td>
        <td>
          <Button
            type="danger"
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </Button>
        </td>
        <td>
          <Button
            type="primary"
            onClick={() =>
              (window.location.href = `/movie/${favorite.movieId}`)
            }
          >
            Details
          </Button>
        </td>
      </tr>
    );
  });

  const renderCardsSeries = Favorites.map((favorite, index) => {
    if (favorite.type !== "tv") {
      return <></>;
    }
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>

        <td>{favorite.movieRunTime} mins</td>
        <td>
          <Button
            type="danger"
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </Button>
        </td>
        <td>
          <Button
            type="primary"
            onClick={() =>
              (window.location.href = `/tv/${favorite.movieId}`)
            }
          >
            Details
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      {user.userData && !user.userData.isAuth ? (
        <div
          style={{
            width: "100%",
            fontSize: "2rem",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Please Log in first...</p>
          <a href="/login">Go to Login page</a>
        </div>
      ) : (
        <>
          <Title level={2}> Favorite Movies By Me </Title>
          <hr />
          {!Loading && (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Runtime</th>
                  <th>Remove from favorites</th>
                  <th>Go to details</th>
                </tr>
              </thead>
              <tbody>{renderCardsMovie}</tbody>
            </table>
          )}
          <Title level={2}> Favorite TV Series </Title>
          <hr />
          {!Loading && (
            <table>
              <thead>
                <tr>
                  <th>Title</th> 
                  <th>Runtime</th>
                  <th>Remove from favorites</th>
                  <th>Go to details</th>
                </tr>
              </thead>
              <tbody>{renderCardsSeries}</tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default FavoritePage;
