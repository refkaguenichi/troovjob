import React from 'react'
import { Link } from 'react-router-dom'

const User = ({user}) => {
  return (
    <div className="card me-2" style={{ width: "18rem" }}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{user.userName}</h5>
        <Link to={`api/users/${user.id}`} className="btn btn-primary">
          show profile
        </Link>
      </div>
    </div>
  );
}
 
export default User 