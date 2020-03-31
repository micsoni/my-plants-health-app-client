import React, { useState } from "react";
import {connect} from "react-redux"
import PlantForm from "./PlantForm";
import {editPlant} from "../store/actions/plants"
import "../style/Forms.css";

function EditPlantFormContainer(props) {
  const [plant, setPlant] = useState({
    name: props.plant.name,
    image:  props.plant.image,
    description: props.plant.description
  });

  const onSubmit = event => {
    event.preventDefault();
    console.log(plant)
    props.editPlant(props.plant.id,{name:plant.name, image:plant.image, description:plant.description})
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
        <p className="text-center">Edit information </p>
        <PlantForm
          onSubmit={onSubmit}
          onChange={onChange}
          values={plant}
          checkUploadResults={checkUploadResults}
          button={"Update Plant"}
        />
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return { userLoggedIn: state.user.loginInfo,
  plant: state.plants.current };
}

export default connect(mapStateToProps, { editPlant })(EditPlantFormContainer);
