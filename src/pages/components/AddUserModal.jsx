import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import api from "../../api/axios-config";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function AddUserModal({
  show,
  handleClose,
  handleShowMessageToast,
  setMessageToastParams,
  setGetData,
}) {
  const [cursosData, setCursosData] = useState();
  const [rolesData, setRolesData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    api
      .get("/admin/create-user-form")
      .then((res) => {
        console.log(res);
        setCursosData(res.data?.cursos);
        setRolesData(res.data?.roles);
        console.log(rolesData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (data) => {
    console.log(data);

    api
      .post("/admin/create-user-form", {
        role_id: data.role,
        nome: data.nome,
        num_mec: data.num_mec,
        email: data.email,
        morada: data.morada,
        data_nasc: data.dataNasc,
        contato: data.contato,
        curso_id: data.curso,
      })
      .then((res) => {
        console.log(res);
        setMessageToastParams({
          text: "Utilizador Inserido com sucesso!",
          color: "success",
        });
        handleShowMessageToast();
        setGetData(true);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setMessageToastParams({
          text: "Erro ao introduzir utilizador!",
          color: "danger",
        });
        handleShowMessageToast();
      });
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      show={show}
      onHide={handleClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <small>
              <b>Adicionar utilizador</b>
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Container className="my-3 border rounded px-3 py-2">
              <p className="text-secondary">Dados de registo</p>
              <Row className="mb-3">
                <Col md={5}>
                  <InputGroup>
                    <InputGroup.Text className="bg-color-ipb text-white">
                      Nº
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="a55555"
                      {...register("num_mec", {
                        required: "Campo obrigatorio",
                      })}
                    />
                  </InputGroup>
                  {errors.num_mec && (
                    <p className="text-danger" role="alert">
                      {<FontAwesomeIcon icon={faCircleExclamation} />}{" "}
                      {errors.num_mec?.message}
                    </p>
                  )}
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroup.Text className="bg-color-ipb text-white">
                      Email
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="a55555@ipb.pt"
                      {...register("email", {
                        required: "Campo obrigatorio",
                      })}
                    />
                  </InputGroup>
                  {errors.email && (
                    <p className="text-danger" role="alert">
                      {<FontAwesomeIcon icon={faCircleExclamation} />}{" "}
                      {errors.email?.message}
                    </p>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <InputGroup>
                    <InputGroup.Text className="bg-color-ipb text-white">
                      Curso
                    </InputGroup.Text>
                    <Form.Select
                      {...register("curso", {
                        required: "Opção inválida",
                      })}
                    >
                      <option value={""}>Escolha um curso...</option>
                      {cursosData?.map((curso) => (
                        <option key={curso.curso_id} value={curso.curso_id}>
                          {curso.curso_nome}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  {errors.curso && (
                    <p className="text-danger" role="alert">
                      {<FontAwesomeIcon icon={faCircleExclamation} />}{" "}
                      {errors.curso?.message}
                    </p>
                  )}
                </Col>
              </Row>
            </Container>
            <Container className="border rounded px-3 py-2">
              <p className="text-secondary">Dados pessoais</p>
              <Row className="mb-3">
                <Col>
                  <InputGroup>
                    <InputGroup.Text className="bg-color-ipb text-white">
                      Nome Completo
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Joao Pedro Silva"
                      {...register("nome", {
                        required: "Campo obrigatorio",
                      })}
                    />
                  </InputGroup>
                  {errors.nome && (
                    <p className="text-danger" role="alert">
                      {<FontAwesomeIcon icon={faCircleExclamation} />}{" "}
                      {errors.nome?.message}
                    </p>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={5}>
                  <InputGroup>
                    <InputGroup.Text className="bg-color-ipb text-white">
                      Data de Nasc.
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      {...register("dataNasc", {
                        required: "Data inválida",
                      })}
                    />
                  </InputGroup>
                  {errors.dataNasc && (
                    <p className="text-danger" role="alert">
                      {<FontAwesomeIcon icon={faCircleExclamation} />}{" "}
                      {errors.dataNasc?.message}
                    </p>
                  )}
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroup.Text className="bg-color-ipb text-white">
                      Contato
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="969696969"
                      {...register("contato", {
                        required: "Contato inválido",
                      })}
                    />
                  </InputGroup>
                  {errors.contato && (
                    <p className="text-danger" role="alert">
                      {<FontAwesomeIcon icon={faCircleExclamation} />}{" "}
                      {errors.contato?.message}
                    </p>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    as="textarea"
                    placeholder="Morada..."
                    rows={3}
                    {...register("morada", {
                      required: "Morada inválida",
                    })}
                  />
                  {errors.morada && (
                    <p className="text-danger" role="alert">
                      {<FontAwesomeIcon icon={faCircleExclamation} />}{" "}
                      {errors.morada?.message}
                    </p>
                  )}
                </Col>
              </Row>
            </Container>
            <Container className="border rounded px-3 py-2 my-3">
              <p className="text-secondary">Dados de acesso</p>
              <Row>
                <Col>
                  <p className="color-ipb">Permissões:</p>
                  {rolesData?.map((role) => (
                    <Form.Check
                      key={role.role_id}
                      inline
                      label={role.role_name}
                      name="role"
                      type={"radio"}
                      value={role.role_id}
                      {...register("role", {
                        required: "Escolha uma opção",
                      })}
                    />
                  ))}
                  {errors.role && (
                    <p className="text-danger" role="alert">
                      {<FontAwesomeIcon icon={faCircleExclamation} />}{" "}
                      {errors.role?.message}
                    </p>
                  )}
                </Col>
              </Row>
            </Container>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button className="btn-ipb" type="submit">
            Adicionar utilizador
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
