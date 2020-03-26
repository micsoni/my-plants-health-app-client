import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../store/actions/user.js";
import AuthForm from "./AuthForm";

function SignUpFormContainer(props) {
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
      <div>
        <p>Fill in your data to join us</p>
        <p>{props.header}</p>
        <AuthForm
          onSubmit={onSubmit}
          onChange={onChange}
          messsage={props.message}
          values={user}
          type={"Sign Up"}
        />
        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }
  return <Redirect to="/profile" />;
}

function mapStateToProps(state) {
  return { userLoggedIn: state.user.loginInfo };
}

export default connect(mapStateToProps, { signup })(SignUpFormContainer);
