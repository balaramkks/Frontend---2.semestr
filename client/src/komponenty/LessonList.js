// Import potřebných komponent
import React from "react";
import Lesson from "./Lesson";

// Komponenta LessonList
function LessonList(props) {
  
  // Funkce pro smazání lekce
  const handleLessonDeleted = (lessonId) => {
    props.onLessonDeleted(lessonId);
  };

  // Funkce pro schválení lekce
  const handleLessonApproved = (lessonId) => {
    props.onLessonApproved(lessonId);
  };

  // Funkce pro zamítnutí lekce
  const handleLessonDisapproved = (lessonId) => {
    props.onLessonDisapproved(lessonId);
  };

  // Vykreslení seznamu lekcí
  function getLessonList(lessonList) {
    return lessonList.map((lesson) => {
      return (
        <Lesson
          key={lesson.id}
          lesson={lesson}
          onLessonDeleted={handleLessonDeleted}
          onLessonApproved={handleLessonApproved}
          onLessonDisapproved={handleLessonDisapproved}
        />
      );
    });
  }

  return <div>{getLessonList(props.lessonList)}</div>;
}

export default LessonList;
