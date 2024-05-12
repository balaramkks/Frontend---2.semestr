import React from "react";
import User from "./User";

function UserList({ userList, onUserDeleted, onLessonCreate }) {
  function getUserList(userList) {
    return userList.map((user) => {
      return <User key={user.id} user={user} onUserDeleted={onUserDeleted} onLessonCreate={onLessonCreate}/>;
    });
  }

  return <div>{getUserList(userList)}</div>;
}

export default UserList;
