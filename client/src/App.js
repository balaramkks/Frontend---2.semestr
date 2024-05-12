import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import NavBar from "./komponenty/NavBar";
import UserList from "./komponenty/UserList";
import LessonList from "./komponenty/LessonList";


function App() {
  const [lessonList, setLessonList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showUserList, setShowUserList] = useState(false); 

  const fetchLessons = async () => {
    try {
      const response = await fetch('http://localhost:8000/lesson/list');
      const data = await response.json();
      setLessonList(data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error; 
    }
  };
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/list');
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  
  const handleShowLessonList = () => {
    setShowUserList(false); // Skrytí seznamu žáků a zobrazení jízd
  };

  const handleShowUserList = () => {
    setShowUserList(true); // Zobrazení seznamu žáků a skrytí seznamu jízd
  };


  // Aktualizace seznamu uživatelů po smazání
  const handleUserDeleted = async () => {
    try {
      console.log("Deleting user...");
      await fetchUsers();
      console.log("User deleted successfully!");
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  // Aktualizace seznamu lekcí po smazání
  const handleLessonDeleted = async () => {
    try {
      console.log("Deleting lesson...");
      await fetchLessons();
      console.log("Lesson deleted successfully!");
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };


  // Aktualizace seznamu lekcí po schválení
  const handleLessonApproved = async () => {
    try {
      console.log("Approving lesson...");
      await fetchLessons();
      console.log("Lesson approved successfully!");
    } catch (error) {
      console.error('Error approving lesson:', error);
    }
  };
  
  
 // Načtení lekcí a uživatelů z backendu při namountování komponenty
  useEffect(() => {
    fetchLessons();
    fetchUsers();
  }, []);

  return (
    <div className="App">
       <NavBar 
         onShowLessonList={handleShowLessonList} 
         onShowUserList={handleShowUserList}
         lessonList={lessonList} // Předání seznamu lekcí jako props
         userList={userList} // Předání seznamu žáků jako props
       />
       {showUserList ? <UserList userList={userList} onUserDeleted={handleUserDeleted}  onLessonCreate={fetchLessons} /> : <LessonList lessonList={lessonList} onLessonDeleted={handleLessonDeleted} onLessonApproved={handleLessonApproved} />}
    </div>
  );
}

export default App;
