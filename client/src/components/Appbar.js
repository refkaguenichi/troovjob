import React from 'react'
import { Link } from 'react-router-dom';

const Appbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark bd-navbar sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center g-2">
          <Link
            to="/"
            className="text-dark fw-bold text-decoration-none bg-white p-2 rounded-2 me-2"
          >
            troovjob
          </Link>
          <form className="position-relative">
            <input
              placeholder="Search..."
              type="text"
              className="form-control ps-4"
            />
            <i
              className="fa fa-search position-absolute start-0 top-0 p-2 d-flex align-items-center h-100 text-muted"
              aria-hidden="true"
            ></i>
          </form>
        </div>
        <div className="d-flex justify-content-between align-items-center g-2">
          <Link
            to="/"
            className="text-white text-decoration-none d-flex flex-column align-items-center g-0 me-2"
          >
            <i class="fa fa-home fa-lg" aria-hidden="true"></i>
            Home
          </Link>
          <Link
            to="/network"
            className="text-white text-decoration-none d-flex flex-column align-items-center g-0 me-2"
          >
            <i class="fa fa-users" aria-hidden="true"></i>
            Network
          </Link>
          <Link
            to="/jobs"
            className="text-white text-decoration-none d-flex flex-column align-items-center g-0 me-2"
          >
            <i class="fa fa-briefcase" aria-hidden="true"></i>
            Jobs
          </Link>
          <Link
            to="/messages"
            className="text-white text-decoration-none d-flex flex-column align-items-center g-0 me-2"
          >
            <i class="fa fa-comments fa-lg" aria-hidden="true"></i>
            Messages
          </Link>
          <Link
            to="/notifications"
            className="text-white text-decoration-none d-flex flex-column align-items-center g-0 me-2"
          >
            <i class="fa fa-bell" aria-hidden="true"></i>
            Notifications
          </Link>
          <Link
            to="/profile"
            className="text-white text-decoration-none d-flex flex-column align-items-center g-0 me-2 position-relative"
          >
            <i class="fa fa-user fa-lg" aria-hidden="true"></i>
            <span
              className="fs-6"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Me <i class="fa fa-sort-desc" aria-hidden="true"></i>
            </span>
            <div class="dropdown">
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </Link>
          <Link to="/api/auth/login" className="btn bg-white">Log In</Link>
        </div>
      </div>
    </nav>
  );
}

export default Appbar;