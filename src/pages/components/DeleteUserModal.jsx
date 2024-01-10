import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteUserModal({
  show,
  handleClose,
  handleRemoveUser,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <b>
            <small>Remover Utilizador</small>
          </b>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-secondary">
          Tem a certeza que deseja remover este utilizador?
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <b>Close</b>
        </Button>
        <Button variant="danger" onClick={handleRemoveUser}>
          <b>Remover utilizador</b>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
