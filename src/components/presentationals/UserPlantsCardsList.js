import React from "react";
import { Link } from "react-router-dom";
import { deletePlant } from "../../store/actions/plants";
import { connect } from "react-redux";

function UserPlantsCardsList(props) {
  const onDelete = id => {
    props.deletePlant(id);
  };

  const displayPlants = props.plants.map(plant => {
    const alarms = () => {
      if (plant.alarms.length === 0) {
        return <div>☐ Alarms</div>;
      }
      return <div>☑ Alarms</div>;
    };

    const notes = () => {
      if (plant.notes.length === 0) {
        return <div>☐ Notes</div>;
      }
      return <div>☑ Notes</div>;
    };
    return (
      <div className="plantCard col-lg-2 col-md-3 col-6" key={plant.id}>
        <div className="card shadow-sm h-100">
          <img src={plant.image} className="card-img-top" alt="" />
          <div className="plantCardBody card-body">
            <h5 className="card-title">{plant.name}</h5>
            {alarms()}
            {notes()}
          </div>
          <Link to={`/plants/${plant.id}`} className="btn">
            See Details
          </Link>
          <button
            className="btn"
            onClick={() => {
              onDelete(plant.id);
            }}
          >
            {" "}
            Delete plant
          </button>
        </div>
      </div>
    );
  });

  return <div className="row">{displayPlants}</div>;
}

const mapDispatchToProps = {
  deletePlant
};

export default connect(null, mapDispatchToProps)(UserPlantsCardsList);
