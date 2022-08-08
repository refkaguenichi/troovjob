import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUser } from "../JS/userSlice";
const Profile = () => {  
const params = useParams()
const dispatch = useDispatch();
const {user, loading, error} = useSelector((state) => state.user);
useEffect(() => {
  dispatch(getOneUser(params.id));
}, []);
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <span>{user && user.userName}</span>
          <span>{user.jobseeker && user.jobseeker.firstName}</span>
          <span>{user.jobseeker && user.jobseeker.lastName}</span>
          <span>{user.jobseeker && user.jobseeker.title}</span>
          <span>{user.jobseeker && user.jobseeker.summary}</span>
          <span>{user.jobseeker && user.role.role}</span>
          <span>{user.jobseeker && user.jobseeker.email}</span>
          <span>{user.jobseeker && user.jobseeker.phone}</span>
          <span>{user.jobseeker && user.jobseeker.avatar}</span>
          <span>{user.jobseeker && user.jobseeker.links}</span>
          <span>
            {user.jobseeker &&
              user.jobseeker.address &&
              user.jobseeker.address.city}
          </span>
          <span>
            {user.jobseeker &&
              user.jobseeker.address &&
              user.jobseeker.address.street}
          </span>
          <span>
            {user.jobseeker &&
              user.jobseeker.address &&
              user.jobseeker.address.country}
          </span>
          <span>
            {user.jobseeker &&
              user.jobseeker.address &&
              user.jobseeker.address.zip_code}
          </span>
          <span>{user.company && user.company.name}</span>
          <span>{user.company && user.company.email}</span>
          <span>{user.company && user.company.description}</span>
          <span>{user.company && user.company.phone}</span>
          <span>{user.company && user.company.logo}</span>
          <span>
            {user.company &&
              user.company.address &&
              user.company.address.city}
          </span>
          <span>
            {user.company &&
              user.company.address &&
              user.company.address.street}
          </span>
          <span>
            {user.company &&
              user.company.address &&
              user.company.address.country}
          </span>
          <span>
            {user.company &&
              user.company.address &&
              user.company.address.zip_code}
          </span>
        </div>
      )}
    </>
  );
}

export default Profile