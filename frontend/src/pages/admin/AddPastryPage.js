import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPastryRequest } from "../../api";
import ModalCustom from "../../components/ModalCustom";

const AddPastryPage = () => {
  const [pastryToAdd, setPastryToAdd] = useState({});
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (data.name.length !== 0 && data.number.length !== 0) {
      data.name = data.name.trim();
      data.number = data.number.trim();
      setPastryToAdd(data);
      openModal();
    } else {
      alert("Merci de remplir tous les champs");
    }
  };

  const addPastry = (data) => {
    addPastryRequest(data)
      .then(({ data }) => {
        alert(data.message);
        navigate("/admin/pastries");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div id="a-add-pastry">
      <ModalCustom
        modalState={modalState}
        closeModal={closeModal}
        modalTitle={`Veux-tu vraiment ajouter "${pastryToAdd.name}" ?`}
        modalFunction={addPastry}
        modalParams={pastryToAdd}
      />
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-title">
          <h2>Ajouter une pâtisserie</h2>
        </div>
        <div className="form-item">
          <input
            type="text"
            name="name"
            id="name"
            className="form-input"
            placeholder="Nom de la pâtisserie"
            autoComplete="off"
          />
        </div>
        <div className="form-item">
          <input
            type="number"
            name="number"
            id="number"
            className="form-input"
            placeholder="Nombre en stock"
            maxLength={2}
          />
        </div>
        <button type="submit" className="btn btn-submit">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddPastryPage;
