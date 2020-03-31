import React from "react";
import { Link } from "react-router-dom";

export default function UserPlantsCardsList(props) {

  const displayPlants = props.plants.map(plant => {
    const alarms = () => {
      if (plant.alarms.length === 0) {
        return (<div>☐ Alarms</div>)
      }
      return (<div>☑ Alarms</div>)
    }
    
    const notes = () => {
      if (plant.notes.length === 0) {
        return (<div>☐ Notes</div>)
      }
      return (<div>☑ Notes</div>)
    }
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
        </div>
      </div>
    );
  });


  return <div className="row">{displayPlants}</div>;
}
