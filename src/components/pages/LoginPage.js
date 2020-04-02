import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/actions/user.js";
import AuthForm from "../forms/AuthForm";
import "../../style/Forms.css";

function LoginFormPage(props) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const onSubmit = event => {
    event.preventDefault();
    props.login(user.email, user.password);
  };

  const onChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  if (!props.userLoggedIn.jwt) {
    return (
      <div className="form ">
        <div className="card shadow-sm">
          <p className="text-center">Log in to access your personal page</p>
          <AuthForm
            onSubmit={onSubmit}
            onChange={onChange}
            values={user}
            type={"Login"}
          />
          <p className="text-center">
            Not a member yet? <Link to="/signup">Join us</Link>
          </p>
        </div>
      </div>
    );
  }
  return <Redirect to="/profile" />;
}

function mapStateToProps(state) {
  return { userLoggedIn: state.user.loginInfo };
}

export default connect(mapStateToProps, { login })(LoginFormPage);
