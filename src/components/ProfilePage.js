import React, { useEffect, useState } from "react";
import { getUserPlants } from "../store/actions/plants";
import { logout } from "../store/actions/user";
import { connect } from "react-redux";
import { Redirect} from "react-router-dom";
import UserPlantsCardsList from "./UserPlantsCardsList";
import CreatePlantFormContainer from "./CreatePlantFormContainer";
import "../style/ProfilePage.css";

function ProfilePage(props) {
  const [togglePlantForm, setToggleForm] = useState(false);

  const toggleForm = () => {
    setToggleForm(!togglePlantForm);
  };

  const {getUserPlants} = props
  const currentUser = props.userLoggedIn.jwt

  useEffect(() => {
    if (currentUser) {
      getUserPlants(currentUser)
    }
  }, [getUserPlants, currentUser]);

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
    <div className="container-fluid">
      <p className="welcome">Welcome {props.userLoggedIn.name}</p>
      <button className="btn" onClick={onLogout}>
        Logout
      </button>
      <button className="btn" onClick={toggleForm}>
        {" "}
        New plant
      </button>
      {togglePlantForm && <CreatePlantFormContainer />}
      <div className="bigcard card container-fluid">
        <div className="card-header">My Plants</div>
        {checkforPlants()}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.user.loginInfo,
    plants: state.plants.all.rows
  };
}
const mapDispatchToProps = { getUserPlants, logout };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
