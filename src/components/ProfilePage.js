import React, { useEffect, useState } from "react";
import { getUserPlantsSample } from "../store/actions/plants";
import { logout } from "../store/actions/user";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import UserPlantsCardsList from "./UserPlantsCardsList";
import CreatePlantFormContainer from "./CreatePlantFormContainer"
import "../style/ProfilePage.css";

function ProfilePage(props) {

  const [togglePlantForm, setToggleForm] = useState(false)

  const toggleForm = () => {
    setToggleForm(!togglePlantForm)
  };

  useEffect(() => {
    if (props.userLoggedIn.jwt) {
      props.getUserPlantsSample(props.userLoggedIn.id);
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
    return <UserPlantsCardsList plants={props.plants} container={"profilePage"}/>;
  };

  if (!props.userLoggedIn.jwt) {
    return <Redirect to="/login" />;
  }
  if (!props.plants) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-4">
          <p className="welcome">Welcome {props.userLoggedIn.name}</p>
          <button className="btn" onClick={onLogout}>
            Logout
          </button>

          <button className="btn" onClick={toggleForm}> New plant</button>
          <button className="btn">New alarm</button>
          {togglePlantForm && <CreatePlantFormContainer />}
        </div>
        <div className="col-sm-8">
          <div className="bigcard card container">
            <Link to={"/plants/"} className="btn">
              See all my plants
            </Link>
            {checkforPlants()}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.user.loginInfo,
    plants: state.plants.sample.rows
  };
}
const mapDispatchToProps = { getUserPlantsSample, logout };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
