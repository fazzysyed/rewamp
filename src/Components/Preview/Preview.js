import React, { useState, useEffect } from "react";
import Survey from "./survey";
import Single from "./Preview Components/Single";
import TakeSurvey from "./Preview Components/TakeSurvey";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";
import SurveyFooter from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  activeRouteHandler,
  getAllSurveys,
  publishSurveyTemplate,
  updateSurvey,
} from "../../store/actions/actions";
import { IoIosArrowForward } from "react-icons/io";

import { useHistory, useLocation } from "react-router-dom";

function App() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <>
      <Survey />
      <SurveyFooter
        previous={() => {
          history.goBack();

          // history.goBack();
          // dispatch(activeRouteHandler("publish"));
        }}
        publish={() => {
          dispatch(updateSurvey("active")).then((response) => {
            console.log(response);
            dispatch(getAllSurveys());
            alert("Done");
          });
        }}
      />
    </>
  );
}

export default App;
