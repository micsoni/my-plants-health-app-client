import React, { useEffect } from "react";
import { getUserPlants, logout } from "../store/actions/user";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import UserPlantsCardsList from "./UserPlantsCardsList";

function ProfilePage(props) {
  useEffect(() => {
    if (props.userLoggedIn.jwt) {
      props.getUserPlants(props.userLoggedIn.id);
    }
  }, []);

  const onLogout = () => {
    props.logout();
    props.history.push("/");
  };

  const checkforPlants = () => {
    if (props.plants.length === 0) {
      return <p>You haven't added any plants yet</p>;
    }
    return <UserPlantsCardsList plants={props.plants} />;
  };

  if (!props.userLoggedIn.jwt) {
    return <Redirect to="/login" />;
  }
  if (!props.plants) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <p>Welcome {props.userLoggedIn.name}</p>
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        </div>
        <div className="col-sm-8">
          <div className="card container">{checkforPlants()}</div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.user.loginInfo,
    plants: state.user.plants
  };
}
const mapDispatchToProps = { getUserPlants, logout };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
