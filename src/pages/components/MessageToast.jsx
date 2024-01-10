import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function MessageToast({ children, setShow, show, color }) {
  return (
    <ToastContainer className="p-2" position={"top-end"}>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        bg={color}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            <FontAwesomeIcon icon={faComment} /> Mensagem
          </strong>
          <small className="text-muted">IPB</small>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
