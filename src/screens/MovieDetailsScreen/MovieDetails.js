import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MovieAPIService } from "../../api/services/movie.service";
import { Col, Container, Image, Row } from "react-bootstrap";
import { SpinnerComponent } from "../../components/SpinnerComponent/Spinner";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { useHistory } from "react-router";

const IMAGE_API_PREFIX = process.env.REACT_APP_IMAGE_API_ADDRESS;
const IMDB_API_ADDRESS = process.env.REACT_APP_IMDB_ADDRESS;

export function MovieDetailsScreen() {
  const { id } = useParams();

  const history = useHistory();
  const [isBusy, setIsBusy] = useState();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    if (id) {
      setIsBusy(true);
      MovieAPIService.getById(id)
        .then((response) => {
          setMovieDetails(response);
          console.log(response);
        })
        .catch((err) => console.log({ err }))
        .finally(() => setIsBusy(false));
    }
  }, [id]);

  if (isBusy) {
    return <SpinnerComponent />;
  }

  return (
    <Container style={{ padding: "unset" }}>
      <Col style={{ marginTop: "auto" }}>
        <Row style={{ marginBottom: 30 }}>
          <Image
            style={{ width: "100%" }}
            src={
              movieDetails?.backdrop_path
                ? `${IMAGE_API_PREFIX}/original${movieDetails?.backdrop_path}`
                : ""
            }
          />
        </Row>
        <Row style={{ marginBottom: 120, justifyContent: "center" }}>
          <h1 style={{ borderBottom: "5px solid black" }}>
            {movieDetails?.title}
          </h1>
        </Row>
        <Row>
          <Col>
            <Row style={{ marginBottom: 25, justifyContent: "center" }}>
              <h1>Overview</h1>
            </Row>
            <Row style={{ marginBottom: 120, justifyContent: "center" , padding : '0 100px'}}>
              <h4> {movieDetails?.overview}</h4>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row style={{ marginBottom: 25, justifyContent: "center" }}>
              <h1>Info</h1>
            </Row>
            <Row>
              <Col>
                {movieDetails?.adult ? (
                  <Row style={{ marginBottom: 50, justifyContent: "center" }}>
                    <Image
                      height={300}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/ESRB_Adults_Only_18%2B.svg/1200px-ESRB_Adults_Only_18%2B.svg.png"
                    />
                  </Row>
                ) : null}
                <Row style={{ marginBottom: 120 }}>
                  <Col>
                    <Row style={{ marginBottom: 25, justifyContent: "center" }}>
                      <h3>Status</h3>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                      <h6>{movieDetails?.status}</h6>
                    </Row>
                  </Col>
                  <Col>
                    <Row style={{ marginBottom: 25, justifyContent: "center" }}>
                      <h3>Budget</h3>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                      <h6>{currencyFormatter(movieDetails?.budget)}</h6>
                    </Row>
                  </Col>
                  <Col>
                    <Row style={{ marginBottom: 25, justifyContent: "center" }}>
                      <h3>Playtime</h3>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                      <h6>{movieDetails?.runtime} minutes</h6>
                    </Row>
                  </Col>
                  <Col>
                    <Row style={{ marginBottom: 25, justifyContent: "center" }}>
                      <h3>Languages</h3>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                      {movieDetails.spoken_languages?.map((language) => (
                        <h6 style={{ margin: "0 5px" }}>
                          {language.english_name}
                        </h6>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row style={{ marginBottom: 25, justifyContent: "center" }}>
              <h1>Companies</h1>
            </Row>
            <Row style={{ marginBottom: 120, justifyContent: "center" }}>
              {movieDetails.production_companies?.map((companies) => {
                return companies.logo_path ? (
                  <Image
                    style={{ margin: "0 50px" }}
                    height={100}
                    src={`${IMAGE_API_PREFIX}/original${companies.logo_path}`}
                  />
                ) : null;
              })}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row style={{ marginBottom: 25, justifyContent: "center" }}>
              <h1>Get More Info</h1>
            </Row>
            <Row style={{ marginBottom: 120, justifyContent: "space-evenly" }}>
              <MovieCard
                image="https://artifacts.flyxit.com/content/poster/tt0190271"
                title="IMDB"
                style={{width: '400px'}}
                onDetailsClick={()=> window.location.href = `${IMDB_API_ADDRESS}/${movieDetails.imdb_id}`}
                description="Get more information from IMDB."
              />
              <MovieCard
                title="Official Homepage"
                style={{width: '400px'}}
                image="https://brushlovers.s3.amazonaws.com/images/vector/413342/preview/bl-Movie.jpg?v=5"
                onDetailsClick={()=> window.location.href = movieDetails.homepage}
                description="Get more information from official homepage."
              />
            </Row>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}
