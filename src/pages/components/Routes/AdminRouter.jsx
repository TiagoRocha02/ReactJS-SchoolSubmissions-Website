import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Homepage from "../../Homepage";
import Loginpage from "../../Loginpage";
import Propostaspage from "../../Propostaspage";
import Profilepage from "../../Profilepage";
import PropostasCreate from "../../PropostasCreate";
import ErrorAlert from "../ErrorAlert";
import EntidadePage from "../../EntidadePage";
import PropostasView from "../../PropostasView";
import Administracaopage from "../../Administracaopage";

export default function AdminRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route
            path="/"
            element={
              <PrivateRoute loginPath={"/login"}>
                <Homepage />
              </PrivateRoute>
            }
          />
          <Route
            path="/administracao"
            element={
              <PrivateRoute loginPath={"/login"}>
                <Administracaopage />
              </PrivateRoute>
            }
          />
          <Route
            path="/error"
            element={
              <PrivateRoute loginPath={"/login"}>
                <ErrorAlert />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
