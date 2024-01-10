import { Col, Row, Container, InputGroup, FormControl, Button, ProgressBar, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faEnvelope, faCalendarDays, faFilePdf, faPlus } from "@fortawesome/free-solid-svg-icons";
import IpbNavbar from "./components/IpbNavbar";
import { useNavigate } from "react-router-dom";
import PropostaDashboard from "./components/PropostaDashboard";
import api from "../api/axios-config";
import Proposta from "./components/Proposta";
import ErrorAlert from "./components/ErrorAlert";
import AnimatePage from "./components/Animate";

export default function Propostaspage() {
  const [err, setErr] = useState();
  const [proposta, setProposta] = useState(false);

  useEffect(() => {
    api
      .get("/proposta/proposta-aluno")
      .then((res) => {
        console.log(res.data);
        setProposta(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      });
  }, []);

  return (
    <>
      <IpbNavbar></IpbNavbar>
      <AnimatePage>
        {err?.response && err.response.status === 404 ? (
          <PropostaDashboard />
        ) : proposta ? (
          <Proposta
            titulo={proposta?.propostaTitulo}
            descricao={proposta?.propostaDescricao}
            orientadorIPB={proposta?.orientadorIPBNome}
            coOrientadorIPB={proposta?.coOrientadorIPBNome}
            coOrientadorEXT={proposta?.coOrientadorExt}
            coOrientadorEXTInst={proposta?.nomeInst}
            estadoEtapa={proposta?.estadoEtapa}
            nomeEstado={proposta?.nomeEstado}
            estadoDescricao={proposta?.estadoDescricao}
            mensagemEnviadaPor={proposta?.mensagemEnviadaPor}
            mensagemTexto={proposta?.mensagemTexto}
            propostaLink={proposta?.propostaLink}
          />
        ) : (
          <ErrorAlert errorName={err?.message} />
        )}
      </AnimatePage>
    </>
  );
}
