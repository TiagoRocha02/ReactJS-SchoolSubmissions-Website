import { Routes, Route, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Propostaspage from "./pages/Propostaspage.jsx";
import Profilepage from "./pages/Profilepage.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import PropostasCreate from "./pages/PropostasCreate.jsx";
import ErrorPage from "./pages/components/ErrorAlert.jsx";
import EntidadePage from "./pages/EntidadePage.jsx";
import PropostasView from "./pages/PropostasView.jsx";
import PrivateRoute from "./pages/components/PrivateRoute.js";
import AlunoRouter from "./pages/components/Routes/AlunoRouter.jsx";
import EntRouter from "./pages/components/Routes/EntRouter.jsx";
import AdminRouter from "./pages/components/Routes/AdminRouter.jsx";
import Administracaopage from "./pages/Administracaopage.jsx";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const isAuth = useIsAuthenticated();
  const authData = useAuthUser();

  if (isAuth()) {
    console.log(authData());

    switch (authData().role) {
      case "Aluno":
        return <AlunoRouter />;
      case "Secretaria":
        return <EntRouter />;
      case "Diretor":
        return <EntRouter />;
      case "Docente":
        return <EntRouter />;
      case "Admin":
        return <AdminRouter />;
      default:
        return false;
    }
  }

  return (
    <>
      <BrowserRouter>
        <AnimatePresence>
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
              path="/profile"
              element={
                <PrivateRoute loginPath={"/login"}>
                  <Profilepage />
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
              path="/error"
              element={
                <PrivateRoute loginPath={"/login"}>
                  <ErrorPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/propostas/entidade"
              element={
                <PrivateRoute loginPath={"/login"}>
                  <EntidadePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/propostas/view"
              element={
                <PrivateRoute loginPath={"/login"}>
                  <PropostasView />
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
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </>
  );
}
