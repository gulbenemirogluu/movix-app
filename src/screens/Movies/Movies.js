import React, { useCallback, useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { MovieAPIService } from "../../api/services/movie.service";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { arraySplit } from "../../utils/ArraySplitter";
import { SpinnerComponent } from "../../components/SpinnerComponent/Spinner";
import { PaginationComponent } from "../../components/PaginationComponent/Pagination";

const IMAGE_API_PREFIX = process.env.REACT_APP_IMAGE_API_ADDRESS;

export function MovieScreen() {
  const { id } = useParams();
  const history = useHistory();
  const [isBusy, setIsBusy] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [movieList, setMovieList] = useState();
  const splittedList = arraySplit(movieList, 5);

  const onPageChange = useCallback((e) => {
    setCurrentPage(e.target.value);
  }, []);

  useEffect(() => {
    if (id) {
      setIsBusy(true);
      MovieAPIService.getByGenre(id, currentPage?.toString())
        .then((response) => {
          setMovieList(response.results);
          setTotalPage(response.total_pages);
          setCurrentPage(response.page);
        })
        .catch((err) => console.log({ err }))
        .finally(() => setIsBusy(false));
    }
  }, [currentPage, id]);

  if (isBusy) {
    return <SpinnerComponent />;
  }

  return (
    <Container style={{ marginTop: "3rem" }}>
      <Col style={{ marginTop: "auto" , width: '100vw'}}>
        <Row>
          {splittedList?.map((movieGroup) => (
            <Col style={{ justifyContent: "space-around" }}>
              {movieGroup?.map((movie) => (
                <MovieCard
                style={{width:'300px', height: '750px', marginTop:'3rem', marginBottom:'1rem'}}
                  title={`${movie.title}`}
                  onDetailsClick={() => history.push(`/movie/${movie.id}`)}
                  image={IMAGE_API_PREFIX + `/w300${movie.poster_path}`}
                  rating={movie.vote_average}
                  description={movie.overview}
                />
              ))}
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent:'flex-end', marginTop:'50px', marginRight:'2%'}}>
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Row>
      </Col>
    </Container>
  );
}
