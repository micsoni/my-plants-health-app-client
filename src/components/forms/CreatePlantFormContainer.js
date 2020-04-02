import React, { useState } from "react";
import { connect } from "react-redux";
import PlantForm from "./PlantForm";
import { createPlant, getUserPlants } from "../../store/actions/plants";
import "../../style/Forms.css";

function CreatePlantFormContainer(props) {
  const [plant, setPlant] = useState({
    name: "",
    image: "",
    description: ""
  });

  const [disabled, setDisabled] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    props
      .createPlant({
        name: plant.name,
        image: plant.image,
        description: plant.description
      })
      .then(() => props.getUserPlants())
      .then(props.onAdd);
  };

  const onChange = event => {
    setPlant({
      ...plant,
      [event.target.name]: event.target.value
    });
  };

  const checkUploadResults = resultEvent => {
    if (resultEvent.event === "success") {
      setPlant({ ...plant, image: resultEvent.info.secure_url });
      setDisabled(true);
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
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { userLoggedIn: state.user.loginInfo };
}

export default connect(mapStateToProps, { createPlant, getUserPlants })(
  CreatePlantFormContainer
);
