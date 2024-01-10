import React, { useEffect, useState } from "react";
import IpbNavbar from "./components/IpbNavbar";
import { Col, Container, Row } from "react-bootstrap";
import PropostasTable from "./components/PropostasTable";
import { useAuthUser } from "react-auth-kit";
import api from "../api/axios-config";

export default function EntidadePage() {
  const auth = useAuthUser();
  console.log(auth());

  const [propostas, setPropostas] = useState();

  useEffect(() => {
    api
      .get("/proposta/proposta-entidade")
      .then((res) => {
        console.log(res.data);
        setPropostas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="bg-image">
        <IpbNavbar />
        <Container className="mt-5">
          <Row>
            <Col>
              <PropostasTable propostas={propostas} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
