import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteUser(props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const handleDelete = () => {
    fetch('http://localhost:3000/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: props.userId }),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Zobrazí zprávu z backendu
      setShowConfirmModal(false);
      props.onUserDeleted(); // Zavolá funkci na aktualizaci seznamu uživatelů v App.js
    })
    .catch(error => console.error('Error deleting user:', error));
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <Button variant="danger" size="sm" onClick={() => setShowConfirmModal(true)}>Smazat uživatele</Button>
      <Modal show={showConfirmModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Potvrzení smazání uživatele</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Opravdu chcete smazat tohoto uživatele?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>Zrušit</Button>
          <Button variant="danger" onClick={handleDelete}>Smazat</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
