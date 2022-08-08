import React from "react";
import User from "../components/User";

const Users = ({users}) => {

  return (
    <div className="d-flex flex-wrap m-2">
        {users && users.map((user) => (
          <User key={user.id} user={user}/>
        ))}
    </div>
  );
};

export default Users;
