import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import api from "../../api/axios-config";
import { useNavigate } from "react-router";

export default function ModalValidate({ show, handleClose, propostaId }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("proposta/aprovar-proposta", { proposta_id: propostaId })
      .then((res) => {
        console.log(res);
        navigate("/propostas");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Validar Proposta</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-secondary">
              Tem a certeza que deseja validar esta proposta?{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"secondary"} onClick={handleClose}>
              Fechar
            </Button>
            <Button type={"submit"} variant={"success"}>
              Aprovar Proposta
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
