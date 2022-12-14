import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteOnePastryRequest,
  getAllPastriesRequest,
  restoreOnePastryRequest,
} from "../../api";
import ModalCustom from "../../components/ModalCustom";

const AdminPastries = () => {
  const [pastryToDelete, setPastryToDelete] = useState({});
  const [pastryToRestore, setPastryToRestore] = useState({});
  const [modalType, setModalType] = useState("");
  const [pastries, setPastries] = useState([]);
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    getAllPastriesRequest()
      .then(({ data }) => {
        setPastries(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  const deletePastry = (idPastry) => {
    deleteOnePastryRequest(idPastry)
      .then(({ data }) => {
        alert(data.message);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  const restorePastry = (idPastry) => {
    restoreOnePastryRequest(idPastry)
      .then(({ data }) => {
        alert(data.message);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div id="a-pastries" className="page-container">
      <ModalCustom
        modalState={modalState}
        closeModal={closeModal}
        modalTitle={
          modalType === "delete"
            ? `Veux-tu vraiment supprimer "${pastryToDelete.name}" ?`
            : `Veux-tu vraiment restaurer "${pastryToRestore.name}" ?`
        }
        modalFunction={modalType === "delete" ? deletePastry : restorePastry}
        modalParams={
          modalType === "delete" ? pastryToDelete._id : pastryToRestore._id
        }
      />
      <h1 className="page-title">Admin Pastries</h1>
      <Link to="/admin/addPastry" className="btn add-pastries-btn">
        Ajouter une patisserie
      </Link>
      <div className="patries-container">
        {pastries?.map((pastry, index) => (
          <div className="patrie" key={index}>
            <span className="patrie-name">{pastry.name}</span>
            <span
              className="btn delete-pastrie-btn"
              onClick={() => {
                setPastryToDelete(pastry);
                setModalType("delete");
                openModal();
              }}
            >
              Supprimer
            </span>
            {pastry.isDeleted && (
              <span
                className="btn restore-pastrie-btn"
                onClick={() => {
                  setPastryToRestore(pastry);
                  setModalType("restore");
                  openModal();
                }}
              >
                Restaurer
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPastries;
