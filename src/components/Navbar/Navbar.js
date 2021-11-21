import React, { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Image,
  Navbar,
  Alert,
  Modal,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Avatar } from "../Avatar/Avatar";
//import { ModalComponent } from "../Modal/Modal";
import { useHistory } from "react-router";
import { GenreAPIService } from "../../api/services/genre.service";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/img/file.svg"

export const NavbarMenu = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const [modalShow, setModalShow] = useState(false);
  const [genreList, setGenreList] = useState();

  async function handleLogout() {
    try {
      await logout();
      history.push("/");
    } catch {
      return <Alert variant="danger">Failed to log out</Alert>;
    }
  }

  useEffect(() => {
    // fetch categories
    GenreAPIService.getGenres()
      .then((response) => setGenreList(response))
      .catch((err) => console.log({ err }));
  }, []);
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
        <Container fluid className="px-2">
          <Navbar.Brand onClick={()=>history.push("/")} style={{cursor: "pointer"}}>
            <Image
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            MOVIX
          </Navbar.Brand>
          <Nav style={{ marginInlineEnd: "auto" }}>
            <Nav.Link>Discover</Nav.Link>
            <NavDropdown
              title={"Categories"}              
            >
              {genreList?.genres?.map((genre) => (
                <NavDropdown.Item onClick={()=>history.push(`/movies/${genre.id}`)}>{genre.name}</NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          {!currentUser && <Button variant="primary" onClick={()=>history.push("/login")}>Login</Button>}
          {currentUser && (
            <Navbar.Collapse className="justify-content-end" style={{marginRight:'150px'}}>
              <Avatar username={currentUser.email} handleLogout={() => setModalShow(true)} />
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      {currentUser && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalShow}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Are you sure want to logout?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
