import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import IpbNavbar from "./components/IpbNavbar";
import Table from "react-bootstrap/Table";
import UsersTable from "./components/UsersTable";
import { useEffect, useState } from "react";
import api from "../api/axios-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faGears,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import AddUserModal from "./components/AddUserModal";
import MessageToast from "./components/MessageToast";
import DeleteUserModal from "./components/DeleteUserModal";

export default function Administracaopage() {
  const [searchFor, setSearchFor] = useState("");

  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleCloseAddUserModal = () => setShowAddUserModal(false);
  const handleShowAddUserModal = () => setShowAddUserModal(true);

  const [messageToastParams, setMessageToastParams] = useState({});

  const [showMessageToast, setShowMessageToast] = useState(false);

  const handleShowMessageToast = () => {
    setShowMessageToast(true);
  };
  const [getData, setGetData] = useState();

  return (
    <>
      <div className="bg-image">
        <MessageToast
          setShow={setShowMessageToast}
          show={showMessageToast}
          color={messageToastParams.color}
        >
          <span className="text-white">{messageToastParams.text}</span>
        </MessageToast>
        <AddUserModal
          show={showAddUserModal}
          handleClose={handleCloseAddUserModal}
          handleShowMessageToast={handleShowMessageToast}
          setMessageToastParams={setMessageToastParams}
          setGetData={setGetData}
        />
        <IpbNavbar></IpbNavbar>
        <Container className="mt-4">
          <Row>
            <Col>
              <Alert variant={"info"}>
                <FontAwesomeIcon icon={faCircleInfo} />
                &nbsp; Se precisar de editar orientadores, instituições ou outra
                opção que não esteja nesta página verifique as{" "}
                <Alert.Link target={"_blank"} href="http://localhost:8080">
                  opções avançadas <FontAwesomeIcon icon={faGears} />
                </Alert.Link>
              </Alert>
            </Col>
          </Row>
        </Container>
        <Container className="mt-2">
          <Row className="justify-content-between">
            <Col md={"auto "} className="mb-2">
              <Button className="btn-ipb" onClick={handleShowAddUserModal}>
                Adicionar utilizador <FontAwesomeIcon icon={faUserPlus} />
              </Button>
            </Col>
            <Col md={"auto"}>
              <Form.Control
                className="mb-2"
                placeholder="Pesquisar..."
                onChange={(e) => setSearchFor(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <UsersTable
                searchFor={searchFor}
                setGetData={setGetData}
                getData={getData}
                setMessageToastParams={setMessageToastParams}
                handleShowMessageToast={handleShowMessageToast}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
