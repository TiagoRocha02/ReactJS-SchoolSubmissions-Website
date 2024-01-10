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

export default function AlunoRouter() {
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
            path="/propostas"
            element={
              <PrivateRoute loginPath={"/login"}>
                <Propostaspage />
              </PrivateRoute>
            }
          />
          <Route
            path="/propostas/create"
            element={
              <PrivateRoute loginPath={"/login"}>
                <PropostasCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute loginPath={"/login"}>
                <Profilepage />
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
