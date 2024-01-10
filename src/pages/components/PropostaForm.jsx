import { Col, Row, Container, InputGroup, FormControl, Button, ProgressBar, Alert, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faEnvelope, faCalendarDays, faFilePdf, faPlus, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import api from "../../api/axios-config";
import { useNavigate } from "react-router";
import ErrorAlert from "./ErrorAlert";
import ModalUploadFile from "./ModalUploadFile";

export default function PropostaForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [error, setError] = useState();

    const [dadosAluno, setDadosAluno] = useState();
    const [dadosCurso, setDadosCurso] = useState();
    const [dadosOrientadores, setDadosOrientadores] = useState();

    const [orientadorIpbEmail, setOrientadorIpbEmail] = useState();
    const [coOrientadorIpbEmail, setcoOrientadorIpbEmail] = useState();
    const [coOrientadorExtEmail, setcoOrientadorExtEmail] = useState();

    const [coOrientadorExtInst, setcoOrientadorExtInst] = useState();

    const [coOrientadorExtInstPais, setcoOrientadorExtInstPais] = useState();

    const [showUploadPropostaFileModal, setShowUploadPropostaFileModal] = useState();
    const handleCloseUploadPropostaFileModal = () => {
        setShowUploadPropostaFileModal(false);
    };

    const [propostaPath, setPropostaPath] = useState();

    const [propostaPathError, setPropostaPathError] = useState(false);

    useEffect(() => {
        api.get("/proposta/proposta-form")
            .then((res) => {
                console.log(res.data);
                if (Array.isArray(res.data)) {
                    setDadosAluno(res.data[0].dadosAluno);
                    setDadosCurso(res.data[1].dadosCurso);
                    setDadosOrientadores(res.data[2].dadosOrientadores);
                }
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    }, []);

    const handleOrientadorChange = (e) => {
        const orientadorID = e.target.value;
        const orientador = dadosOrientadores.find((orientador) => orientador.idOrientador == orientadorID);
        if (orientador) {
            return orientador.orientadorEmail;
        } else {
            return "";
        }
    };

    const handleOrientadorChange_getInst = (e) => {
        const orientadorID = e.target.value;
        const orientador = dadosOrientadores.find((orientador) => orientador.idOrientador == orientadorID);
        if (orientador) {
            return orientador.nomeInst;
        } else {
            return "";
        }
    };

    const handleOrientadorChange_getPaisInst = (e) => {
        const orientadorID = e.target.value;
        const orientador = dadosOrientadores.find((orientador) => orientador.idOrientador == orientadorID);
        if (orientador) {
            return orientador.paisInst;
        } else {
            return "";
        }
    };

    return (
        <>
            {error ? (
                <Container className="mt-3">
                    <Row className="justify-content-center">
                        <Col md={5}>
                            <Alert variant="danger">
                                <FontAwesomeIcon icon={faTriangleExclamation} /> {error?.response?.data?.message ? error?.response?.data?.message : error?.message}
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            ) : null}
            <form
                className="mb-5"
                onSubmit={handleSubmit((data) => {
                    data.keywords = data.keywords.split(",");

                    if (!propostaPath) {
                        setPropostaPathError(true);
                        return;
                    }

                    const payload = {
                        n_aluno: data.n_aluno,
                        titulo: data.titulo,
                        descricao: data.descricao,
                        objetivos: data.objetivos,
                        proposta_tema: data.proposta_tema,
                        recursos: data.recursos,
                        pre_requisitos: data.pre_requisitos,
                        metedologia: data.metedologia,
                        orientador_IPB_id: data.ori_IPB,
                        co_orientador_IPB_id: data.co_ori_IPB,
                        co_orientador_EXT_id: data.co_ori_EXT,
                        proposta_path: propostaPath,
                    };

                    api.post("/proposta/proposta-form", payload)
                        .then((res) => {
                            console.log(res);
                            navigate("/propostas");
                        })
                        .catch((err) => {
                            console.log(err);
                            setError(err);
                        });
                })}
            >
                <Container>
                    <Container className="fade-in-1 mt-4">
                        <Row className="justify-content-center">
                            <Col md="auto">
                                <p className="fs-4 color-ipb">
                                    <b>Formulário de submissão de propostas</b>
                                </p>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={3} className="col bg-color-ipb-sec rounded-start color-ipb text-wrap p-3">
                                <div className="icon text-center fs-2 color">
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                                <div className="color-black">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p>Quisque volutpat sit amet felis sit amet iaculis.</p>
                                    <p>Nulla ultricies a lacus sed imperdiet. Aenean ac ex malesuada, accumsan nunc a, facilisis nibh.</p>
                                    <p>
                                        Aliquam erat volutpat. Donec luctus dapibus arcu, in volutpat augue suscipit quis. Maecenas maximus, nunc vitae faucibus pellentesque, ipsum
                                        odio dignissim ipsum, et vulputate mi nibh ut enim. Vestibulum tempus purus eu orci gravida, sit amet cursus justo porta.
                                    </p>
                                </div>
                            </Col>

                            <Col className="rounded-end bg-color-grey">
                                <p className="color-ipb fs-5 fw-bold mt-5">Dados do Aluno</p>
                                {/* ################ dados do aluno #################### */}
                                {dadosAluno?.map((aluno, key) => (
                                    <Row key={key}>
                                        <Col sm>
                                            <InputGroup className="p-2">
                                                <InputGroup.Text className=" bg-color-ipb color-white">Nº</InputGroup.Text>
                                                <FormControl
                                                    type="text"
                                                    placeholder="a55555"
                                                    value={aluno.num_mec}
                                                    {...register("n_aluno", {
                                                        required: "Nº de aluno inválido",
                                                    })}
                                                    aria-invalid={errors.n_aluno ? "true" : "false"}
                                                />
                                            </InputGroup>
                                            {errors.n_aluno && (
                                                <p className="text-danger" role="alert">
                                                    {errors.n_aluno?.message}
                                                </p>
                                            )}
                                        </Col>

                                        <Col sm>
                                            <InputGroup className="p-2">
                                                <InputGroup.Text className="bg-color-ipb color-white">Nome</InputGroup.Text>
                                                <FormControl
                                                    type="text"
                                                    placeholder="José Franciso Sousa"
                                                    value={aluno.nome}
                                                    {...register("nome", {
                                                        required: "Nome não pode ficar vazio",
                                                    })}
                                                    aria-invalid={errors.nome ? "true" : "false"}
                                                />
                                            </InputGroup>
                                            {errors.nome && (
                                                <p className="text-danger" role="alert">
                                                    {errors.nome?.message}
                                                </p>
                                            )}
                                        </Col>

                                        <Col sm>
                                            <InputGroup className="p-2">
                                                <InputGroup.Text className="bg-color-ipb color-white">
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </InputGroup.Text>
                                                <FormControl
                                                    type="email"
                                                    placeholder="a55555@alunos.ipb.pt"
                                                    value={aluno.email}
                                                    {...register("email", {
                                                        required: "Email inválido",
                                                    })}
                                                    aria-invalid={errors.email ? "true" : "false"}
                                                />
                                            </InputGroup>
                                            {errors.email && (
                                                <p className="text-danger" role="alert">
                                                    {errors.email?.message}
                                                </p>
                                            )}
                                        </Col>
                                    </Row>
                                ))}
                                {/* ################ end dados do aluno #################### */}

                                <hr />
                                <p className="color-ipb fs-5 fw-bold mt-4">Dados da proposta</p>
                                <Row>
                                    <Col>
                                        <InputGroup>
                                            <InputGroup.Text className=" bg-color-ipb color-white">Curso de</InputGroup.Text>
                                            {/* <FormControl
                        type="text"
                        placeholder="..."
                        {...register("mestrado_em", {
                          required: "Campo obrigatório",
                        })}
                        aria-invalid={errors.mestrado_em ? "true" : "false"}
                      /> */}
                                            <Form.Select
                                                aria-label="Cursos"
                                                {...register("curso", {
                                                    required: "Campo obrigatório",
                                                })}
                                            >
                                                <option value="">...</option>
                                                {dadosCurso?.map((curso) => (
                                                    <option key={curso.id} value={curso.id}>
                                                        {curso.nome}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </InputGroup>
                                        {errors.curso && (
                                            <p className="text-danger" role="alert">
                                                {errors.curso?.message}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="mt-4">
                                    <Col>
                                        <p>
                                            Proposta de tema:&nbsp;
                                            {errors.proposta_tema && (
                                                <span className="text-danger" role="alert">
                                                    {errors.proposta_tema?.message}
                                                </span>
                                            )}
                                        </p>
                                        <div className="d-flex justify-content-evenly">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="tema"
                                                    id="diss"
                                                    value="dissertação"
                                                    {...register("proposta_tema", {
                                                        required: "Opção inválida",
                                                    })}
                                                />
                                                <label className="form-check-label" htmlFor="diss">
                                                    Dissertação
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="tema"
                                                    id="proj"
                                                    value="projeto"
                                                    {...register("proposta_tema", {
                                                        required: "Opção inválida",
                                                    })}
                                                />
                                                <label className="form-check-label" htmlFor="proj">
                                                    Projeto
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="tema"
                                                    id="est"
                                                    value="estagio"
                                                    {...register("proposta_tema", {
                                                        required: "Opção inválida",
                                                    })}
                                                />
                                                <label className="form-check-label" htmlFor="est">
                                                    Estágio
                                                </label>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <FormControl
                                            type="text"
                                            placeholder="Título"
                                            {...register("titulo", {
                                                required: "Campo obrigatório",
                                            })}
                                            aria-invalid={errors.titulo ? "true" : "false"}
                                        />
                                        {errors.titulo && (
                                            <p className="text-danger" role="alert">
                                                {errors.titulo?.message}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="my-4">
                                    <Col>
                                        <FormControl
                                            as="textarea"
                                            rows="7"
                                            placeholder="Palavras-chave"
                                            {...register("keywords", {
                                                required: "Campo obrigatório",
                                            })}
                                            aria-invalid={errors.keywords ? "true" : "false"}
                                        />
                                        {errors.keywords && (
                                            <p className="text-danger" role="alert">
                                                {errors.keywords?.message}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mt-1">
                                        <InputGroup>
                                            <InputGroup.Text className="bg-color-ipb color-white">Orientador IPB</InputGroup.Text>
                                            <Form.Select
                                                aria-label="OrientadorIPB"
                                                {...register("ori_IPB", {
                                                    required: "Nome de orientador inválido",
                                                })}
                                                onChange={(e) => setOrientadorIpbEmail(handleOrientadorChange(e))}
                                            >
                                                <option value="">Orientadores</option>

                                                {dadosOrientadores?.map((orientador) => (
                                                    <option key={orientador.idOrientador} value={orientador.idOrientador}>
                                                        {orientador.nomeOrientador}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </InputGroup>
                                        {errors.ori_IPB && (
                                            <p className="text-danger" role="alert">
                                                {errors.ori_IPB?.message}
                                            </p>
                                        )}
                                    </Col>
                                    <Col className="mt-1">
                                        <InputGroup>
                                            <InputGroup.Text className="bg-color-ipb color-white">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <FormControl type="text" placeholder="Email" value={orientadorIpbEmail} {...register("ori_email")} />
                                        </InputGroup>
                                        {/* {errors.ori_email && (
                      <p className="text-danger" role="alert">
                        {errors.ori_email?.message}
                      </p>
                    )} */}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="mt-1">
                                        <InputGroup>
                                            <InputGroup.Text className="bg-color-ipb color-white">Co-orientador IPB</InputGroup.Text>
                                            <Form.Select
                                                aria-label="Co-orientadorIPB"
                                                {...register("co_ori_IPB", {
                                                    required: "Nome de Co-orientador inválido",
                                                })}
                                                onChange={(e) => setcoOrientadorIpbEmail(handleOrientadorChange(e))}
                                            >
                                                <option value="">Orientadores</option>

                                                {dadosOrientadores?.map((orientador) => (
                                                    <option key={orientador.idOrientador} value={orientador.idOrientador}>
                                                        {orientador.nomeOrientador}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </InputGroup>
                                        {errors.co_ori_IPB && (
                                            <p className="text-danger" role="alert">
                                                {errors.co_ori_IPB?.message}
                                            </p>
                                        )}
                                    </Col>
                                    <Col className="mt-1">
                                        <InputGroup>
                                            <InputGroup.Text className="bg-color-ipb color-white">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <FormControl type="text" placeholder="Email" value={coOrientadorIpbEmail} {...register("co_ori_email")} />
                                        </InputGroup>
                                        {/* {errors.co_ori_email && (
                      <p className="text-danger" role="alert">
                        {errors.co_ori_email?.message}
                      </p>
                    )} */}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="mt-1">
                                        <InputGroup>
                                            <InputGroup.Text className="bg-color-ipb color-white">Co-orientador Ext</InputGroup.Text>
                                            <Form.Select
                                                aria-label="Co-orientadorExt"
                                                {...register("co_ori_EXT", {
                                                    required: "Nome de orientador inválido",
                                                })}
                                                onChange={(e) => {
                                                    setcoOrientadorExtEmail(handleOrientadorChange(e));
                                                    //console.log("teste");
                                                    setcoOrientadorExtInst(handleOrientadorChange_getInst(e));
                                                    setcoOrientadorExtInstPais(handleOrientadorChange_getPaisInst(e));
                                                }}
                                            >
                                                <option value="">Orientadores</option>

                                                {dadosOrientadores?.map((orientador) => (
                                                    <option key={orientador.idOrientador} value={orientador.idOrientador}>
                                                        {orientador.nomeOrientador}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </InputGroup>
                                        {errors.co_ori_EXT && (
                                            <p className="text-danger" role="alert">
                                                {errors.co_ori_EXT?.message}
                                            </p>
                                        )}
                                    </Col>
                                    <Col md className="mt-1">
                                        <InputGroup>
                                            <InputGroup.Text className=" bg-color-ipb color-white">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <FormControl type="text" placeholder="Email" value={coOrientadorExtEmail} {...register("co_ori_ext_email")} />
                                        </InputGroup>
                                        {/* {errors.co_ori_ext_email && (
                      <p className="text-danger" role="alert">
                        {errors.co_ori_ext_email?.message}
                      </p>
                    )} */}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="col-md mt-1">
                                        <InputGroup>
                                            <InputGroup.Text className=" bg-color-ipb color-white">Instituição do Co-orientador Ext</InputGroup.Text>
                                            <FormControl type="text" placeholder="Nome" value={coOrientadorExtInst} {...register("ins_co_ori_ext_name")} />
                                        </InputGroup>
                                        {/* {errors.ins_co_ori_ext_name && (
                      <p className="text-danger" role="alert">
                        {errors.ins_co_ori_ext_name?.message}
                      </p>
                    )} */}
                                    </Col>
                                    <Col md={4} className="mt-1">
                                        <InputGroup>
                                            <InputGroup.Text className=" bg-color-ipb color-white">País</InputGroup.Text>
                                            <FormControl type="text" placeholder="..." value={coOrientadorExtInstPais} {...register("ins_co_ori_ext_pais")} />
                                        </InputGroup>
                                        {/* {errors.ins_co_ori_ext_pais && (
                      <p className="text-danger" role="alert">
                        {errors.ins_co_ori_ext_pais?.message}
                      </p>
                    )} */}
                                    </Col>
                                </Row>
                                <Row className="my-4">
                                    <Col>
                                        <FormControl
                                            as="textarea"
                                            rows="5"
                                            placeholder="Objetivos"
                                            {...register("objetivos", {
                                                required: "Não pode deixar este campo vazio",
                                            })}
                                            aria-invalid={errors.objetivos ? "true" : "false"}
                                        />
                                        {errors.objetivos && (
                                            <p className="text-danger" role="alert">
                                                {errors.objetivos?.message}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="my-4">
                                    <Col>
                                        <FormControl
                                            as="textarea"
                                            rows="9"
                                            placeholder="Descrição"
                                            {...register("descricao", {
                                                required: "Não pode deixar este campo vazio",
                                            })}
                                            aria-invalid={errors.descricao ? "true" : "false"}
                                        />
                                        {errors.descricao && (
                                            <p className="text-danger" role="alert">
                                                {errors.descricao?.message}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="my-4">
                                    <Col>
                                        <FormControl
                                            as="textarea"
                                            rows="7"
                                            placeholder="Metedologia/Plano de estudo"
                                            {...register("metedologia", {
                                                required: "Não pode deixar este campo vazio",
                                            })}
                                            aria-invalid={errors.metedologia ? "true" : "false"}
                                        />
                                        {errors.metedologia && (
                                            <p className="text-danger" role="alert">
                                                {errors.metedologia?.message}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="my-4">
                                    <Col>
                                        <FormControl
                                            as="textarea"
                                            rows="3"
                                            placeholder="Pré-requisitos"
                                            {...register("pre_requisitos", {
                                                required: "Não pode deixar este campo vazio",
                                            })}
                                            aria-invalid={errors.pre_requisitos ? "true" : "false"}
                                        />
                                        {errors.pre_requisitos && (
                                            <p className="text-danger" role="alert">
                                                {errors.pre_requisitos?.message}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="my-4">
                                    <Col>
                                        <FormControl
                                            as="textarea"
                                            rows="3"
                                            placeholder="Recursos necessários"
                                            {...register("recursos", {
                                                required: "Não pode deixar este campo vazio",
                                            })}
                                            aria-invalid={errors.recursos ? "true" : "false"}
                                        />
                                        {errors.recursos && (
                                            <p className="text-danger" role="alert">
                                                {errors.recursos?.message}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="justify-content-between my-4">
                                    <Col className="mt-1">
                                        <>
                                            <Button id="addFile" className="btn-ipb" onClick={() => setShowUploadPropostaFileModal(true)}>
                                                Adicionar proposta&nbsp;&nbsp;&nbsp;
                                                <FontAwesomeIcon icon={faFilePdf} />
                                            </Button>
                                            <ModalUploadFile
                                                show={showUploadPropostaFileModal}
                                                handleClose={handleCloseUploadPropostaFileModal}
                                                text={"Carregar proposta"}
                                                handleChangedFile={(path) => setPropostaPath(path)}
                                                backendUrl={"/proposta/upload-proposta-file"}
                                            />
                                        </>
                                        {propostaPathError ? (
                                            <p className="alert alert-warning mt-3 w-50 mx-auto my-auto">
                                                <FontAwesomeIcon icon={faTriangleExclamation} /> É obrigatorio adicionar uma proposta!
                                            </p>
                                        ) : null}
                                    </Col>
                                </Row>
                                <Row className="justify-content-center pt-3 mt-2 mb-5 px-5">
                                    <Col md={"auto"}>
                                        <Button id="submeter" className="btn-ipb" type="submit">
                                            Submeter
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </form>
            )
        </>
    );
}
