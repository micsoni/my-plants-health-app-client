import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../../store/actions/user.js";
import AuthForm from "../forms/AuthForm";
import "../../style/Forms.css";

function SignUpFormPage(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const onSubmit = event => {
    event.preventDefault();

    props.signup(user.email, user.password, user.username);
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
          <p className="text-center">Fill in your data to join us</p>
          <AuthForm
            onSubmit={onSubmit}
            onChange={onChange}
            values={user}
            type={"Sign Up"}
          />
          <p className="text-center">
            Already a member? <Link to="/login">Login</Link>
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

export default connect(mapStateToProps, { signup })(SignUpFormPage);
