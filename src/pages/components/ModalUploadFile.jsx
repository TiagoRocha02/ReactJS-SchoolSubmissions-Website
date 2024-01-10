import {
  faCircleExclamation,
  faCloudArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Button, Modal, Toast } from "react-bootstrap";
import api from "../../api/axios-config";
import { upload } from "@testing-library/user-event/dist/upload";

export default function ModalUploadFile({
  show,
  handleClose,
  text,
  handleChangedFile,
  backendUrl,
}) {
  const fileInputRef = useRef(null);

  const [loadedFile, setLoadedFile] = useState();
  const [hasLoadedFile, setHasLoadedFile] = useState(false);
  const [error, setError] = useState();
  const [succMessage, setSuccMessage] = useState();

  const uploadData = (e) => {
    console.log(e);
    const data = e.target.files[0];
    setHasLoadedFile(true);
    setLoadedFile(data);
    console.log(data);
  };

  const sendImg = (data) => {
    const formData = new FormData();
    formData.append("data", data);

    console.log(data);

    api
      .post(backendUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setSuccMessage(res?.data?.message);
        handleRemove();
        handleChangedFile(res?.data?.path);
      })
      .catch((err) => {
        console.log(err);
        //handleRemove();
        setError(err?.response?.data);
      });
  };

  const handleRemove = () => {
    setHasLoadedFile(false);
    setLoadedFile(null);
    setError(null);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <b>Upload de ficheiros</b>{" "}
            {succMessage ? (
              <span className="text-success">
                <small className="fs-6">({succMessage})</small>
              </span>
            ) : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5>{text}</h5>
            {hasLoadedFile ? (
              <>
                <Toast className="mt-3 w-100">
                  <Toast.Header closeButton={false}>
                    <strong className="me-auto">Loaded</strong>
                    <small>Type: {loadedFile?.type}</small>
                  </Toast.Header>
                  <Toast.Body className="text-start">
                    {loadedFile?.name}
                  </Toast.Body>
                </Toast>
                <div className="mt-3">
                  <p className="text-danger">
                    {error ? (
                      <>
                        <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                        {error.message}
                      </>
                    ) : null}
                  </p>
                </div>
                <div className="d-flex justify-content-evenly mt-3">
                  <Button
                    className="btn-ipb"
                    onClick={(e) => sendImg(loadedFile)}
                  >
                    Upload <FontAwesomeIcon icon={faCloudArrowUp} />
                  </Button>
                  <Button variant="danger" onClick={handleRemove}>
                    Remover <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </>
            ) : (
              <p className="mt-4">
                <Button
                  className="btn-ipb"
                  onClick={() => {
                    setSuccMessage(null);
                    fileInputRef.current.click();
                  }}
                >
                  <input
                    className="hide-component"
                    type="file"
                    ref={fileInputRef}
                    onChange={uploadData}
                  />
                  Upload <FontAwesomeIcon icon={faCloudArrowUp} />
                </Button>
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-ipb" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
