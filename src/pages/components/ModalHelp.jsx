import { Modal, Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCircleUser, faFile, faHouse, faEye } from "@fortawesome/free-solid-svg-icons";
export default function ModalHelp({ show, handleHide, handleHideClick }) {
    return (
        <>
            <Modal fullscreen aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleHide}>
                <Modal.Header>
                    <Container fluid className="color-ipb">
                        <Row className="justify-content-start">
                            <Col md={"auto"}>
                                <FontAwesomeIcon icon={faCircleInfo} size="2xl" />
                                <span className="fs-2 ms-3">Ajuda</span>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="align-items-center">
                            <Col className="color-ipb text-center ">
                                <FontAwesomeIcon icon={faCircleUser} className="fs-2" />
                            </Col>
                            <Col md={11} className="fw-semibold">
                                <ul>
                                    <p>
                                        <li>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit libero eget commodo pharetra.
                                            In hac habitasse platea dictumst. Nam hendrerit, magna vel euismod tempus, metus ipsum mollis augue, et
                                            accumsan nulla nibh eu risus. Nam dignissim lacinia nisl quis efficitur. Maecenas finibus purus non velit
                                            rhoncus ultrices. Praesent vehicula rutrum sagittis. Sed convallis fermentum turpis. In augue condimentum
                                            nec.
                                        </li>
                                    </p>
                                </ul>
                            </Col>
                            <hr />
                        </Row>
                        <Row className="align-items-center">
                            <Col className="color-ipb text-center">
                                <FontAwesomeIcon icon={faFile} className="fs-2" />
                            </Col>
                            <Col md={11} className="fw-semibold">
                                <ul>
                                    <p>
                                        <li>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit libero eget commodo pharetra.
                                            In hac habitasse platea dictumst. Nam hendrerit, magna vel euismod tempus, metus ipsum mollis augue, et
                                            accumsan nulla nibh eu risus. Nam dignissim lacinia nisl quis efficitur. Maecenas finibus purus non velit
                                            rhoncus ultrices. Praesent vehicula rutrum sagittis. Sed convallis fermentum turpis. In augue condimentum
                                            nec.
                                        </li>
                                    </p>
                                </ul>
                            </Col>
                            <hr />
                        </Row>
                        <Row className="align-items-center">
                            <Col className="color-ipb text-center">
                                <FontAwesomeIcon icon={faHouse} className="fs-2" />
                            </Col>
                            <Col md={11} className="fw-semibold">
                                <ul>
                                    <p>
                                        <li>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit libero eget commodo pharetra.
                                            In hac habitasse platea dictumst. Nam hendrerit, magna vel euismod tempus, metus ipsum mollis augue, et
                                            accumsan nulla nibh eu risus. Nam dignissim lacinia nisl quis efficitur. Maecenas finibus purus non velit
                                            rhoncus ultrices. Praesent vehicula rutrum sagittis. Sed convallis fermentum turpis. In augue condimentum
                                            nec.
                                        </li>
                                    </p>
                                </ul>
                            </Col>
                            <hr />
                        </Row>
                        <Row>
                            <Row className="align-items-center">
                                <Col className="color-ipb text-center">
                                    <FontAwesomeIcon icon={faEye} className="fs-2" />
                                </Col>
                                <Col md={11} className="fw-semibold">
                                    <ul>
                                        <p>
                                            <li>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit libero eget commodo
                                                pharetra. In hac habitasse platea dictumst. Nam hendrerit, magna vel euismod tempus, metus ipsum
                                                mollis augue, et accumsan nulla nibh eu risus. Nam dignissim lacinia nisl quis efficitur. Maecenas
                                                finibus purus non velit rhoncus ultrices. Praesent vehicula rutrum sagittis. Sed convallis fermentum
                                                turpis. In augue condimentum nec.
                                            </li>
                                        </p>
                                    </ul>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideClick}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
