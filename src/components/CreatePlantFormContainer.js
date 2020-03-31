import React, { useState } from "react";
import {connect} from "react-redux"
import PlantForm from "./PlantForm";
import {createPlant, getUserPlants} from "../store/actions/plants"
import "../style/Forms.css";

function CreatePlantFormContainer(props) {
  const [plant, setPlant] = useState({
    name: "",
    image: "",
    description:""
  });

  const onSubmit = event => {
    event.preventDefault();
    console.log(plant)
    props.createPlant({name:plant.name, image:plant.image, description:plant.description}).then(getUserPlants(props.userLoggedIn.id))
  };

  const onChange = event => {
    console.log(event.target.name, event.target.value, plant)
    setPlant({
      ...plant,
      [event.target.name]: event.target.value
    });
  };

  const checkUploadResults = resultEvent => {
    if (resultEvent.event === "success") {
      setPlant({ ...plant, image: resultEvent.info.secure_url });
    }
  };
  return (
    <div className="form ">
      <div className="card shadow-sm">
        <p className="text-center">Add a new plant </p>
        <PlantForm
          onSubmit={onSubmit}
          onChange={onChange}
          values={plant}
          checkUploadResults={checkUploadResults}
          button={"Add new plant"}
        />
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return { userLoggedIn: state.user.loginInfo };
}

export default connect(mapStateToProps, { createPlant, getUserPlants })(CreatePlantFormContainer);

