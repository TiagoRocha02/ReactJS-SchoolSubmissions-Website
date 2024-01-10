import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyDinamicLink from "./MyDinamicLink";
import {
  faHouse,
  faFile,
  faCircleInfo,
  faUser,
  faRightFromBracket,
  faBars,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ModalHelp from "./ModalHelp";
import { Navigate } from "react-router";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { NavLink } from "react-router-dom";

export default function IpbNavbar() {
  const logout = useSignOut();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = useAuthUser();

  return (
    <>
      <Navbar expand="md" className="bg-color-ipb ">
        <Navbar.Brand
          href="/"
          className="my-0 py-0 justify-content-start d-flex"
        >
          <img
            src="/images/logo.svg"
            width="90"
            height="auto"
            className="d-inline-block align-center ms-4"
            alt="IPBPropostas logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FontAwesomeIcon className="text-white" icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="navs me-3-">
            <NavLink to="/" className="nav-link">
              <MyDinamicLink icon={faHouse} text="Home" />
            </NavLink>

            {auth().role === "Admin" ? (
              <NavLink to="/administracao" className="nav-link">
                <MyDinamicLink icon={faUsers} text="Gerir Utilizadores" />
              </NavLink>
            ) : (
              <NavLink to="/propostas" className="nav-link">
                <MyDinamicLink icon={faFile} text="Propostas" />
              </NavLink>
            )}

            {auth().role === "Admin" ? null : (
              <NavLink to="/profile" className="nav-link">
                <MyDinamicLink icon={faUser} text="Perfil" />
              </NavLink>
            )}

            <NavLink
              to={"#"}
              className={({ isActive }) => (isActive ? "nav-link" : "nav-link")}
              onClick={handleShow}
            >
              <MyDinamicLink
                className="nav-link"
                icon={faCircleInfo}
                text="Ajuda"
              ></MyDinamicLink>
            </NavLink>

            <Nav.Link
              className="nav-link"
              onClick={() => {
                logout();
                <Navigate to="/login" replace />;
              }}
            >
              <MyDinamicLink icon={faRightFromBracket} text="Logout" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <ModalHelp
        show={show}
        onHide={handleClose}
        handleHideClick={handleClose}
      />
    </>
  );
}
