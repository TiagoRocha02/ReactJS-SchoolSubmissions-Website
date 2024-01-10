import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faEye,
  faGears,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import LinkContainer from "./components/LinkContainer";
import { Row, Col, Alert, Container } from "react-bootstrap";
import ModalHelp from "./components/ModalHelp";
import IpbNavbar from "./components/IpbNavbar";
import { useAuthUser } from "react-auth-kit";
/* import { useNavigate } from "react-router-dom"; */

export default function Homepage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = useAuthUser();
  console.log(auth().role);

  return (
    <>
      <div className="bg-image">
        <IpbNavbar> </IpbNavbar>
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <Alert variant="primary" role="alert" className="mt-5">
                <Alert.Heading>Bem Vindo, {auth().username}!</Alert.Heading>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus consectetur ex eget lacus luctus, nec scelerisque
                  felis egestas. Nam ut enim arcu. Ut nec ex scelerisque, ornare
                  sapien ac, pharetra ipsum. Vivamus semper scelerisque nisi, eu
                  hendrerit lectus egestas id. Aenean lacinia odio quis orci
                  rutrum molestie.
                </p>
                <hr></hr>
                <p className="mb-0">
                  Se necessitar de ajuda carregue no botão abaixo ou no botão{" "}
                  <FontAwesomeIcon icon={faCircleQuestion} /> do menu.
                </p>
              </Alert>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {auth().role === "Admin" ? (
              <Col
                xs={12}
                sm={4}
                className="my-3"
                style={{ whiteSpace: "nowrap" }}
              >
                <LinkContainer
                  link="/administracao"
                  text="Gerir utilizadores"
                  icon={faUsers}
                />
              </Col>
            ) : (
              <Col
                xs={12}
                sm={4}
                className="my-3"
                style={{ whiteSpace: "nowrap" }}
              >
                <LinkContainer
                  link="/propostas"
                  text="Ver propostas"
                  icon={faEye}
                />
              </Col>
            )}
            {auth().role === "Admin" ? (
              <Col
                xs={12}
                sm={4}
                className="my-3"
                style={{ whiteSpace: "nowrap" }}
              >
                <LinkContainer
                  link="http://localhost:8080"
                  text={"Definições Av."}
                  icon={faGears}
                />
              </Col>
            ) : (
              <Col
                xs={12}
                sm={4}
                className="my-3"
                style={{ whiteSpace: "nowrap" }}
              >
                <LinkContainer
                  link="/profile"
                  text="Ver perfil"
                  icon={faUser}
                />
              </Col>
            )}
            <Col
              xs={12}
              sm={4}
              className="my-3"
              style={{ whiteSpace: "nowrap" }}
            >
              <LinkContainer
                handleClick={handleShow}
                text="Pedir ajuda"
                icon={faCircleQuestion}
              />
            </Col>
          </Row>
        </Container>
        <ModalHelp
          show={show}
          onHide={handleClose}
          handleHideClick={handleClose}
        />
      </div>
    </>
  );
}
