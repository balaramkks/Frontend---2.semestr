import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteLesson(props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    // Připravíme objekt s potřebnými údaji pro smazání lekce
    const deleteData = {
      id: props.lessonId,
      role: "ucitel" // Uvedeme, že uživatel je učitel
    };

    fetch('http://localhost:3000/lesson/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData), // Odeslat data na backend
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Zobrazí zprávu z backendu
      setShowConfirmModal(false);
      props.onLessonDeleted(); // Zavolá funkci na aktualizaci seznamu lekcí v App.js
    })
    .catch(error => console.error('Error deleting lesson:', error));
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <Button variant="danger" size="sm" onClick={() => setShowConfirmModal(true)}>Smazat lekci</Button>
      <Modal show={showConfirmModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Potvrzení smazání lekce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Opravdu chcete smazat tuto lekci?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>Zrušit</Button>
          <Button variant="danger" onClick={handleDelete}>Smazat</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteLesson;
