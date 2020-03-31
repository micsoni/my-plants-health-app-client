import React, {useState} from "react";
import {connect} from "react-redux"
import {deletePlant} from "../store/actions/plants"
import EditPlantFormContainer from "./EditPlantFormContainer"

function PlantDetails(props) {
  const [togglePlantForm, setTogglePlantForm] = useState(false);

  const togglePForm = () => {
    setTogglePlantForm(!togglePlantForm);
  };
  
  const onDelete = event => {
    event.preventDefault();
    props.deletePlant(props.plant.id);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <img src={props.plant.image} className="img-fluid" alt=" " />
          <h3 className="card-title">{props.plant.name}</h3>
          <p className="card-text">{props.plant.description}</p>
          <button className="btn " onClick={togglePForm}>
            Edit plant
          </button> <button className="btn " onClick={onDelete}>
           Delete plant
          </button>
          {togglePlantForm && <EditPlantFormContainer />}
        </div>
      </div>
    </div>
  );
}

export default connect(null, {deletePlant})(PlantDetails);

