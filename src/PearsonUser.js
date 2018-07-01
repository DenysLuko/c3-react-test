import React from "react";

const PearsonUser = ({id, firstName, lastName, avatar, deleteUser}) => {
  return (
    <div className="user">
      <img className="user__avatar" src={avatar} alt={`Avatar ${firstName} ${lastName}`} />
      <div className="user__name">
        {`${firstName} ${lastName}`}
      </div>
      <button
        className="user__delete-button"
        onClick={deleteUser(id)}>
        Delete
      </button>
    </div>
  );
}

export default PearsonUser;
