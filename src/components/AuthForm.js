import React from "react";

export default function AuthForm(props) {
  const typeOfForm = () => {
    if (props.type === "Sign Up") {
      return (
        <div className="form-group col-12">
          <label className="col-sm-2">Name</label>
          <input
            type="text"
            name="username"
            onChange={props.onChange}
            value={props.values.username}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="text-center">
      <form onSubmit={props.onSubmit}>
        {typeOfForm()}
        <div className="form-group col-12">
          <label className="col-sm-2">Email</label>
          <input
            type="email"
            name="email"
            onChange={props.onChange}
            value={props.values.email}
          />
        </div>
        <div className="form-group col-12">
          <label className="col-sm-2">Password</label>
          <input
            type="password"
            name="password"
            onChange={props.onChange}
            value={props.values.password}
          />
        </div>
        <button type="submit" className="btn">
          {props.type}
        </button>
      </form>
    </div>
  );
}
