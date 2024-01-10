import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function MessageModal({
  handleShow,
  handleClose,
  show,
  mensagemEnviadaPor,
  mensagemTexto,
}) {
  return (
    <>
      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>
            <p>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              <b>{mensagemEnviadaPor}</b>
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{mensagemTexto}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-color-ipb" onClick={handleClose}>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
