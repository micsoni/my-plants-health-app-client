import React from "react";
import { Link } from "react-router-dom";

export default function UserPlantsCardsList(props) {

  const changeCss = () => {
   const grid = props.container === "profilePage"? "col-lg-3 col-md-6 col-12": "col-lg-2 col-md-3 col-6"
    return grid
  }

  const displayPlants = props.plants.map(plant => {
    return (
      <div className={`plantCard ${changeCss()}`} key={plant.id}>
        <div className="card shadow-sm h-100">
          <img src={plant.image} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{plant.name}</h5>
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
