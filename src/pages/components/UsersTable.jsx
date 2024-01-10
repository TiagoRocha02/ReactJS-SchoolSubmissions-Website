import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../api/axios-config";
import DeleteUserModal from "./DeleteUserModal";

export default function UsersTable({
  searchFor,
  setGetData,
  getData,
  setMessageToastParams,
  handleShowMessageToast,
}) {
  const [usersData, setUsersData] = useState();

  const deleteUserId = useRef();

  const [showModalDelteUser, setShowModalDelteUser] = useState(false);

  const handleCloseModalDelteUser = () => setShowModalDelteUser(false);
  const handleShowModalDelteUser = (id) => {
    deleteUserId.current = id;

    setShowModalDelteUser(true);
  };

  const handleRemoveUser = () => {
    //alert(`Remove user ${deleteUserId.current}`);

    api
      .delete(`admin/delete-user?id=${deleteUserId.current}`)
      .then((res) => {
        console.log(res);
        setMessageToastParams({
          text: "Utilizador removido com sucesso!",
          color: "primary",
        });
        handleShowMessageToast();
        setGetData(true);
        handleCloseModalDelteUser();
      })
      .catch((err) => {
        console.log(err);
        setMessageToastParams({
          text: "Erro ao eliminar utilizador![Verifique se o utilizador é um orientador]",
          color: "danger",
        });
        handleShowMessageToast();
      });
  };

  useEffect(() => {
    api
      .get("admin/list-users")
      .then((res) => {
        setGetData(false);
        console.log(res);
        setUsersData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getData]);

  return (
    <>
      <DeleteUserModal
        show={showModalDelteUser}
        handleClose={handleCloseModalDelteUser}
        handleRemoveUser={handleRemoveUser}
      />
      <Table variant={"secondary"} striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th className="text-white bg-color-ipb">ID</th>
            <th className="text-white bg-color-ipb">Nome</th>
            <th className="text-white bg-color-ipb">Email</th>
            <th className="text-white bg-color-ipb">Função</th>
            <th className="text-white bg-color-ipb">Ultima Visita</th>
            <th className="text-white bg-color-ipb">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usersData
            ?.filter(
              (user) =>
                user?.nome?.toLowerCase().includes(searchFor.toLowerCase()) ||
                user?.n_mec?.toLowerCase().includes(searchFor.toLowerCase()) ||
                user?.email?.toLowerCase().includes(searchFor.toLowerCase()) ||
                user?.func?.toLowerCase().includes(searchFor.toLowerCase())
            )
            .map((user) => (
              <tr key={user.user_id} className="text-center">
                <th className="color-ipb fw-normal">{user.n_mec}</th>
                <th className="color-ipb fw-normal">{user.nome}</th>
                <th className="color-ipb fw-normal">{user.email}</th>
                <th className="color-ipb fw-normal">{user.func}</th>
                <th className="color-ipb fw-normal">{user.logado_a}</th>
                <th className="color-ipb fw-normal">
                  <Link
                    onClick={(e) => handleShowModalDelteUser(user.user_id)}
                    className="mx-1"
                    to={""}
                  >
                    <FontAwesomeIcon className="text-danger" icon={faTrash} />
                  </Link>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
