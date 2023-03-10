import React, { useState, useEffect } from "react";
import "./SeeDetails.css";
import {
  AiTwotoneHeart,
  AiOutlinePlus,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import Search from "../Search/Search";
import { MdOutlineStorage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AnswerIdGenerator, IdGenerator } from "../../Helper/IdGenerator";
import { BsCircleFill } from "react-icons/bs";

import {
  addChildAnswer,
  addChildLink,
  addChildQuestion,
  changeAnswerType,
  changeChildAnswerType,
  removeAny,
  removeChildLink,
  removeChildQuestion,
  removedChildAnswer,
} from "../../store/actions/actions";
import { useHistory, useLocation } from "react-router-dom";
import SearchAnswers from "../SearchAnswers/SearchAnswers";
import { types } from "../../Helper/Data";

export default function SeeDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const questions = useSelector((state) => state.Reducer.questions);
  const [items, setItems] = useState([]);
  const selected = useSelector((state) => state.Reducer.selectedQuestion);
  const [createQuestion, setCreateQuestion] = useState("");
  const [data, setData] = useState([]);
  const [ques, setQues] = useState("");
  const [parentIndex, setParentIndex] = useState("");
  const [childIndex, setChildIndex] = useState("");
  const history = useHistory();
  const [answer, setAnswer] = useState("");
  const [modifiedAnswers, setModifiedAnswers] = useState([]);
  const answers = useSelector((state) => state.Reducer.answers);
  const [item, setItem] = useState(null);
  const [answerIndex, setAnswerIndex] = useState("");

  useEffect(() => {
    console.log(location.state); // result: 'some_value'
    if (location.state) {
      setItem(location.state);
    }
  }, [location]);

  //   const handleSelectionMultipleAnswers = async (item) => {
  //     if (
  //       selected[stateIndex].subQuestions[childIndex].answers.some(
  //         (e) => e.id === item.id
  //       )
  //     ) {
  //       console.log("Hello", item);
  //     } else {
  //       console.log("Bye", item, childIndex);
  //       if (selected[stateIndex].subQuestions[childIndex].answers.length < 4) {
  //         console.log("ueeeeee");
  //       }
  //     }
  //   };

  return (
    <div className="child-question-container">
      <div className="child-question-holder">
        {item != undefined ? (
          <>
            <h1 className="question-heading">
              <span style={{ fontWeight: "500" }}>{item.name}</span>
            </h1>
            <div className="see-description">{item.description}</div>

            {Array.isArray(item.questions) && (
              <>
                {item.questions.map((item, index) => {
                  return (
                    <>
                      <div className="question-field">
                        <div className="question-container">
                          <div className="selected-question">
                            <div className="question-one">
                              {/* <MdOutlineStorage className="answer-icon" /> */}

                              {/* <MdOutlineStorage className="answer-icon" /> */}
                              <BsCircleFill className="answer-icon" />

                              <p className="question-text">
                                {item.question_text}
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="answer-type">
                              <p>Answers:</p>
                              <span
                                style={{
                                  color: "#3D6AB8",
                                  fontWeight: "400",
                                  fontSize: 16,
                                }}
                              >
                                {item.answer_type}
                              </span>
                            </div>

                            <p className="add-answer-text">
                              {item.answer_type === "selectall" &&
                              item.answer_type === "multiplechoice" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  onClick={() => {
                                    if (answerIndex === index) {
                                      setParentIndex("");
                                      setAnswerIndex("");
                                    } else {
                                      setAnswerIndex(index);
                                      setParentIndex("");
                                    }
                                  }}
                                >
                                  <AiOutlineArrowDown
                                    className="plus-icon"
                                    style={{ margin: 5 }}
                                  />
                                  {"See Answers"}
                                </div>
                              ) : null}

                              {Array.isArray(item.subquestions).length && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  onClick={() => {
                                    if (parentIndex === index) {
                                      setParentIndex("");
                                    } else {
                                      setParentIndex(index);
                                    }
                                  }}
                                >
                                  <AiOutlineArrowDown
                                    className="plus-icon"
                                    style={{ margin: 5 }}
                                  />{" "}
                                  See Child Questions
                                </div>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      {answerIndex === index && (
                        <>
                          {(item.answers.length > 0 &&
                            item.answer_type === "selectall") ||
                          item.answer_type === "multiplechoice"
                            ? item.answers.map((i) => (
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                  }}
                                >
                                  <div className="answer-hierarchy2"></div>
                                  <div className="type-answer-section2">
                                    <div className="new-answer-container">
                                      <p className="new-answer">Answer:</p>
                                      <input
                                        // disabled
                                        className="answer-input"
                                        type="text"
                                        value={i.answer_text}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))
                            : null}
                        </>
                      )}

                      {parentIndex === index && (
                        <>
                          {Array.isArray(item.subquestions)
                            ? item.subquestions.map((itemChild, indexChild) => {
                                return (
                                  <div style={{ display: "flex" }}>
                                    <div className="answer-hierarchy-child"></div>
                                    <div className="question-field">
                                      <h3>Child Questions:</h3>
                                      <div className="question-container-child">
                                        <div className="selected-question">
                                          <div className="question-one">
                                            {/* <MdOutlineStorage className="answer-icon" /> */}
                                            <BsCircleFill className="answer-icon" />
                                            <p className="question-text">
                                              {itemChild.question_text}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="answer-type-child">
                                          {/* <p>Which answers trigger this question?</p> */}
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <div className="answer-type">
                                              <p>Answers:</p>
                                              <span
                                                style={{
                                                  color: "#3D6AB8",
                                                  fontWeight: "400",
                                                  fontSize: 16,
                                                }}
                                              >
                                                {itemChild.answer_type}
                                              </span>
                                            </div>
                                            {/* <div className="answer-trigger">
                                     {selected[stateIndex] && (
                                       <>
                                         {selected[
                                           stateIndex
                                         ].questionsWithAnswers.map((i) => (
                                           <p
                                             onClick={() => {
                                               //   handleSelectionMultipleTags(
                                               //     i,
                                               //     item
                                               //   );
                                             }}
                                           >
                                             {i.answer}
                                           </p>
                                         ))}
                                       </>
                                     )}
                                   </div> */}
                                            <p
                                              className="add-answer-text"
                                              onClick={() => {
                                                console.log(indexChild, "AAAA");
                                                if (childIndex === indexChild) {
                                                  setChildIndex("");
                                                } else {
                                                  setChildIndex(indexChild);
                                                }
                                              }}
                                            >
                                              <AiOutlineArrowDown className="plus-icon" />{" "}
                                              See Answers
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      {childIndex === indexChild && (
                                        <>
                                          {(itemChild.answers.length > 0 &&
                                            itemChild.answer_type ===
                                              "selectall") ||
                                          itemChild.answer_type ===
                                            "multiplechoice"
                                            ? itemChild.answers.map((i) => (
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    width: "100%",
                                                  }}
                                                >
                                                  <div className="answer-hierarchy2"></div>
                                                  <div className="type-answer-section2">
                                                    <div className="new-answer-container">
                                                      <p className="new-answer">
                                                        Answer:
                                                      </p>
                                                      <input
                                                        // disabled
                                                        className="answer-input"
                                                        type="text"
                                                        value={i.answer_text}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              ))
                                            : null}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                        </>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
