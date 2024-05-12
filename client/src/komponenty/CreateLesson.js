import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function CreateLesson(props) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [studentId, setStudentId] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setStudentId(props.userId || "");
  }, [props.userId]);

  const handleCreateLesson = async () => {
    const newErrors = [];

    if (!date || !startTime || !studentId) {
      newErrors.push("Všechna pole jsou povinná.");
    }

    const now = new Date();
    const selectedDateTime = new Date(`${date}T${startTime}`);
    if (selectedDateTime <= now) {
      newErrors.push("Datum a čas lekce musí být v budoucnosti.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const formattedDate = formatDateForSchema(date);

    const lessonData = {
      date: formattedDate,
      start_time: startTime,
      student_id: studentId,
      validity: null,
    };

    try {
      const response = await fetch("http://localhost:3000/lesson/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setShowCreateModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating lesson:", error);
      setErrors(["Tento termín je již zabraný. Vyberte jiný."]);
    }
  };

  const handleCancelCreate = () => {
    setShowCreateModal(false);
    setErrors([]);
  };

  const formatDateForSchema = (inputDate) => {
    const parts = inputDate.split("-");
    if (parts.length !== 3) {
      return inputDate;
    }
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

  return (
    <>
      <Button
        variant="success"
        size="sm"
        onClick={() => setShowCreateModal(true)}
      >
        Vytvořit jízdu
      </Button>

      <Modal show={showCreateModal} onHide={handleCancelCreate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Vytvoření nové lekce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errors.length > 0 && (
            <div style={{ color: "red" }}>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <Form>
            <Form.Group controlId="lessonDate">
              <Form.Label>Datum</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="lessonStartTime">
              <Form.Label>Čas začátku</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Control type="hidden" value={studentId} readOnly />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelCreate}>
            Zrušit
          </Button>
          <Button variant="success" onClick={handleCreateLesson}>
            Vytvořit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateLesson;
