import React, { useEffect, useState } from "react";
import { getUserPlants } from "../../store/actions/plants";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import UserPlantsCardsList from "../presentationals/UserPlantsCardsList";
import CreatePlantFormContainer from "../forms/CreatePlantFormContainer";
import "../../style/ProfilePage.css";

function ProfilePage(props) {
  const [togglePlantForm, setToggleForm] = useState(false);

  const toggleForm = () => {
    setToggleForm(!togglePlantForm);
  };

  const { getUserPlants } = props;
  const currentUser = props.userLoggedIn.jwt;

  useEffect(() => {
    if (currentUser) {
      getUserPlants();
    }
  }, [getUserPlants, currentUser]);

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
    <main className="bgContainer">
      <div className="container-fluid">
        <p className="welcome">Welcome {props.userLoggedIn.name}</p>
        <div className="bigcard card container-fluid">
          <div className="card-header">
            My Plants{" "}
            <button className="btn" onClick={toggleForm}>
              {" "}
              New plant
            </button>
            {togglePlantForm && <CreatePlantFormContainer onAdd={toggleForm} />}
          </div>
          {checkforPlants()}
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.user.loginInfo,
    plants: state.plants.all.rows
  };
}
const mapDispatchToProps = { getUserPlants };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
