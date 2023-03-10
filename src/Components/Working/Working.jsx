import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import WorkingCard from "../Working Card/WorkingCard";
import "./Working.css";

export default function Working() {
  const history = useHistory();

  return (
    <div className="working-container">
      <div className="working-holder">
        <div className="working-holder-header">
          <span className="working-primary-heading">Keep Working</span>
          <span
            className="working-secondary-heading"
            onClick={() => {
              history.push("Pending");
            }}
          >
            See All
          </span>
        </div>
        <div className="working-holder-divider"></div>

        <WorkingCard />
      </div>
    </div>
  );
}
