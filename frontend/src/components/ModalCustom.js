import React, { useState } from "react";
import Modal from "react-modal";

const ModalCustom = ({
  modalTitle,
  modalFunction,
  modalParams,
  modalState,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={closeModal}
      className="modal"
      contentLabel="Example Modal"
    >
      <h2>{modalTitle}</h2>
      <div className="btn-block">
        <span
          className="btn modal-btn"
          onClick={() => {
            modalFunction(modalParams);
            closeModal();
          }}
        >
          Oui
        </span>
        <span className="btn modal-btn" onClick={closeModal}>
          Non
        </span>
      </div>
    </Modal>
  );
};

export default ModalCustom;
