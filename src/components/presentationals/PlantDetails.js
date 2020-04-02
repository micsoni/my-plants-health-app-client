import React, { useState } from "react";
import { connect } from "react-redux";
import { deletePlant } from "../../store/actions/plants";
import { Link } from "react-router-dom";
import EditPlantFormContainer from "../forms/EditPlantFormContainer";

function PlantDetails(props) {
  const [togglePlantForm, setTogglePlantForm] = useState(false);

  const togglePForm = () => {
    setTogglePlantForm(!togglePlantForm);
  };

  const onDelete = () => {
    props.deletePlant(props.plant.id);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="text-center col-12">
          <img src={props.plant.image} className="img-fluid m-3" alt=" " />
          <h3 className="">{props.plant.name}</h3>
          <p className="text-justify">{props.plant.description}</p>
          <button className="btn " onClick={togglePForm}>
            Edit plant
          </button>
          <Link to="/profile">
            <button className="btn" onClick={onDelete}>
              Delete plant
            </button>
          </Link>
          {togglePlantForm && <EditPlantFormContainer onEdit={togglePForm} />}
        </div>
      </div>
    </div>
  );
}

export default connect(null, { deletePlant })(PlantDetails);
