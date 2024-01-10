import { faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Col, Container, Row,Spinner } from "react-bootstrap";

export default function ErrorAlert({ errorName }) {
  return (
    <>
      {errorName ? (
        <Container className="mt-5 p-5">
          <Row className="justify-content-center text-center">
            <Col md={"auto"}>
              <Alert variant={"danger"}>
                <div className="fs-2">
                  <FontAwesomeIcon icon={faBug} /> Erro
                  <hr />
                </div>
                <p className="fs-3">{errorName}</p>
              </Alert>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="p-5">
          <Row className="justify-content-center text-center">
            <Col md={"auto"}>
              <Spinner style={{ marginTop: "2px", height: "150px", width: "150px" }}></Spinner>
              <div className="fs-3 fw-bold">Loading...</div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
