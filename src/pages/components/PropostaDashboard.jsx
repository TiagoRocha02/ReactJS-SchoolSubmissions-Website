import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function PropostaDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Container className="fade-in-1">
        <Row className="justify-content-end mb-3">
          <Col md="auto">
            <Button
              id="addProposta"
              className="btn-ipb mt-5"
              onClick={() => {
                navigate("/propostas/create");
              }}
            >
              Adicionar proposta&nbsp;&nbsp;
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="sub-cont bg-color-ipb-sec px-3 py-2 rounded-top">
              <p className="fs-5">
                <b>Proposta</b>
              </p>
            </div>
            <Container className="text-center bg-white rounded-bottom py-5 border">
              <h4 className="opacity-75">Proposta não submetida</h4>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
