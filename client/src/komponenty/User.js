import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import DeleteUser from "./DeleteUser";
import { mdiAccountSchoolOutline, mdiIdentifier, mdiAt, mdiHumanMaleFemale, mdiCake, mdiClipboardListOutline, mdiAccountCircle } from "@mdi/js";
import CreateLesson from "./CreateLesson";

function User(props) {

  // Aktualizace seznamu uživatelů po smazání
  const handleUserDeleted = () => {
    props.onUserDeleted(props.user.id);
  };

    // Aktualizace seznamu lekcí po vytvoření lekce
    const handleLessonCreated = () => {
      props.onLessonCreate(props.user.id);
    };
  

  return (
    <Card>
      <Card.Header style={{ backgroundColor: '#f0f0f0' }}>
        {props.user.role === "ucitel" ? "Učitel autoškoly" : "Žák autoškoly"}
      </Card.Header>


      <Card.Body>
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td style={{ width: '33%' }}><Icon path={mdiAccountSchoolOutline} size={1} color="grey" title="Jméno a příjmení" /> <span title="Jméno a příjmení">{props.user.name} {props.user.surname}</span></td>
                <td style={{ width: '33%' }}><Icon path={mdiAt} size={1} color="grey" title="Email" /> <span title="Email">{props.user.email}</span></td>
                <td style={{ width: '33%' }}><Icon path={mdiIdentifier} size={1} color="grey" title="ID uživatele" /> <span title="ID uživatele">{props.user.id}</span></td>
              </tr>
              <tr>
                <td style={{ width: '33%' }}><Icon path={mdiHumanMaleFemale} size={1} color="grey" title="Pohlaví" /> <span title="Pohlaví">{props.user.sex}</span></td>
                <td style={{ width: '33%' }}><Icon path={mdiCake} size={1} color="grey" title="Věk" /> <span title="Věk">{props.user.age}</span></td>
                <td style={{ width: '33%' }}></td>
              </tr>
              <tr>
                <td style={{ width: '33%' }}><Icon path={mdiClipboardListOutline} size={1} color="grey" title="Počet schválených jízd" /> <span title="Počet schválených jízd">{props.user.number_of_approved_rides}</span></td>
                <td style={{ width: '33%' }}><Icon path={mdiAccountCircle} size={1} color="grey" title="Role uživatele" /> <span title="Role uživatele">{props.user.role}</span></td>
                <td style={{ width: '33%' }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
          {props.user.role !== "ucitel" && <CreateLesson userId={props.user.id} onLessonCreate={handleLessonCreated} />}
          <DeleteUser userId={props.user.id} onUserDeleted={handleUserDeleted} />  
        </div>
      </Card.Body>
    </Card>
  );
}

export default User;
