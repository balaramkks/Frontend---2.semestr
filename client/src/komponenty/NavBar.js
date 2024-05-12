import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRef } from "react";

function NavBar({
  onShowLessonList,
  onShowUserList,
  lessonList,
  userList,
  handleSearchChange,
}) {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [showUserList, setShowUserList] = useState(false); // Stav pro zobrazení seznamu žáků
  const [selectedNavItem, setSelectedNavItem] = useState("Seznam jízd"); // Stav pro vybranou položku v navigaci
  const toggleRef = useRef(null); // Reference na tlačítko pro otevření/zavření toggle menu

  useEffect(() => {
    // Získání aktuálního času a data
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    // Zastavení intervalu při unmountu komponenty
    return () => clearInterval(intervalId);
  }, []);

  const handleShowLessonListClick = () => {
    setShowUserList(false); // Skrytí seznamu žáků
    setSelectedNavItem("Seznam jízd"); // Zrušení označení vybrané položky
    onShowLessonList(); // Zavolání funkce z App.js pro zobrazení seznamu jízd
    window.scrollTo({ top: 0, behavior: "instant" }); // Posunutí na začátek stránky
    if (toggleRef.current && window.innerWidth <= 992) { //kontrolujeme šířku okna
      toggleRef.current.click(); // Zavře virtuálním kliknutím toggle button pro zavření menu
    }
  };

  const handleShowUserListClick = () => {
    setShowUserList(true); // Zobrazení komponenty UserList
    setSelectedNavItem("Seznam uživatelů"); // Nastavení vybrané položky na "Seznam uživatelů"
    onShowUserList(); // Zavolání funkce z App.js pro zobrazení seznamu žáků
    window.scrollTo({ top: 0, behavior: "instant" }); // Posunutí na začátek stránky
    if (toggleRef.current && window.innerWidth <= 992) { //kontrolujeme šířku okna
      toggleRef.current.click(); // Zavře virtuálním kliknutím toggle button pro zavření menu
    }
  };
  

  return (
    <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
      <Container fluid>
        <div>
          <h3>DASHBOARD AUTOŠKOLY</h3>
          <p>{currentDateTime}</p> {/* Zobrazení aktuálního času */}
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" ref={toggleRef} />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "120px" }}
            navbarScroll
          >
            <NavDropdown title="Přihlásit se" id="navbarScrollingDropdown">
              <NavDropdown.Item
                href="#action1"
                onClick={() => {
                  if (toggleRef.current && window.innerWidth <= 992) {
                    toggleRef.current.click(); // Zavře virtuálním kliknutím toggle button pro zavření menu
                  }
                }}
              >
                Učitel
              </NavDropdown.Item>

              <NavDropdown.Item
                href="#action2"
                onClick={() => {
                  if (toggleRef.current && window.innerWidth <= 992) {
                    toggleRef.current.click(); // Zavře virtuálním kliknutím toggle button pro zavření menu
                  }
                }}
              >
                Žák
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action2"
                onClick={() => {
                  if (toggleRef.current && window.innerWidth <= 992) {
                    toggleRef.current.click(); // Zavře virtuálním kliknutím toggle button pro zavření menu
                  }
                }}
              >
                Odhlásit se
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              onClick={handleShowUserListClick}
              className={selectedNavItem === "Seznam uživatelů" ? "fw-bold" : ""}
            >
              Seznam uživatelů
            </Nav.Link>
            <Nav.Link
              onClick={handleShowLessonListClick}
              className={selectedNavItem === "Seznam jízd" ? "fw-bold" : ""}
            >
              Seznam jízd
            </Nav.Link>
          </Nav>
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Form.Control
              type="search"
              placeholder="Hledej..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" type="submit">
              Hledat
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
