import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateSurveyCard from "../Create Survey Card/CreateSurveyCard";
import "./CreateSurvey.css";

export default function CreateSurvey() {
  const history = useHistory();

  return (
    <div className="create-survey-container">
      <div className="create-survey-holder">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="create-primary-heading">Create New Survey</span>
          <span
            className="survey-secondary-heading"
            onClick={() => {
              history.push("NoAccount");
            }}
          >
            See All
          </span>
        </div>

        <div className="create-survey-divider"></div>

        <div className="create-card-section">
          <div
            className="create-survey-card"
            onClick={() => {
              history.push("CreateSurvey");
            }}
          >
            <svg
              className="create-survey-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              <path
                id="plus-icon"
                d="M56,68a3.077,3.077,0,0,1-3.077,3.078H39.077V84.924a3.077,3.077,0,0,1-6.154,0V71.078H19.077a3.077,3.077,0,1,1,0-6.154H32.923V51.078a3.077,3.077,0,1,1,6.154,0V64.924H52.923A3.072,3.072,0,0,1,56,68Z"
                transform="translate(-16 -48)"
                fill="#3d6ab8"
              />
            </svg>
          </div>

          <div className="marg-l">
            <CreateSurveyCard />
          </div>
        </div>
      </div>
    </div>
  );
}
