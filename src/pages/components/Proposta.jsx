import { faCheck, faFilePdf, faMessage, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Alert, Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import MessageModal from "./MessageModal";
import ModalReject from "./ModalReject";
import ModalValidate from "./ModalValidate";

export default function Proposta({
    titulo,
    descricao,
    orientadorIPB,
    coOrientadorIPB,
    coOrientadorEXT,
    coOrientadorEXTInst,
    estadoEtapa,
    nomeEstado,
    estadoDescricao,
    mensagemEnviadaPor,
    mensagemTexto,
    propostaLink,
    numAluno = null,
    nomeAluno = null,
    validate = false,
    propostaId = null,
}) {
    const getEtapaColor = (estado) => {
        switch (estado) {
            case 0:
                return "danger";
            //break;
            case 1:
                return "warning";
            //break;
            case 2:
                return "primary";
            //break;
            case 3:
                return "primary";
            //break;
            case 4:
                return "success";
            //break;
            default:
                break;
        }
    };

    const getEstadoPercentage = (estado) => {
        switch (estado) {
            case 0:
                return 50;
            //break;
            case 1:
                return 25;
            //break;
            case 2:
                return 50;
            //break;
            case 3:
                return 75;
            //break;
            case 4:
                return 100;
            //break;
            default:
                break;
        }
    };

    //{message modal}
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [showRejectModal, setShowRejectModal] = useState(false);
    const handleCloseRejectModal = () => setShowRejectModal(false);
    const handleShowRejectModal = () => setShowRejectModal(true);

    const [showValidateModal, setShowValidateModal] = useState(false);
    const handleCloseValidateModal = () => setShowValidateModal(false);
    const handleShowValidateModal = () => setShowValidateModal(true);

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <div className="sub-cont bg-color-ipb-sec px-3 py-2 rounded-top">
                            <p className="fs-5">
                                {nomeAluno ? (
                                    <b className="">
                                        Proposta do aluno:{" "}
                                        <span className="color-ipb text-decoration-underline">
                                            {nomeAluno} [{numAluno}]
                                        </span>{" "}
                                    </b>
                                ) : (
                                    <b>Proposta Submetida</b>
                                )}
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container className="bg-color-white rounded-bottom border">
                            <Row className="justify-content-between">
                                <Col className="mx-4 mt-4">
                                    <span className="color-ipb fw-bold">Titulo:</span>
                                    &nbsp;
                                    <span>
                                        {/* Dissertação sobre bases de dados relacionais */}
                                        {titulo}
                                    </span>
                                </Col>
                                <Col className="mx-4 mt-4">
                                    <a className="link" target="blank" href={`http://localhost:8080/${propostaLink}`}>
                                        <Container align="end" className="color-ipb fw-bold ">
                                            Ver proposta &nbsp;
                                            <FontAwesomeIcon icon={faFilePdf} />
                                        </Container>
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mx-4 mt-3">
                                    <p>
                                        <span className="color-ipb fw-bold ">Descrição:</span>
                                        &nbsp;
                                        <span>
                                            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque ac tortor consectetur, fermentum purus ac,
                      feugiat urna. In auctor facilisis leo eu iaculis.
                      Pellentesque vel gravida urna, vitae laoreet ante. Nunc ac
                      sem luctus, scelerisque enim id, ornare lacus. Maecenas
                      tincidunt lectus velit, quis tristique erat viverra vitae.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque ac tortor consectetur, fermentum purus ac,
                      feugiat urna. In auctor facilisis leo eu iaculis.
                      Pellentesque vel gravida urna, vitae laoreet ante. */}
                                            {descricao}
                                        </span>
                                    </p>
                                </Col>
                            </Row>
                            <hr className="mx-4" />
                            <Row>
                                <Col className="mx-4">
                                    <p>
                                        <span className="color-ipb fw-bold">Orientador do IPB:</span>
                                        &nbsp;
                                        {/* <span>Joaquim de Almeida</span> */}
                                        <span>{orientadorIPB}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mx-4">
                                    <p>
                                        <span className="color-ipb fw-bold">Co-orientador do IPB:</span>
                                        &nbsp;
                                        {/* <span>Carlos Sousa</span> */}
                                        <span>{coOrientadorIPB}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row className="justify-content-between">
                                <Col className="mx-4">
                                    <p>
                                        <span className="color-ipb fw-bold">Co-orientador do Ext:</span>
                                        &nbsp;
                                        {/* <span>José Coelho</span> */}
                                        <span>{coOrientadorEXT}</span>
                                    </p>
                                </Col>
                                <Col className="mx-4">
                                    <p>
                                        <span className="color-ipb fw-bold">Instituição:</span>
                                        &nbsp;
                                        {/* <span>Universidade Nova de Lisboa</span> */}
                                        <span>{coOrientadorEXTInst}</span>
                                    </p>
                                </Col>
                            </Row>
                            {/* <Row className="justify-content-between">
                <Col className="mx-4">
                  <p>
                    <span className="color-ipb fw-bold">
                      Co-orientador do Ext 2:
                    </span>
                    &nbsp;
                    <span>Frederico Batista</span>
                  </p>
                </Col>
                <Col className="mx-4">
                  <p>
                    <span className="color-ipb fw-bold">Instituição:</span>
                    &nbsp;
                    <span>Universidade Antiga de Coimbra</span>
                  </p>
                </Col>
              </Row> */}
                            {!validate ? (
                                <>
                                    <Row>
                                        <Col className="m-3 mx-4">
                                            <span className="color-ipb fw-bold">Estado da proposta:</span>
                                            <ProgressBar striped variant={getEtapaColor(estadoEtapa)} now={getEstadoPercentage(estadoEtapa)} />
                                            {/* <div className="progress-bar-striped progress-bar-animated bg-warning w-50"></div> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mx-4">
                                            <Alert variant={getEtapaColor(estadoEtapa)}>
                                                {/* <Alert.Heading>Submetida!</Alert.Heading> */}
                                                <Alert.Heading>
                                                    {" "}
                                                    <b>{nomeEstado}!</b>{" "}
                                                </Alert.Heading>
                                                {/* <p>
                      A sua proposta foi submetida com sucesso e neste momento
                      aguarda reposta por parte da secretaria.
                    </p> */}
                                                <p>{estadoDescricao}</p>
                                                <hr />
                                                {estadoEtapa == 0 ? (
                                                    <>
                                                        <p>Se deseja saber o motivo da rejeição da sua proposta abra a mensagem deixada pela secretaria.</p>
                                                        <p className="link text-center c-pointer">
                                                            <a className="link text-danger" onClick={handleShow}>
                                                                Abrir Mensagem <FontAwesomeIcon icon={faMessage} />
                                                            </a>
                                                        </p>
                                                        <MessageModal
                                                            handleShow={handleShow}
                                                            handleClose={handleClose}
                                                            show={show}
                                                            mensagemEnviadaPor={mensagemEnviadaPor}
                                                            mensagemTexto={mensagemTexto}
                                                        />
                                                    </>
                                                ) : (
                                                    <p className="mb-0">Assim que for validada seguirá para a proxima etapa.</p>
                                                )}
                                            </Alert>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <Row>
                                    <ModalValidate show={showValidateModal} propostaId={propostaId} handleClose={handleCloseValidateModal} />
                                    <ModalReject show={showRejectModal} propostaId={propostaId} handleClose={handleCloseRejectModal} />
                                    <Col className="mx-4">
                                        <Alert variant={getEtapaColor(estadoEtapa)}>
                                            {/* <Alert.Heading>Submetida!</Alert.Heading> */}
                                            <Alert.Heading>
                                                {" "}
                                                <b>Validação da proposta do aluno: [{numAluno}].</b>{" "}
                                            </Alert.Heading>
                                            {/* <p>
                      A sua proposta foi submetida com sucesso e neste momento
                      aguarda reposta por parte da secretaria.
                    </p> */}
                                            <p>{estadoDescricao}</p>

                                            <p className="mb-0">Se tudo estiver correto valide a proposta.</p>
                                            <hr />
                                            <Row className="mt-5 justify-content-between">
                                                <Col md={"auto"}>
                                                    <p>Se rejeitar é obrigatorio apresentar uma jusitificação a explicar o efeito.</p>
                                                </Col>
                                                <Col md={"auto"}>
                                                    <Button onClick={handleShowValidateModal} className="mx-2" variant="success">
                                                        Aprovar <FontAwesomeIcon icon={faCheck} />
                                                    </Button>
                                                    <Button onClick={handleShowRejectModal} className="mx-2" variant="danger">
                                                        Rejeitar <FontAwesomeIcon icon={faX} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Alert>
                                    </Col>
                                </Row>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
