import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../api/axios-config";
import { useNavigate } from "react-router";

export default function ModalReject({ show, handleClose, propostaId }) {
  const navigate = useNavigate();

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data = { ...data, ...{ proposta_id: propostaId } };

    api
      .post("/proposta/rejeitar-proposta", data)
      .then((res) => {
        console.log(res);
        navigate("/propostas");
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(data);
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Rejeitar Proposta</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-secondary">
              Tem a certeza que deseja rejeitar esta proposta?{" "}
            </p>
            <div className="mt-4 text-secondary">
              <p>Justificação pela mesma mestar a ser rejeitada:</p>
              <Form.Control
                className="mt-2"
                as="textarea"
                placeholder="Justificação"
                rows={4}
                {...register("texto_mensagem", {
                  required: true,
                })}
              />
              <div>
                {errors.texto_mensagem && (
                  <p className="text-danger">
                    <FontAwesomeIcon icon={faCircleExclamation} /> Campo
                    obrigatorio!
                  </p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"secondary"} onClick={handleClose}>
              Fechar
            </Button>
            <Button type={"submit"} variant={"danger"}>
              Rejeitar Proposta
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
