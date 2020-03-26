import React from 'react'
import { Link } from "react-router-dom";

export default function UserPlantsCardsList(props) {
  const displayPlants = props.plants.map(plant => {
    return (
      <div className="col-md-6 col-12" key={plant.id}>
        <div className="card shadow-sm">
          {/* <img src={plant.pictureUrl} className="card-img-top" alt=" " /> */}
          <div className="card-body">
            <h5 className="card-title">{plant.name}</h5>
            <Link to={`/plants/${plant.id}`} className="btn">
              See Details
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (<div className="row">{displayPlants}</div>)
}
