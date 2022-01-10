import React, { useEffect, useState, useRef, useMemo } from "react";
import { Typography, Row, Button, Col } from "antd";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCard from "../../commons/GridCards";
const { Title } = Typography;
function LandingPage() {
  const buttonRef = useRef(null);

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [MainMovieIndex, setMainMovieIndex] = useState(0);

  const carouselMovies = useMemo(() => Movies.splice(0, 5), [Movies]);
  useEffect(() => {
    const intervalID = setTimeout(() => {
      if (MainMovieIndex < 5) {
        setMainMovieIndex((prev) => prev + 1);
      } else {
        setMainMovieIndex(0);
      }
    }, 6000);

    return () => clearInterval(intervalID);
  }, [MainMovieIndex]);

  useEffect(() => {
    setMainMovieImage(Movies[MainMovieIndex]);
  }, [MainMovieIndex, Movies]);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...Movies, ...result.results]);
        setMainMovieImage(MainMovieImage || result.results[0]);
        setCurrentPage(result.page);
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const loadMoreItems = () => {
    let endpoint = "";
    setLoading(true);
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

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

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ width: "83%",marginLeft:'125px' }}>
          <Title level={2} > Movies by latest </Title>
          <div style={{borderBottom:'2px solid black', width:'100%'}}/>
        </div>
        {renderRows()}
        {Loading && <div>Loading...</div>}

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
