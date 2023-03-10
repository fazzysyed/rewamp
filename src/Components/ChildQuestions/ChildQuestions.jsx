import React, { useState, useEffect } from "react";
import "./ChildQuestions.css";

import Search from "../Search/Search";
import { MdOutlineStorage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  AnswerIdGenerator,
  getAnswerIDs,
  IdGenerator,
} from "../../Helper/IdGenerator";
import {
  BsCircleFill,
  BsEmojiSmileFill,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import {
  AiTwotoneHeart,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineSortAscending,
  AiFillCheckCircle,
  AiOutlineBars,
} from "react-icons/ai";
import {
  addChildAnswer,
  addChildLink,
  addChildQuestion,
  addEmptyAnswerChild,
  changeAnswerType,
  changeChildAnswerType,
  createAnswer,
  removeAny,
  removeChildLink,
  removeChildQuestion,
  removedChildAnswer,
  updateSurvey,
} from "../../store/actions/actions";
import { useHistory } from "react-router-dom";
import SearchAnswers from "../SearchAnswers/SearchAnswers";
import { types } from "../../Helper/Data";
import SearchBar from "../QuestionSearchBar/QuestionSearchBar";
import AnswerBar from "../SearchBar/SearchBar";

export default function ChildQuestions() {
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.Reducer.questions);
  const [items, setItems] = useState([]);
  const selected = useSelector((state) => state.Reducer.selectedQuestion);
  const [createQuestion, setCreateQuestion] = useState("");
  const [data, setData] = useState([]);
  const [ques, setQues] = useState("");
  const [stateIndex, setIndex] = useState(0);
  const [childIndex, setChildIndex] = useState(0);
  const history = useHistory();
  const [answer, setAnswer] = useState("");
  const [modifiedAnswers, setModifiedAnswers] = useState([]);
  const answers = useSelector((state) => state.Reducer.answers);
  const [searchValue, setSearchValue] = useState("");
  const [searchAnswerValue, setSearchAnswerValue] = useState("");

  useEffect(() => {
    console.log(selected, "LAFKAKFAFAKAKF");
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

  const handleSelectionMultipleAnswers = async (parent, child, edit) => {
    console.log(parent, child, answer, "PARENT");
    if (parent) {
      if (child.answers.length < 4) {
        console.log("ueeeeee");
        setSearchAnswerValue("");
        addAnswer(parent, child, edit);
      }
      // if (
      //   selected[stateIndex].subquestions[childIndex].answers.some(
      //     (e) => e.id === item.id
      //   )
      // ) {
      //   console.log("Hello", item);
      //   setSearchAnswerValue("");
      //   removeAnswer(item);
      // } else {
      //   console.log("Bye", item, childIndex);
      // }
    } else {
      dispatch(
        createAnswer({
          answer: searchAnswerValue,
          status: "active",
        })
      );
    }
    console.log(selected[stateIndex]);
  };

  const addAnswer = (item, itemChild, edit) => {
    let newItem = {
      id: answer.id,
      answer_text: answer.answer,
    };
    // setChildAnswers(true);

    console.log(
      {
        parentId: item.id,

        childId: itemChild.id,
        answer_ref: edit.answer_ref,

        id: answer.id,
        answer_text: answer.answer,
      },
      itemChild,
      "TTTRRRTYUUIOIOIO"
    );
    dispatch(
      addChildAnswer({
        parentId: item.id,

        childId: itemChild.id,
        answer_ref: edit.answer_ref,

        id: answer.id,
        answer_text: answer.answer,
      })
    );
  };
  const removeAnswer = (item) => {
    dispatch(
      removedChildAnswer({
        parentId: selected[stateIndex].subquestions[childIndex],
        item: item,
        childId: item.id,
      })
    );
  };

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
  }, []);

  const handleSelectionMultiple = async (item) => {
    if (selected[stateIndex].subquestions.some((e) => e.id === item.id)) {
      data.unshift(item);
      removeChildHandler(item);
      console.log(data, "LLLB");
    } else {
      item.answers = [];
      addChildHandler(item);

      setSearchValue("");
    }

    console.log(stateIndex, "MMMM");
  };

  const handleSelectionMultipleTags = async (item, item2) => {
    console.log(item, item2, Number(item.answer_id));
    if (!item2.answer_link_id.includes(Number(item.answer_id))) {
      dispatch(
        addChildLink({
          parentId: item2.id,
          item: Number(item.answer_id),
          childId: item.id,
        })
      );
    }

    if (item2.answer_link_id.includes("any") && item.answer_id != "any") {
      console.log("Any Includes or new Value");

      dispatch(
        removeAny({
          parentId: item2.id,
          item: item.answer_id,
          childId: item.id,
        })
      );
      dispatch(
        addChildLink({
          parentId: item2.id,
          item: Number(item.answer_id),
          childId: item.id,
        })
      );
    }
    if (item.answer_id === "any") {
      console.log("value is any", item2.id, item.answer_id, item.id);
      dispatch(
        removeAny({
          parentId: item2.id,
          item: item.answer_id,
          childId: item.id,
        })
      );
      dispatch(
        addChildLink({
          parentId: item2.id,
          item: "any",
          childId: item.id,
        })
      );
    }

    if (item2.answer_link_id.includes(Number(item.answer_id))) {
      console.log("Pure Value Remove");

      dispatch(
        removeChildLink({
          parentId: item2.id,
          item: Number(item.answer_id),
          childId: item.id,
        })
      );
    }
  };

  const addChildHandler = (item) => {
    let newArray = [];

    for (let i of selected[stateIndex].questionsWithAnswers) {
      if (i.value === "any") {
        newArray.push(i.value);
      } else {
        newArray.push(Number(i.value));
      }
    }

    // item.answer_link_id = selectedArray[stateIndex].questionsWithAnswers.map(
    //   (i) => i.value !== "any" && Number(i.value)
    // );
    item.parent_question_id = selected[stateIndex].id;
    item.answer_link_id = ["any"];
    console.log(item, "StateIndex");

    dispatch(
      addChildQuestion({
        id: selected[stateIndex].id,
        item: item,
      })
    );
  };
  const removeChildHandler = (item) => {
    dispatch(
      removeChildQuestion({
        parentId: selected[stateIndex].id,
        childId: item.id,
      })
    );
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
    setSearchValue(string);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    setQues(item);
  };

  const handleOnFocus = () => {
    // console.log(itemToshow, "fAAA");

    console.log("Focused");
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

  const handleOnSelectAnswer = (item) => {
    // the item selected
    console.log(item);
    setAnswer(item);
  };

  const handleOnFocusAnswer = () => {
    console.log("Focused");
  };

  return (
    <div className="child-question-container">
      <div className="child-question-holder">
        <h1 className="question-heading">
          Step 3: <span style={{ fontWeight: "500" }}>Child Questions</span>
        </h1>
        {selected != undefined ? (
          <>
            {selected.map((item, index) => {
              let linking = IdGenerator(item.answer_type);
              return (
                <>
                  <div className="question-field">
                    <div className="question-container">
                      <div className="selected-question">
                        <div className="question-one">
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
                          {item.answer_type === "yesno" && (
                            <AiFillCheckCircle
                              className="heart-icon"
                              color="green"
                            />
                          )}

                          {item.answer_type === "hearts" && (
                            <AiTwotoneHeart
                              className="heart-icon"
                              color="red"
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

                        <p
                          className="add-answer-text"
                          onClick={() => {
                            if (stateIndex === index) {
                              setIndex(index);
                            } else {
                              setIndex(index);
                            }
                          }}
                        >
                          <AiOutlinePlus className="plus-icon" /> Add Child
                        </p>
                      </div>
                    </div>
                  </div>
                  {item.subquestions.length > 0
                    ? item.subquestions.map((itemChild, indexChild) => {
                        if (
                          itemChild.answer_type === "selectall" ||
                          itemChild.answer_type === "multiplechoice"
                        ) {
                          return (
                            <div style={{ display: "flex" }}>
                              <div className="answer-hierarchy-child"></div>
                              <div className="question-field">
                                <h3>Child Questions:</h3>
                                <div className="question-container-child">
                                  <div className="selected-question">
                                    <div className="question-one">
                                      {/* <MdOutlineStorage className="answer-icon" /> */}
                                      {itemChild.answer_type ===
                                        "selectall" && (
                                        <AiOutlineBars
                                          className="heart-icon"
                                          color="#1c3b71"
                                        />
                                      )}
                                      {itemChild.answer_type ===
                                        "multiplechoice" && (
                                        <AiOutlineBars
                                          className="heart-icon"
                                          color="#1c3b71"
                                        />
                                      )}
                                      <p className="question-text">
                                        {itemChild.question_text}
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      margin: 3,
                                    }}
                                  >
                                    <select
                                      className="survey-type-select"
                                      value={itemChild.answer_type}
                                      onChange={(event) => {
                                        dispatch(
                                          changeChildAnswerType({
                                            parentId: item.id,
                                            answer_type: event.target.value,
                                            childId: itemChild.id,
                                          })
                                        );
                                      }}
                                    >
                                      <option disabled value={""}>
                                        select
                                      </option>
                                      {types.map((item) => (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="answer-type-child">
                                    <p>Which answers trigger this question?</p>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <div className="answer-trigger">
                                        {item.questionsWithAnswers ? (
                                          <>
                                            {item.questionsWithAnswers.map(
                                              (i) => (
                                                <p
                                                  style={{
                                                    backgroundColor:
                                                      itemChild.answer_link_id.includes(
                                                        i.answer_id === "any"
                                                          ? i.answer_id
                                                          : Number(i.answer_id)
                                                      )
                                                        ? "#3d6ab8"
                                                        : "white",
                                                    color:
                                                      itemChild.answer_link_id.includes(
                                                        i.answer_id === "any"
                                                          ? i.answer_id
                                                          : Number(i.answer_id)
                                                      )
                                                        ? "white"
                                                        : "#3d6ab8",
                                                  }}
                                                  onClick={() => {
                                                    handleSelectionMultipleTags(
                                                      i,
                                                      itemChild
                                                    );
                                                  }}
                                                >
                                                  {i.answer_text}
                                                </p>
                                              )
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {getAnswerIDs(item.answer_type).map(
                                              (i) => (
                                                <p
                                                  style={{
                                                    backgroundColor:
                                                      itemChild.answer_link_id.includes(
                                                        i.answer_id === "any"
                                                          ? i.answer_id
                                                          : Number(i.answer_id)
                                                      )
                                                        ? "#3d6ab8"
                                                        : "white",
                                                    color:
                                                      itemChild.answer_link_id.includes(
                                                        i.answer_id === "any"
                                                          ? i.answer_id
                                                          : Number(i.answer_id)
                                                      )
                                                        ? "white"
                                                        : "#3d6ab8",
                                                  }}
                                                  onClick={() => {
                                                    handleSelectionMultipleTags(
                                                      i,
                                                      itemChild
                                                    );
                                                  }}
                                                >
                                                  {i.answer_text}
                                                </p>
                                              )
                                            )}
                                          </>
                                        )}
                                      </div>
                                      {itemChild.answers.length != 4 ? (
                                        <p
                                          className="add-answer-text"
                                          onClick={() => {
                                            dispatch(
                                              addEmptyAnswerChild({
                                                parentId: item.id,
                                                childId: itemChild.id,
                                              })
                                            );
                                          }}
                                        >
                                          <AiOutlinePlus className="plus-icon" />{" "}
                                          Add Answers
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                {/* <div style={{ display: "flex", width: "100%" }}>
                                  {childIndex === indexChild &&
                                  itemChild.answers.length != 4 ? (
                                    <>
                                      <div className="answer-hierarchy"></div>
                                      <div className="type-answer-section">
                                        <SearchAnswers
                                          search={searchAnswerValue}
                                          items={modifiedAnswers}
                                          handleOnFocus={handleOnFocusAnswer}
                                          handleOnSearch={handleOnSearchAnswer}
                                          handleOnSelect={handleOnSelectAnswer}
                                          addAnswer={() => {
                                            handleSelectionMultipleAnswers(
                                              answer
                                            );
                                          }}
                                        />
                                      </div>
                                    </>
                                  ) : null}
                                </div> */}
                                {itemChild.answers.length > 0
                                  ? itemChild.answers.map((i) => {
                                      console.log(i, "SSSSS");
                                      return (
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
                                                <p className="new-answer">
                                                  Answer:
                                                </p>
                                                <input
                                                  // disabled
                                                  className="answer-input"
                                                  type="text"
                                                  placeholder="Type your answer"
                                                  value={i.answer_text}
                                                />
                                              </div>
                                            </div>
                                          ) : (
                                            <AnswerBar
                                              handlerClick={(value) => {
                                                setAnswer(value);
                                              }}
                                              data={answers}
                                              addAnswerHandler={() => {
                                                handleSelectionMultipleAnswers(
                                                  item,
                                                  itemChild,
                                                  i
                                                );
                                              }}
                                            />
                                            // <div className="type-answer-section">
                                            //   <SearchAnswers
                                            //     search={searchAnswerValue}
                                            //     items={modifiedAnswers}
                                            //     handleOnFocus={
                                            //       handleOnFocusAnswer
                                            //     }
                                            //     handleOnSearch={
                                            //       handleOnSearchAnswer
                                            //     }
                                            //     handleOnSelect={
                                            //       handleOnSelectAnswer
                                            //     }
                                            //     addAnswer={() => {

                                            //     }}
                                            //   />
                                            // </div>
                                          )}
                                        </div>
                                      );
                                    })
                                  : null}
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div style={{ display: "flex" }}>
                              <div className="answer-hierarchy-child"></div>
                              <div className="question-field">
                                <h3>Child Questions:</h3>
                                <div className="question-container-child">
                                  <div className="selected-question">
                                    <div className="question-one">
                                      {itemChild.answer_type === "hearts" && (
                                        <AiTwotoneHeart
                                          className="heart-icon"
                                          color="red"
                                        />
                                      )}
                                      {itemChild.answer_type ===
                                        "selectall" && (
                                        <AiOutlineBars
                                          className="heart-icon"
                                          color="#1c3b71"
                                        />
                                      )}
                                      {itemChild.answer_type ===
                                        "multiplechoice" && (
                                        <AiOutlineBars
                                          className="heart-icon"
                                          color="#1c3b71"
                                        />
                                      )}
                                      {itemChild.answer_type === "yesno" && (
                                        <AiFillCheckCircle
                                          className="heart-icon"
                                          color="green"
                                        />
                                      )}

                                      {itemChild.answer_type === "stars" && (
                                        <AiFillStar
                                          className="heart-icon"
                                          color="#FFD700"
                                        />
                                      )}
                                      {itemChild.answer_type === "likert" && (
                                        <AiOutlineSortAscending
                                          className="heart-icon"
                                          color="#1c3b71"
                                        />
                                      )}
                                      {itemChild.answer_type === "faces" && (
                                        <BsEmojiSmileFill
                                          className="heart-icon"
                                          color="#FFD700"
                                        />
                                      )}
                                      {itemChild.answer_type === "thumbs" && (
                                        <BsHandThumbsUpFill
                                          className="heart-icon"
                                          color="#FFD700"
                                        />
                                      )}
                                      {itemChild.answer_type === "" && (
                                        <BsCircleFill className="answer-icon" />
                                      )}
                                      <p className="question-text">
                                        {item.question_text}
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      margin: 3,
                                    }}
                                  >
                                    <select
                                      className="survey-type-select"
                                      value={itemChild.answer_type}
                                      onChange={(event) => {
                                        dispatch(
                                          changeChildAnswerType({
                                            parentId: item.id,
                                            answer_type: event.target.value,
                                            childId: itemChild.id,
                                          })
                                        );
                                      }}
                                    >
                                      <option value={""} disabled>
                                        select
                                      </option>
                                      {types.map((item) => (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="answer-type-child">
                                    <p>Which answers trigger this question?</p>
                                    <div className="answer-trigger">
                                      {item.questionsWithAnswers ? (
                                        <>
                                          {item.questionsWithAnswers.map(
                                            (i) => (
                                              <p
                                                style={{
                                                  backgroundColor:
                                                    itemChild.answer_link_id.includes(
                                                      i.answer_id === "any"
                                                        ? i.answer_id
                                                        : Number(i.answer_id)
                                                    )
                                                      ? "#3d6ab8"
                                                      : "white",
                                                  color:
                                                    itemChild.answer_link_id.includes(
                                                      i.answer_id === "any"
                                                        ? i.answer_id
                                                        : Number(i.answer_id)
                                                    )
                                                      ? "white"
                                                      : "#3d6ab8",
                                                }}
                                                onClick={() => {
                                                  handleSelectionMultipleTags(
                                                    i,
                                                    itemChild
                                                  );
                                                }}
                                              >
                                                {i.answer_text}
                                              </p>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {getAnswerIDs(item.answer_type).map(
                                            (i) => (
                                              <p
                                                style={{
                                                  backgroundColor:
                                                    itemChild.answer_link_id.includes(
                                                      i.answer_id === "any"
                                                        ? i.answer_id
                                                        : Number(i.answer_id)
                                                    )
                                                      ? "#3d6ab8"
                                                      : "white",
                                                  color:
                                                    itemChild.answer_link_id.includes(
                                                      i.answer_id === "any"
                                                        ? i.answer_id
                                                        : Number(i.answer_id)
                                                    )
                                                      ? "white"
                                                      : "#3d6ab8",
                                                }}
                                                onClick={() => {
                                                  handleSelectionMultipleTags(
                                                    i,
                                                    itemChild
                                                  );
                                                }}
                                              >
                                                {i.answer_text}
                                              </p>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })
                    : null}
                  {stateIndex === index ? (
                    <SearchBar
                      data={questions}
                      handlerClick={(value) => {
                        setQues(value);
                      }}
                      addQuestionHandler={() => {
                        handleSelectionMultiple(ques);
                      }}
                    />
                  ) : // <Search
                  //   search={searchValue}
                  //   handleOnFocus={handleOnFocus}
                  //   itemToshow={items}
                  //   handleOnSearch={handleOnSearch}
                  //   handleOnHover={handleOnHover}
                  //   handleOnSelect={handleOnSelect}
                  //   addQuestion={() =>}
                  // />

                  null}
                </>
              );
            })}
          </>
        ) : null}

        {/* <div style={{ display: "flex" }}>
          <div className="answer-hierarchy-child2"></div>
          <div className="question-field-child">
            <div className="question-container-child">
              <div className="selected-question">
                <div className="question-one">
                  <AiTwotoneHeart className="heart-icon" />
                  <p className="question-text">
                    Vel fringilla est ullamcorper eget nulla facilisi etiam
                    dignissim dia?
                  </p>
                </div>
              </div>
              <div className="answer-type-child">
                <p>Which answers trigger this question?</p>
                <div className="answer-trigger">
                  <p className="option1">Ipsum</p>
                  <p>Lorem</p>
                  <p>Lorem</p>
                  <p>Lorem</p>
                  <p>Lorem</p>
                  <p>Lorem</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="child-btn-container">
          <button
            className="question-prev-btn"
            onClick={() => history.goBack()}
          >
            Previous
          </button>
          <button
            className="question-next-btn"
            onClick={() => {
              dispatch(updateSurvey("pending")).then((response) => {
                console.log(response);
                history.push("/SurveyPreview");
              });
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
