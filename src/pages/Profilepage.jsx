import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faUser,
  faCakeCandles,
  faLocationDot,
  faPhone,
  faAt,
  faBook,
  faCircleUser,
  faAddressCard,
  faImage,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  ModalTitle,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import api from "../api/axios-config";
import IpbNavbar from "./components/IpbNavbar";
import { useForm } from "react-hook-form";
import ModalUploadFile from "./components/ModalUploadFile";

export default function Profilepage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModalUpload, setShowModalUpload] = useState(false);

  const handleCloseModalUpload = () => setShowModalUpload(false);
  const handleShowModalUpload = () => setShowModalUpload(true);

  const [data, setData] = useState();
  const [email, setEmail] = useState();
  const [morada, setMorada] = useState();
  const [contato, setContato] = useState();
  const [sobre, setSobre] = useState();
  const [imageChanged, setImageChanged] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      morada: null,
      email: null,
      contacto: null,
      sobre: null,
    },
  });

  useEffect(() => {
    api.get("/dados-user/profile?expand=curso").then((response) => {
      setData(response?.data);
      setImageChanged(false);
      console.log(response);
    });
  }, [imageChanged]);

  const onSubmit = (data) => {
    handleClose();
    console.log(data);
    api
      .put("/dados-user/profile", {
        email: !data.email ? email : data.email,
        morada: !data.morada ? morada : data.morada,
        contato: !data.contacto ? contato : data.contacto,
        sobre: !data.sobre ? sobre : data.sobre,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangedImage = () => {
    setImageChanged(true);
  };

  return (
    <>
        <ModalUploadFile
          show={showModalUpload}
          handleClose={handleCloseModalUpload}
          text={"Carregar imagem"}
          handleChangedFile={handleChangedImage}
          backendUrl={"/dados-user/upload-profile-img"}
        />
        <IpbNavbar> </IpbNavbar>
        <Container className="profile-box p-1 mt-5">
          <Container className="fade-in-1 mt-5">
            <Row className="justify-content-evenly p-3">
              <Col md={5} align="center">
                {data?.img_perfil ? (
                  <img
                    className="user-image"
                    src={`http://localhost:8080/${data?.img_perfil}`}
                    alt="user img"
                  />
                ) : (
                  <FontAwesomeIcon
                    className="user-image color-light-grey mt-2"
                    icon={faCircleUser}
                  />
                )}
                <div>
                  <Button
                    className="btn-ipb mt-3"
                    onClick={handleShowModalUpload}
                  >
                    Carregar imagem de perfil &nbsp;
                    <FontAwesomeIcon icon={faImage} />
                  </Button>
                </div>
              </Col>
              <Col md={5} className="text-secondary">
                <div className="user-image-cont">
                  <hr />
                  <ul className="my-4 fs-5 ">
                    <li>
                      <FontAwesomeIcon icon={faUser} className="color-ipb" />
                      &nbsp;&nbsp;&nbsp;{data?.nome}
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faCakeCandles}
                        className="color-ipb"
                      />
                      &nbsp;&nbsp;&nbsp;{data?.data_nasc}
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="color-ipb"
                      />
                      &nbsp;&nbsp;&nbsp;{data?.morada}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faPhone} className="color-ipb" />
                      &nbsp;&nbsp;&nbsp;{data?.contato}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faAt} className="color-ipb" />
                      &nbsp;&nbsp;&nbsp;{data?.email}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faBook} className="color-ipb" />
                      &nbsp;&nbsp;&nbsp;{data?.curso?.nome}
                    </li>
                  </ul>
                  <hr />
                </div>
              </Col>
            </Row>
          </Container>
          <Container className=" mt-2">
            <Row
              className="align-items-center justify-content-between p-3"
              xs={"auto"}
            >
              <Col md={"auto"}>
                <Row className="about-me">
                  <p className="color-ipb fs-5 fw-bold">Sobre mim:</p>
                </Row>
              </Col>

              <Col md={"auto"} className="mb-3">
                {/* <Button
                className="me-2"
                variant="danger"
                onClick={handleRemoveSobreMim}
              >
                Remover sobre mim&nbsp;&nbsp;
                <FontAwesomeIcon icon={faTrash} />
              </Button> */}
                <Button
                  className="btn-ipb"
                  data-bs-toggle="modal"
                  data-bs-target="#editarDados"
                  onClick={handleShow}
                >
                  Editar Dados&nbsp;&nbsp;
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={"auto"} className="px-4">
                {data?.sobre ? (
                  <p>{data.sobre}</p>
                ) : (
                  <p>
                    Aenean arcu leo, dictum nec erat id, aliquet suscipit lorem.
                    Morbi iaculis erat consequat pharetra placerat. In sed metus
                    dolor. Mauris in nisl nec turpis hendrerit facilisis
                    tincidunt ut orci. className aptent taciti sociosqu ad
                    litora torquent per conubia nostra, per inceptos himenaeos.
                    Aliquam lobortis ipsum euismod augue ultricies malesuada.
                    Integer molestie ullamcorper tincidunt. Donec hendrerit,
                    eros vel pretium laoreet, ante ex maximus tellus, cursus
                    auctor diam felis eu felis. Etiam vitae scelerisque eros,
                    vitae dapibus ante. Curabitur porta non quam ac malesuada.
                    Cras nunc lacus, vulputate vitae mauris quis, congue pretium
                    dolor. Sed gravida convallis ligula, ut malesuada quam
                    interdum sed. In semper felis at diam placerat fermentum.
                    Aenean auctor laoreet cursus. Ut feugiat diam et ex aliquam
                    semper.
                  </p>
                )}
              </Col>
            </Row>
          </Container>
        </Container>

        {/* MODAL EDITAR DADOS | usar react-modal mas Bootstrap(css) não funciona corretamente :( */}
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header>
              <ModalTitle className="fw-bold">
                <FontAwesomeIcon icon={faUser} />
                &nbsp;&nbsp;Editar dados pessoais
              </ModalTitle>
              <Button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></Button>
            </Modal.Header>
            <Modal.Body>
              <div className="my-2">
                <InputGroup>
                  <Form.Control
                    type="text"
                    name=""
                    id=""
                    value={data?.nome}
                    disabled
                  />
                </InputGroup>
              </div>
              <div className="my-2">
                <InputGroup>
                  <Form.Control type="date" value={data?.data_nasc} disabled />
                </InputGroup>
              </div>
              <div className="my-2">
                <InputGroup>
                  <Form.Control
                    {...register("morada")}
                    type="text"
                    placeholder={data?.morada}
                    onChange={(e) => setMorada(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="my-2">
                <InputGroup>
                  <FormControl
                    {...register("contacto")}
                    type="number"
                    placeholder={data?.contato}
                    onChange={(e) => setContato(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="my-2">
                <InputGroup>
                  <FormControl
                    {...register("email")}
                    type="email"
                    placeholder={data?.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="my-2">
                <InputGroup>
                  <FormControl type="text" value={data?.curso?.nome} disabled />
                </InputGroup>
              </div>
              <div className="my-2">
                <Form.Control
                  placeholder={data?.sobre}
                  {...register("sobre")}
                  as="textarea"
                  rows={3}
                  onChange={(e) => setSobre(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                className="btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="btn-ipb"
                data-bs-dismiss="modal"
                id="guardarDados"
              >
                Guardar dados
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* FIM MODAL EDITAR DADOS */}
    </>
  );
}
