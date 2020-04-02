import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/user";
import "../../style/Navbar.css";

function Navbar(props) {
  const onLogout = () => {
    props.logout();
  };

  const userLoggedIn = () => {
    if (!props.userLoggedIn.jwt) {
      return (
        <li className="nav-item active">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      );
    } else {
      return (
        <li className="nav-item active dropdown">
          <Link
            to="/profile"
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Profile
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link to="/profile" className="nav-link dropdown-item">
              My plants
            </Link>
            <Link to="/alarms" className="nav-link dropdown-item">
              My alarms
            </Link>
            <Link to="/notes" className="nav-link dropdown-item">
              My notes
            </Link>
          </div>
        </li>
      );
    }
  };

  const logout = () => {
    if (!props.userLoggedIn.jwt) {
      return null;
    } else {
      return (
        <Link to="/" className="nav-link">
          <button onClick={onLogout} className="whiteButton">
            Logout
          </button>
        </Link>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-md">
      <button
        className="navbar-toggler navbar-dark"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {userLoggedIn()}
          {logout()}
        </ul>
      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return { userLoggedIn: state.user.loginInfo };
}

export default connect(mapStateToProps, { logout })(Navbar);
