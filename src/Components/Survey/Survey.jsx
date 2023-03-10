import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SurveyCard from "../Survey Card/SurveyCard";
import "./Survey.css";

export default function () {
  const history = useHistory();
  return (
    <div className="survey-container">
      <div className="survey-holder">
        <div className="survey-holder-header">
          <span className="survey-primary-heading">Available Surveys</span>
          <span
            className="survey-secondary-heading"
            onClick={() => {
              history.push("Available");
            }}
          >
            See All
          </span>
        </div>
        <div className="survey-holder-divider"></div>
        <SurveyCard />
      </div>
    </div>
  );
}
