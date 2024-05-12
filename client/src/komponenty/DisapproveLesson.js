import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DisapproveLesson(props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDisapprove = () => {
    // Připravíme objekt s potřebnými údaji pro zamítnutí lekce
    const disapproveData = {
      id: props.lessonId,
      tutor_id: "5f355efffe" // Uvedeme ID učitele
    };

    fetch('http://localhost:3000/lesson/disapprove', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(disapproveData), // Odeslat data na backend
    })
    .then(response => response.json())
    .then(data => {
      setShowConfirmModal(false);
      props.onLessonDisapproved(props.lessonId); // Aktualizovat stav aplikace po zamítnutí lekce
    })
    .catch(error => console.error('Error disapproving lesson:', error));
  };

  const handleCancelDisapprove = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => setShowConfirmModal(true)}>Zamítnout</Button>
      <Modal show={showConfirmModal} onHide={handleCancelDisapprove} centered>
        <Modal.Header closeButton>
          <Modal.Title>Potvrzení zamítnutí lekce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Opravdu chcete zamítnout tuto lekci?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDisapprove}>Zrušit</Button>
          <Button variant="primary" onClick={handleDisapprove}>Zamítnout lekci</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DisapproveLesson;