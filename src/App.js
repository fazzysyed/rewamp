import React, { useEffect } from "react";
import { useLocation, Switch, HashRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SurveyLayout from "./Components/SurveyLayout";
import CreateSurveyLayout from "./Components/CreateSurveyLayout";
import QuestionsLayout from "./Components/QuestionsLayout";
import ChildQuestionLayout from "./Components/ChildQuestionLayout";
import AvailableSurveys from "./Components/Survey Card/ViewAllAvailable";
import PendingSurveys from "./Components/Working Card/ViewAllPending";
import SeeDetails from "./Components/SeeDetails/SeeDetails";
import SurveyPreview from "./Components/SurveyPreview/SurveyPreview";
import LiveSurveyPreview from "./Components/SurveyPreview/LiveSurveyPreview";
import NoAccount from "./Components/Create Survey Card/NoAccountAndDelete";
import { useDispatch } from "react-redux";
import {
  getAllAccounts,
  getAllAnswers,
  getAllCategories,
  getAllQuestions,
  getAllSurveys,
} from "./store/actions/actions";
import { BrowserRouter } from "react-router-dom";
import { ALLIMAGES } from "./Components/Preview/Preview Components/Icons";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccounts());
    dispatch(getAllCategories());
    dispatch(getAllSurveys());
  }, []);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image);
          }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(ALLIMAGES.map((image) => loadImage(image)));
  }, []);
  return (
    <>
      <Header />

      <HashRouter>
        <Route exact path="/" component={SurveyLayout} />
        <Route exact path="/Available" component={AvailableSurveys} />
        <Route exact path="/Pending" component={PendingSurveys} />
        <Route exact path="/SeeDetails" component={SeeDetails} />
        <Route exact path="/NoAccount" component={NoAccount} />

        <Route exact path="/CreateSurvey" component={CreateSurveyLayout} />
        <Route exact path="/AddQuestions" component={QuestionsLayout} />
        <Route path="/ChildQuestionLayout" component={ChildQuestionLayout} />
        <Route path="/SurveyPreview" component={SurveyPreview} />
        <Route path="/LiveSurveyPreview" component={LiveSurveyPreview} />
      </HashRouter>
    </>
  );
}

export default App;
