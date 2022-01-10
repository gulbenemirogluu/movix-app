import { Spin, Typography, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import GridCard from "../../commons/GridCards";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../Config";

export const Movies = () => {
  const [MovieCategory, setMovieCategory] = useState({
    selected: undefined,
    all: undefined,
  });
  const [loading, setLoading] = useState(false);

  const fetchMovies = () => {
    setLoading(true);
    const endpoint = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovieCategory((prev) => ({ ...prev, all: result.genres }));
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const renderRows = () => {
    if (MovieCategory.all) {
      let finalArr = [],
        columns = [];

      MovieCategory.all.forEach((category, index) => {
        // prepare the array
        columns.push(
          <React.Fragment key={index}>
            <Col span={5}>
              <GridCard
                category
                image={``}
                name={category.name}
                onClick={() =>
                  (window.location.href = `/movies/${category.name.toLowerCase()}`)
                }
                type={'movie'}
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
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading && !MovieCategory.all) {
    return <Spin />;
  }

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Typography.Title level={2}> Categories </Typography.Title>
      </div>
      {renderRows()}
      <br />
    </div>
  );
};
