import React, { useEffect, useState } from "react";
import "./AddQuestion.css";
import {
  AiTwotoneHeart,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineSortAscending,
  AiFillCheckCircle,
  AiOutlineBars,
} from "react-icons/ai";
import {} from "react-icons/";
import { MdOutlineStorage } from "react-icons/md";
import {
  BsCircleFill,
  BsEmojiSmileFill,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import { AnswerIdGenerator, IdGenerator } from "../../Helper/IdGenerator";
import { useDispatch, useSelector } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchAnswers from "../SearchAnswers/SearchAnswers";
import Search from "../Search/Search";
import axios from "axios";
import {
  addAnswerParent,
  addQuestion,
  removeAnswerParent,
  RemoveQuestion,
  UpdateQuestion,
  changeAnswerType,
  updateSurvey,
  changeSelectedQuestions,
  changeSurveyUuid,
  createSurvey,
  createQuestion,
  getAllQuestions,
  createAnswer,
  addEmptyAnswer,
} from "../../store/actions/actions";

import { useHistory } from "react-router-dom";
import { status, types } from "../../Helper/Data";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../QuestionSearchBar/QuestionSearchBar";
import SearchBarAnswer from "../SearchBar/SearchBar";

export default function AddQuestion() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const selected = useSelector((state) => state.Reducer.selectedQuestion);
  const categories = useSelector((state) => state.Reducer.categories);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const answers = useSelector((state) => state.Reducer.answers);
  const [selectedCat, setSelectedCat] = useState([]);
  const [stateIndex, setIndex] = useState(0);
  const [modifiedAnswers, setModifiedAnswers] = useState([]);
  const [answertoset, setAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");
  const questions = useSelector((state) => state.Reducer.questions);
  const [items, setItems] = useState([]);
  const [ques, setQues] = useState("");
  const [showAddAnswer, setShowAddAnswer] = useState(false);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchAnswerValue, setSearchAnswerValue] = useState("");
  const [isFocused, setIsFocused] = useState("");

  useEffect(() => {}, []);

  useEffect(() => {
    let newArray = [];
    questions.map((i) => {
      newArray.push({
        ...i,
        name: i.question_text,
        icon: "",
      });
    });
    console.log(newArray, "Questions");
    setItems(newArray);
  }, [questions]);

  useEffect(() => {
    let newArray2 = [];
    answers.map((i) => {
      newArray2.push({
        ...i,
        name: i.answer,
        icon: "",
      });
    });
    console.log(newArray2, "TEst");
    setModifiedAnswers(newArray2);
  }, [answers]);

  const handleCatSelection = (item) => {
    let cat = [...selectedCat];

    if (cat.includes(item.id)) {
      cat.filter((i) => i != item.id);
      setSelectedCat(cat);
    } else {
      cat.push(item.id);
      console.log(cat, "FAzzy");
      setSelectedCat(cat);
    }
  };

  const handleSearch = () => {
    let searchSelect = searchAnswerValue;
  };

  const handleSelectionMultiple = async (item) => {
    if (item) {
      if (selected) {
        setSearchValue("");

        if (selected.some((e) => e.id === item.id)) {
          dispatch(RemoveQuestion(item.id));
          dispatch(UpdateQuestion(item.id));
        } else {
          // stateIndexss.push(item.id);
          setSearchValue("");

          item.subquestions = [];
          item.answers = [];
          item.question_id = item.id;

          dispatch(addQuestion(item));
        }
      }
    } else {
      var data = JSON.stringify({
        question_text: searchValue,
        status: "active",
      });

      dispatch(
        createQuestion({
          question_text: searchValue,
          status: "active",
        })
      ).then((res) => {
        console.log(res);
        alert("Done");
      });
    }

    // setstateIndexs(stateIndexss);
  };

  const handleOnSearch = (string, results) => {
    console.log(string, "FAFAFAFARRRREEEE");
    setSearchValue(string);

    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results);
    // if (results.length === 0) {

    // } else {
    // setShowAddQuestion(false);
    // }
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    setQues(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleSelectionMultipleAnswers = async (item, answer) => {
    console.log(item, answer);

    if (selected[stateIndex].answers.length <= 4) {
      addAnswer(item, answer);

      setSearchAnswerValue("");
      // if (selected[stateIndex].answers.some((e) => e.id === item.id)) {
      //   // data.unshift(item);

      //   removeAnswer(item);
      // } else {

      //     // setData(newArray);
      //   }
    }
  };

  const addAnswer = (item, answer) => {
    //   item.answer_ref = AnswerIdGenerator()
    let newItem = {
      parentId: answer.id,
      id: item.id,
      answer_text: answertoset.answer,
      answer_ref: item.answer_ref,
    };
    console.log(newItem, "Alert");

    dispatch(
      addAnswerParent({
        parentId: answer.id,
        id: item.id,
        answer_text: answertoset.answer,
        answer_ref: item.answer_ref,
      })
    );
  };
  const removeAnswer = (item) => {
    dispatch(
      removeAnswerParent({
        parentId: selected[stateIndex].id,
        childId: item.id,
      })
    );
  };

  const handleOnSearchAnswer = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
    setSearchAnswerValue(string);
  };

  const handleOnHoverAnswer = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelectAnswer = (item) => {};

  const handleOnFocusAnswer = (item) => {
    console.log("Focused", item);
  };

  const formatResult = (item) => {
    console.log(item, "AAAAA");
    return (
      <>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <img style={{ marginRight: "1.5rem" }} src={item.icon} />
          <span className="suggestion-text">{item.name}</span>
        </div>
      </>
    );
  };

  return (
    <div className="add-question-container">
      <div className="question-holder">
        <h1 className="question-heading">
          Step 2: <span style={{ fontWeight: "500" }}>Let's Add Questions</span>
        </h1>

        <div className="question-field">
          <h3>Your Questions</h3>
          {selected && (
            <>
              {selected.map((item, index) => {
                if (
                  item.answer_type === "selectall" ||
                  item.answer_type === "multiplechoice"
                ) {
                  return (
                    <>
                      <div className="answer-container">
                        <div className="selected-question">
                          <div className="question-one">
                            {/* <MdOutlineStorage className="answer-icon" /> */}
                            {item.answer_type === "selectall" && (
                              <AiOutlineBars
                                className="heart-icon"
                                color="#1c3b71"
                              />
                            )}
                            {item.answer_type === "multiplechoice" && (
                              <AiOutlineBars
                                className="heart-icon"
                                color="#1c3b71"
                              />
                            )}

                            <p className="question-text">
                              {item.question_text}
                            </p>
                          </div>
                        </div>
                        <div className="add-answer-type">
                          <p className="multiple-choice">
                            Answers Type:{" "}
                            <select
                              className="survey-type-select"
                              value={item.answer_type}
                              onChange={(event) => {
                                dispatch(
                                  changeAnswerType({
                                    id: item.id,
                                    answer_type: event.target.value,
                                  })
                                );
                              }}
                            >
                              {types.map((item) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </select>
                          </p>
                          {item.answers.length != 4 && (
                            <p
                              className="add-answer-text"
                              onClick={() => {
                                dispatch(
                                  addEmptyAnswer({
                                    id: item.id,
                                  })
                                );
                              }}
                            >
                              <AiOutlinePlus className="plus-icon" /> Add Answer
                            </p>
                          )}
                        </div>
                      </div>

                      {item.answers.length > 0
                        ? item.answers.map((i) => (
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                              }}
                            >
                              <div className="answer-hierarchy2"></div>

                              {i.answer_text.length ? (
                                <div className="type-answer-section2">
                                  <div className="new-answer-container">
                                    <p className="new-answer">Answer:</p>
                                    <input
                                      // disabled
                                      className="answer-input"
                                      type="text"
                                      placeholder="Type your answer"
                                      value={i.answer_text}
                                      onChange={(e) =>
                                        setSecondAnswer(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div style={{ display: "flex", width: "90%" }}>
                                  <>
                                    <div
                                      style={{
                                        width: "100%",
                                        position: "relative",
                                      }}
                                    >
                                      <SearchBarAnswer
                                        addAnswerHandler={() => {
                                          handleSelectionMultipleAnswers(
                                            i,
                                            item
                                          );
                                        }}
                                        handlerClick={(value) => {
                                          setAnswer(value);
                                        }}
                                        data={answers}
                                        placeholder={"Type answer"}
                                      />
                                    </div>
                                  </>
                                </div>
                              )}
                            </div>
                          ))
                        : null}
                    </>
                  );
                } else {
                  return (
                    <div className="question-container">
                      <div className="selected-question">
                        <div className="question-one">
                          {item.answer_type === "hearts" && (
                            <AiTwotoneHeart
                              className="heart-icon"
                              color="red"
                            />
                          )}
                          {item.answer_type === "yesno" && (
                            <AiFillCheckCircle
                              className="heart-icon"
                              color="green"
                            />
                          )}

                          {item.answer_type === "stars" && (
                            <AiFillStar
                              className="heart-icon"
                              color="#FFD700"
                            />
                          )}
                          {item.answer_type === "likert" && (
                            <AiOutlineSortAscending
                              className="heart-icon"
                              color="#1c3b71"
                            />
                          )}
                          {item.answer_type === "faces" && (
                            <BsEmojiSmileFill
                              className="heart-icon"
                              color="#FFD700"
                            />
                          )}
                          {item.answer_type === "thumbs" && (
                            <BsHandThumbsUpFill
                              className="heart-icon"
                              color="#FFD700"
                            />
                          )}
                          {item.answer_type === "" && (
                            <BsCircleFill className="answer-icon" />
                          )}
                          <p className="question-text">{item.question_text}</p>
                        </div>
                      </div>
                      <div className="answer-type">
                        <p>Answers:</p>

                        <select
                          placeholder="select type"
                          className="survey-type-select"
                          value={item.answer_type}
                          onChange={(event) => {
                            dispatch(
                              changeAnswerType({
                                id: item.id,
                                answer_type: event.target.value,
                              })
                            );
                          }}
                        >
                          <option disabled value={""}>
                            {"select"}
                          </option>

                          {types.map((item) => (
                            <option value={item.id}>{item.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                }
              })}
            </>
          )}
        </div>

        <div>
          <SearchBar
            placeholder={"Type Question"}
            data={questions}
            addQuestionHandler={() => {
              handleSelectionMultiple(ques);
            }}
            handlerClick={(value) => {
              setQues(value);
            }}
          />
          {/* <Search
            search={searchValue}
            id="fazzy"
            types={types}
            status={status}
            isOpen={showAddQuestion}
            setIsOpen={() => {
              setShowAddQuestion(false);
            }}
            handleCategorySelect={(i) => {
              console.log(i, "Testing");
              handleCatSelection(i);
            }}
            itemToshow={items}
            handleOnSearch={handleOnSearch}
            handleOnHover={handleOnHover}
            handleOnSelect={handleOnSelect}
            handleOnFocus={handleOnFocus}
            formatResult={formatResult}
            categories={categories}
            selectedCat={selectedCat}
            addQuestion={() => {
              handleSelectionMultiple(ques);
            }}
          /> */}
        </div>

        <div className="btn-container">
          <button
            className="question-next-btn"
            onClick={() => {
              if (location.state && location.state.copy != undefined) {
                dispatch(
                  createSurvey({
                    account_uuid: location.state.account_uuid
                      ? location.state.account_uuid
                      : "4587a5bd-3bac-40aa-bfd7-938604ae3a83",
                    name: location.state.name,
                    description: location.state.description,
                    suggestion_enabled: "0",
                    suggestion_type: "text",
                    featured: "0",
                    points: "0",
                    questions: location.state.questions,
                    status: "pending",
                  })
                ).then((response) => {
                  console.log(response);
                  history.push("/ChildQuestionLayout");
                });
              } else {
                dispatch(updateSurvey("pending")).then((response) => {
                  console.log(response);
                  history.push("/ChildQuestionLayout");
                });
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
