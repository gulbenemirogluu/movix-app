import { Spin, Typography, Col, Row } from "antd";
import React, { useEffect, useState, useRef } from "react";
import GridCard from "../../commons/GridCards";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../Config";

export const SelectedCategory = () => {
  const path = window.location.pathname;
  const type = path.substring(1, path.lastIndexOf("/")) === 'movies' ? 'movie' : 'tv';
  const category = path.substring(path.lastIndexOf("/") + 1);
  const buttonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [Movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState({
    movie: undefined,
    tv: undefined,
  });

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      // loadMoreItems()
      if(buttonRef.current)
      buttonRef.current.click();
    }
  };

  const fetchMovies = () => {
    setLoading(true);
    const endpoint = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setCategories((prev) => ({ ...prev, movie: result.genres }));
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const fetchTvSeries = () => {
    setLoading(true);
    const endpoint = `${API_URL}/genre/tv/list?api_key=${API_KEY}`;
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setCategories((prev) => ({ ...prev, tv: result.genres }));
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const fetchByType = () => {
    setLoading(true);
    if (categories[type]) {
      const categoryId = categories[type].filter(
        (cat) => cat.name.toLowerCase() === decodeURI(category)
      )[0].id;
      const endpoint = `${API_URL}discover/${type}?api_key=${API_KEY}&with_genres=${categoryId}&page=${page}`;
      fetch(endpoint)
        .then((result) => result.json())
        .then((result) => {
          console.log(result);
          setMovies([...Movies, ...result.results]);
        }, setLoading(false))
        .catch((error) => console.error("Error:", error));
    }
  };

  const renderRows = () => {
    let finalArr = [],
      columns = [];
    Movies.forEach((movie, index) => {
      // prepare the array
      columns.push(
        <React.Fragment key={index}>
          <Col span={5}>
            <GridCard
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                  : null
              }
              movieId={movie.id}
              movieName={movie.original_title}
              movieDescription={movie.overview}
              type={type}
            />
          </Col>
        </React.Fragment>
      );

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
    return finalArr;
  };

  useEffect(() => {
    if (type === "movie") {
      fetchMovies();
    }
    if (type === "tv") {
      fetchTvSeries();
    }
  }, []);

  useEffect(() => {
    fetchByType();
  }, [categories[type], page]);

  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  if (loading && Movies.length < 0) {
    return <Spin />;
  }

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {renderRows()}
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            ref={buttonRef}
            className="loadMore"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
