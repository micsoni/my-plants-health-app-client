import React, {useEffect} from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserPlants } from "../store/actions/plants";
import UserPlantsCardsList from "./UserPlantsCardsList";

function UserAllPlantsPage(props) {

  useEffect(() => {
    if (props.userLoggedIn.jwt) {
      props.getUserPlants(props.userLoggedIn.id);
    }
  });

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
     {checkforPlants()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.user.loginInfo,
    plants: state.plants.all.rows
  };
}
const mapDispatchToProps = {getUserPlants};

export default connect(mapStateToProps, mapDispatchToProps)(UserAllPlantsPage);
