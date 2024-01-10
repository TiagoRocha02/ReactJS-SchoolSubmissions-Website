import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./images/logo.svg";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  InputGroup,
  FormControl,
  Image,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../api/axios-config";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { HttpStatusCode } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faLock,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function Loginpage() {
  /**Check if user is logged in if it is cant access login */
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [errMessage, setErrMessage] = useState();

  const signIn = useSignIn();

  //function that handles the submit action
  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/auth/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        //console.log(res.data);
        //localStorage.setItem("_auth", res.data.access_token);
        //const accessToken = res?.data?.access_token;
        if (
          signIn({
            token: res?.data?.access_token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: res.data,
          })
        ) {
          // Redirect or do-something
          window.location = "/";
        } else {
          throw HttpStatusCode(500);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMessage(err);
      });
  };

  return (
    <>
      <div className="bg-image">
        <Container className="login-box fade-in-1 " align="center">
          <Row className="justify-content-center">
            <Col className="px-5">
              <Image fluid src={logo} alt="logo" className="w-20 mt-5 mb-5" />

              <form id="login" onSubmit={handleSubmit}>
                {errMessage?.response &&
                Array.isArray(errMessage.response.data) ? (
                  <Alert variant={"danger"} className="mt-3">
                    {errMessage.response.data.map((e, key) => (
                      <div key={key}>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        &nbsp;
                        {e.message}
                      </div>
                    ))}
                  </Alert>
                ) : errMessage?.message ? (
                  <Alert variant={"danger"} className="mt-3">
                    <>
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                      &nbsp;
                      {errMessage?.message}
                    </>
                  </Alert>
                ) : null}
                <InputGroup className="mb-3">
                  <InputGroup.Text className="bg-color-ipb text-white">
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <FormControl
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nº de Aluno"
                    type="text"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="bg-color-ipb text-white">
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <FormControl
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                  />
                </InputGroup>
                <Button
                  className="btn btn-ipb mt-3 mb-5 w-100"
                  align="center"
                  type="submit"
                >
                  Login
                </Button>

                {/* ---------------------------------------------- */}
              </form>
              {/* <a type="button" data-bs-toggle="modal" data-bs-target="#modalRecuperarPassword" className="color-ipb" href="/#">
                                        Recuperar password</a> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
