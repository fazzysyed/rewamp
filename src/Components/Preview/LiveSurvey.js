import React, { useEffect, useState } from "react";

import FacesAnswers from "./Preview Components/FacesAnswers";
import YesorNoAnswers from "./Preview Components/YesNoAnswers";
import ThumbsAnswers from "./Preview Components/ThumbsAnswers";
import MultipleChoice from "./Preview Components/Answer";
import HeartsAnswers from "./Preview Components/HeartsAnswers";
import StarsAnswers from "./Preview Components/StarsAnswer";
import LikertsAnswers from "./Preview Components/LikertAnswers";
import Suggestion from "./Preview Components/Suggestion";
import Feedback from "./Preview Components/Feedback";
import Single from "./Preview Components/Single";
import Button from "./Preview Components/Button";
import { FaWindowClose } from "react-icons/fa";

import { v4 as Uuid } from "uuid";

import {
  facesAnswerType,
  YesorNoAnswerTpes,
  thumbsAnswerTpes,
  HeartsAnswersTypes,
  LikertAnswerTypes,
  StarsAnswersTypes,
} from "./Preview Helper/AnswersType";
import "./style.css";
import "./Responsive.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Survey = () => {
  const history = useHistory();
  const location = useLocation();
  const [survey, setSurvey] = useState("");
  const [feedback_text, setFeedbackText] = useState("");
  const [minimize, setMinimize] = useState(false);
  const [facesAnswer, setFaceAnswer] = useState(null);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [highValue, setHighValue] = useState(null);
  const [surveyNumber, setSurveyNumber] = useState(0);
  const [progress, setProgress] = useState(0);
  const [surveyLength, setSurveyLength] = useState(0);
  const [surveyVisible, setSurveyVisible] = useState(true);
  const [multiple, setMultiple] = useState([]);

  const seletectArray = useSelector((state) => state.Reducer.selectedQuestion);
  const dispatch = useDispatch();

  useEffect(() => {
    setSurveyVisible(true);
    setData(location.state.questions);
    console.log("RETETETETE", location.state);
    setSurveyLength(location.state.questions.length);
  }, []);

  const previous = (value, index) => {
    let high = data[index - 1].answerWithId;
    console.log(high, "Ground");
    setHighValue(high);
    setFaceAnswer(high);

    if (value.parent_question_id != undefined) {
      var removeIndex2 = data
        .map(function (item) {
          return item.id;
        })
        .indexOf(value.id);

      data.splice(removeIndex2, 1);
    }

    // remove object
    console.log("New state", data);
    if (index != 0) {
      setIndex(index - 1);
    }
    if (value.parent_question_id === undefined) {
      setSurveyNumber(surveyNumber - 1);
      setProgress(progress - 1 / surveyLength);
    }
  };
  // const next = (value, index) => {
  //   let length2 = data.length;
  //   if (facesAnswer != null) {
  //     if (value. subquestions != undefined) {
  //       console.log("FFFF");

  //       value. subquestions.map((it) => {
  //         const found = data.some((el) => el.question_ref === it.question_ref);

  //         if (!found) {
  //           data.splice(index + 1, 0, it);
  //         }
  //       });
  //     }
  //     if (value. subquestions === undefined || length2 === data.length) {
  //       console.log("no Sub Question GGG");
  //       setSurveyNumber(surveyNumber + 1);
  //       setProgress(progress);
  //       setIndex(index + 1);
  //     }
  //   }
  //   if (index != data.length - 1) {
  //     console.log("GGGAFfafafafaf", facesAnswer);

  //     if (facesAnswer.length) {
  //       facesAnswer.map((item) => {
  //         console.log(item, "GGGAFfafafafaf");
  //         value. subquestions.map((it) => {
  //           const found = data.some(
  //             (el) => el.question_ref === it.question_ref
  //           );

  //           it.parent_question_id = value.parent_ref;

  //           if (!found) {
  //             data.splice(index + 1, 0, it);
  //           }
  //         });
  //       });
  //     }
  //   }

  //   if (index === data.length - 1) {
  //     if (facesAnswer.length) {
  //       console.log("GGGFSFSAF", facesAnswer);

  //       if (value. subquestions != undefined) {
  //         value. subquestions.map((it) => {
  //           const found = data.some(
  //             (el) => el.question_ref === it.question_ref
  //           );

  //           it.parent_ref = value.question_ref;

  //           if (!found) {
  //             data.splice(index + 1, 0, it);
  //           }
  //         });
  //       }
  //     } else {
  //       setSurveyVisible(false);
  //     }
  //   }
  // };

  const next = (value, index) => {
    setHighValue(null);
    console.log("Value", value, facesAnswer != null);
    setHighValue(value);

    let length2 = data.length;
    if (facesAnswer != null) {
      console.log(facesAnswer, "FacesAnswers");

      if (value.subquestions != undefined) {
        console.log(facesAnswer, "FacesAnswers");

        value.subquestions.map((it) => {
          const found = data.some((el) => el.id === it.id);
          it.parent_question_id = value.id;

          if (!found) {
            console.log("Yes");
            if (
              it.answer_link_id.includes(facesAnswer.id) ||
              it.answer_link_id.includes("any")
            ) {
              console.log(it.answer_link_id, "KKKKK");
              data.splice(index + 1, 0, it);
            } else if (it.answer_link_id.includes(0)) {
              data.splice(index + 1, 0, it);
            }
          }
        });
      }

      if (value.subquestions === undefined || length2 === data.length) {
        setSurveyNumber(surveyNumber + 1);
        setProgress(progress + 1 / surveyLength);
      }
    }
    if (index != data.length - 1) {
      data[index].answerWithId = facesAnswer;
      setIndex(index + 1);
      setFaceAnswer(null);
      setMultiple([]);

      if (data[index + 1].answerWithId === undefined) {
        setFaceAnswer(null);
      }

      if (facesAnswer.length != null || facesAnswer.length != undefined) {
        facesAnswer.map((item) => {
          if (value.subquestions != null) {
            value.subquestions.map((it) => {
              const found = data.some(
                (el) => el.question_id === it.question_id
              );
              it.parent_question_id = value.question_id;

              if (!found) {
                if (
                  it.answer_link_id.includes(item.id) ||
                  it.answer_link_id.includes("any")
                ) {
                  data.splice(index + 1, 0, it);
                } else if (it.answer_link_id.includes(0)) {
                  data.splice(index + 1, 0, it);
                }
              }
            });
          }
        });
        if (value.subquestions === undefined || length2 === data.length) {
          setSurveyNumber(surveyNumber);
          setProgress(progress + 1 / surveyLength);
        }
        let parentId = value.parent_question_id ? value.parent_question_id : 0;

        setIndex(index + 1);
      }
    }

    if (index === data.length - 1) {
      data[index].answerWithId = facesAnswer;
      if (facesAnswer != null && facesAnswer.length !== undefined) {
        console.log("facesAnswers", facesAnswer);
        facesAnswer.map((item) => {
          if (value.subquestions != undefined) {
            value.subquestions.map((it) => {
              const found = data.some(
                (el) => el.question_id === it.question_id
              );
              it.parent_question_id = value.question_id;

              if (!found) {
                if (
                  it.answer_link_id.includes(item.id) ||
                  it.answer_link_id.includes("any")
                ) {
                  data.splice(index + 1, 0, it);
                } else if (it.answer_link_id.includes(0)) {
                  data.splice(index + 1, 0, it);
                }
              }
            });
          }
        });
      }
      //   uploadResponse();
      setSurveyVisible(false);
    }
  };

  return (
    <div className={minimize ? null : "survey-bgPreview "}>
      <div className="card-toshow">
        <div className={minimize ? "main-box-tabPreview" : "main-boxPreview"}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p className="censuable-widget-tab"></p>
            <div>
              <FaWindowClose
                style={{
                  height: 30,
                  width: 30,
                  cursor: "pointer",

                  color: "#8e8e8e",
                }}
                onClick={() => {
                  history.goBack();
                }}
                // onClick={this.props.close}
              />
            </div>
          </div>
          <>
            {surveyVisible ? (
              <>
                <p
                  className={
                    minimize
                      ? "question-number-tabPreview"
                      : "question-numberPreview"
                  }
                >
                  {" "}
                  {surveyNumber + 1} of {surveyLength}
                </p>
                <div>
                  <ul id="cen_progressbar" className="survey-stepingPreview">
                    <li
                      id="cen_progress_li "
                      className="active"
                      style={{
                        width: `100%`,
                      }}
                    ></li>
                  </ul>
                </div>

                {/* <p className="question-text">Q: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                     the industry's standard dummy text ever since the 1500s, when an unknown printer</p> */}
                {/* <MultipleChoice value  answerTypes={[{answer_id:1,answer :"fafhajfhajfhajf"},{answer_id:2,answer :"fafhajfhajfhajf"},{answer_id:3,answer :"fafhajfhajfhajf"},{answer_id:4,answer :"fafhajfhajfhajf"}]} onPress={()=>console.log("afajfg")}/> */}
                {data.map((item, i) => {
                  if (i === index) {
                    return (
                      <div key={i}>
                        <h3
                          className={
                            minimize
                              ? "question-text-tabPreview"
                              : "question-textPreview"
                          }
                        >
                          {" "}
                          {item.question_text}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 20,
                          }}
                        >
                          {item.answer_type === "faces" ? (
                            <FacesAnswers
                              minimize={minimize}
                              answerTypes={facesAnswerType}
                              value={highValue ? highValue.id : null}
                              onPress={(value) => {
                                let newAnswer = item.answers.filter(
                                  (data) => data.answer_id === value.id
                                );
                                setFaceAnswer(newAnswer[0]);
                              }}
                            />
                          ) : (
                            [
                              item.answer_type === "selectall" ? (
                                <MultipleChoice
                                  selectedIds={multiple}
                                  minimize={minimize}
                                  answerTypes={item.answers}
                                  value={highValue ? highValue : null}
                                  // onPress={(item) => {
                                  //   let newFF = [...multiple];
                                  //   let foundR = newFF.some(
                                  //     (el) => el.id === item.id
                                  //   );
                                  //   if (!foundR) {
                                  //     newFF.push(item);
                                  //     setFaceAnswer(newFF);
                                  //   }
                                  // }}
                                  onPress={(item, i) => {
                                    let foundR = multiple.some(
                                      (el) => el.id === item.id
                                    );
                                    if (!foundR) {
                                      multiple.push(item);
                                      console.log("Answers Done", multiple);
                                      setFaceAnswer(multiple);
                                    } else {
                                      // let newArray = [...this.state.multiple];
                                      console.log("Hello");
                                      setMultiple(
                                        multiple.filter((r) => r.id != item.id)
                                      );
                                      setFaceAnswer(
                                        multiple.filter((r) => r.id != item.id)
                                      );
                                    }
                                  }}
                                />
                              ) : (
                                [
                                  item.answer_type === "hearts" ? (
                                    <HeartsAnswers
                                      minimize={minimize}
                                      answerTypes={HeartsAnswersTypes}
                                      value={highValue ? highValue.id : null}
                                      onPress={(value) => {
                                        let newAnswer = item.answers.filter(
                                          (data) => data.answer_id === value.id
                                        );
                                        setFaceAnswer(newAnswer[0]);
                                      }}
                                    />
                                  ) : (
                                    [
                                      item.answer_type === "stars" ? (
                                        <StarsAnswers
                                          minimize={minimize}
                                          answerTypes={StarsAnswersTypes}
                                          value={
                                            highValue ? highValue.id : null
                                          }
                                          onPress={(value) => {
                                            let newAnswer = item.answers.filter(
                                              (data) =>
                                                data.answer_id === value.id
                                            );
                                            setFaceAnswer(newAnswer[0]);
                                          }}
                                        />
                                      ) : (
                                        [
                                          item.answer_type === "yesno" ? (
                                            <YesorNoAnswers
                                              minimize={minimize}
                                              value={
                                                highValue ? highValue.id : null
                                              }
                                              answerTypes={YesorNoAnswerTpes}
                                              onPress={(value) => {
                                                let newAnswer =
                                                  item.answers.filter(
                                                    (data) =>
                                                      data.answer_id ===
                                                      value.id
                                                  );
                                                console.log(
                                                  newAnswer,
                                                  "newAnswer"
                                                );
                                                setFaceAnswer(newAnswer[0]);
                                              }}
                                            />
                                          ) : (
                                            [
                                              item.answer_type ===
                                              "multiplechoice" ? (
                                                <Single
                                                  answerTypes={item.answers}
                                                  onPress={(item) => {
                                                    console.log(
                                                      item,
                                                      "Answers Single"
                                                    );
                                                    setFaceAnswer(item);
                                                    //   setState({
                                                    //   facesAnswer: item,
                                                    // });
                                                  }}
                                                />
                                              ) : (
                                                [
                                                  item.answer_type ===
                                                  "thumbs" ? (
                                                    <ThumbsAnswers
                                                      minimize={minimize}
                                                      value={
                                                        highValue
                                                          ? highValue.id
                                                          : null
                                                      }
                                                      answerTypes={
                                                        thumbsAnswerTpes
                                                      }
                                                      onPress={(value) => {
                                                        console.log(
                                                          item.answers
                                                        );
                                                        let newAnswer =
                                                          item.answers.filter(
                                                            (data) =>
                                                              data.answer_id ===
                                                              String(value.id)
                                                          );
                                                        console.log(
                                                          String(value.id),
                                                          "newAnswer"
                                                        );
                                                        setFaceAnswer(
                                                          newAnswer[0]
                                                        );
                                                      }}
                                                    />
                                                  ) : (
                                                    [
                                                      item.answer_type ===
                                                      "likert" ? (
                                                        <LikertsAnswers
                                                          minimize={minimize}
                                                          value={
                                                            highValue
                                                              ? highValue.id
                                                              : null
                                                          }
                                                          onPress={(value) => {
                                                            let newAnswer =
                                                              item.answers.filter(
                                                                (data) =>
                                                                  data.answer_id ===
                                                                  value.id
                                                              );
                                                            console.log(
                                                              newAnswer,
                                                              "newAnswer"
                                                            );
                                                            setFaceAnswer(
                                                              newAnswer[0]
                                                            );
                                                          }}
                                                          answerTypes={
                                                            LikertAnswerTypes
                                                          }
                                                        />
                                                      ) : (
                                                        <Suggestion
                                                          minimize={minimize}
                                                          value={
                                                            highValue
                                                              ? highValue.answer_text
                                                              : "type your feedback"
                                                          }
                                                          onChangeText={(
                                                            event
                                                          ) =>
                                                            setFaceAnswer({
                                                              answer_id: 25,
                                                              answer_text:
                                                                event.target
                                                                  .value,
                                                            })
                                                          }
                                                        />
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ]
                          )}
                        </div>

                        <div
                          style={{
                            // justifyContent: 'center',
                            height: "10%",
                          }}
                        >
                          {index === 0 ? (
                            <div
                              style={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                className={
                                  minimize
                                    ? "next-btn-tabPreview"
                                    : "next-btn2Preview"
                                }
                                variant="contained"
                                color="primary"
                                disabled={
                                  facesAnswer === null ||
                                  Array.isArray(facesAnswer).length === 0
                                    ? true
                                    : false
                                }
                                //   title="Next"
                                onClick={() => next(item, index)}
                                //   backgroundColor={
                                //       facesAnswer === null
                                //       ? 'grey'
                                //       : '#114B78'
                                //   }
                                title="Next"
                              />
                            </div>
                          ) : i != 0 && index < data.length ? (
                            <div
                              style={{
                                justifyContent: "space-between",
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Button
                                className={
                                  minimize
                                    ? "next-btn-tabPreview"
                                    : "next-btn2Preview"
                                }
                                variant="contained"
                                color="primary"
                                backgroundColor="#114B78"
                                title="Previous"
                                onClick={() => previous(item, index)}
                              />

                              <Button
                                className={
                                  minimize
                                    ? "next-btn-tabPreview"
                                    : "next-btn2Preview"
                                }
                                disabled={
                                  facesAnswer === null ||
                                  Array.isArray(facesAnswer).length === 0
                                    ? true
                                    : false
                                }
                                onClick={() => next(item, index)}
                                Next
                                title={"Next"}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  }
                })}
              </>
            ) : (
              <Feedback minimize={minimize} value={feedback_text} />
            )}
          </>
        </div>
        {/* <div className="child-btn-container">
          <button
            className="question-prev-btn"
            onClick={() => history.goBack()}
          >
            Previous
          </button>
          <button
            className="question-next-btn"
            onClick={() => {
              history.push("/SurveyPreview");
            }}
          >
            Continue
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Survey;
