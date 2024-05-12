import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ApproveLesson(props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleApprove = () => {
    // Připravíme objekt s potřebnými údaji pro schválení lekce
    const approveData = {
      id: props.lessonId,
      tutor_id: "5f355efffe" // Uvedeme ID učitele
    };

    fetch('http://localhost:3000/lesson/approve', {
      method: 'PATCH', // Provedeme PATCH požadavek
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(approveData), // Odeslat data na backend
    })
    .then(response => response.json())
    .then(data => {
      setShowConfirmModal(false);
      props.onLessonApproved(props.lessonId); // Aktualizovat stav aplikace po schválení lekce
    })
    .catch(error => console.error('Error approving lesson:', error));
  };

  const handleCancelApprove = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <Button variant="success" size="sm" onClick={() => setShowConfirmModal(true)}>Schválit</Button>
      <Modal show={showConfirmModal} onHide={handleCancelApprove} centered>
        <Modal.Header closeButton>
          <Modal.Title>Potvrzení schválení lekce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Opravdu chcete schválit tuto lekci?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelApprove}>Zrušit</Button>
          <Button variant="success" onClick={handleApprove}>Schválit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApproveLesson;
