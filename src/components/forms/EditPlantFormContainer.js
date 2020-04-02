import React, { useState } from "react";
import { connect } from "react-redux";
import PlantForm from "./PlantForm";
import { editPlant } from "../../store/actions/plants";
import "../../style/Forms.css";

function EditPlantFormContainer(props) {
  const [plant, setPlant] = useState({
    name: props.plant.name,
    image: props.plant.image,
    description: props.plant.description
  });

  const [disabled, setDisabled] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    props
      .editPlant(props.plant.id, {
        name: plant.name,
        image: plant.image,
        description: plant.description
      })
      .then(props.onEdit);
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
        <p className="text-center">Edit information </p>
        <PlantForm
          onSubmit={onSubmit}
          onChange={onChange}
          values={plant}
          checkUploadResults={checkUploadResults}
          button={"Update Plant"}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { userLoggedIn: state.user.loginInfo, plant: state.plants.current };
}

export default connect(mapStateToProps, { editPlant })(EditPlantFormContainer);
