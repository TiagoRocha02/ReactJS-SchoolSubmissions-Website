import React from "react";
import { useLocation } from "react-router";
import api from "../api/axios-config";
import IpbNavbar from "./components/IpbNavbar";
import Proposta from "./components/Proposta";

export default function PropostasView() {
  const { state } = useLocation();

  const proposta = state.proposta;

  console.log(state);

  return (
    <>
      <div className="bg-image">
        <IpbNavbar />
        <Proposta
          titulo={proposta.propostaTitulo}
          descricao={proposta.propostaDescricao}
          orientadorIPB={proposta.orientadorIPBNome}
          coOrientadorIPB={proposta.coOrientadorIPBNome}
          coOrientadorEXT={proposta.coOrientadorExt}
          coOrientadorEXTInst={proposta.nomeInst}
          nomeAluno={proposta.nomeAluno}
          numAluno={proposta.nAluno}
          propostaId={proposta.propostaId}
          propostaLink={proposta.propostaLink}
          validate={true}
        />
      </div>
    </>
  );
}
