import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PropostasTable({ propostas }) {
  return (
    <>
      <Table variant={"secondary"} striped bordered hover>
        <thead>
          <tr className="text-center">
            <th className="text-white bg-color-ipb">Aluno</th>
            <th className="text-white bg-color-ipb">Nome</th>
            <th className="text-white bg-color-ipb">Email</th>
            <th className="text-white bg-color-ipb">Nome da Proposta</th>
            <th className="text-white bg-color-ipb">Submetida em</th>
            <th className="text-white bg-color-ipb">Ver</th>
          </tr>
        </thead>
        <tbody>
          {propostas?.length === 0 ? (
            <td colSpan={6} className="text-center text-secondary">
              Sem propostas no momento
            </td>
          ) : (
            propostas?.map((proposta) => (
              <tr key={proposta.propostaId} className="text-center">
                <th className="color-ipb fw-normal">{proposta.nAluno}</th>
                <th className="color-ipb fw-normal">{proposta.nomeAluno}</th>
                <th className="color-ipb fw-normal">{proposta.emailAluno}</th>
                <th className="color-ipb fw-normal">
                  {proposta.propostaTitulo}
                </th>
                <th className="color-ipb fw-normal">
                  {proposta.dataSubmissao}
                </th>
                <th className="color-ipb fw-normal">
                  <Link to={"/propostas/view"} state={{ proposta: proposta }}>
                    <FontAwesomeIcon className="color-ipb" icon={faEye} />
                  </Link>
                </th>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}
