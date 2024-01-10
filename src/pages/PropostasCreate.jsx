import { useNavigate } from "react-router";
import IpbNavbar from "./components/IpbNavbar";
import PropostaForm from "./components/PropostaForm";
import { useEffect, useState } from "react";
import api from "../api/axios-config";

export default function PropostasCreate() {
  const navigate = useNavigate();

  const [proposta, setProposta] = useState(false);

  useEffect(() => {
    api
      .get("/proposta/proposta-aluno")
      .then((res) => {
        console.log(res.data);
        setProposta(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  if (proposta) {
    navigate("/propostas");
  }

  return (
    <>
      <div className="bg-image">
        <IpbNavbar />
        <PropostaForm />
      </div>
    </>
  );
}
