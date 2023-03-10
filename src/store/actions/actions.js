import {
  GET_ACCOUNTS,
  GET_ANSWERS,
  GET_QUESTIONS,
  ADD_QUESTION,
  CREATE_QUESTION,
  REMOVE_QUESTION,
  UPDATE_QUESTION,
  ADD_CHILD_QUESTION,
  REMOVE_CHILD_QUESTION,
  ADD_ASNWERS,
  ADD_ANSWER,
  REMOVE_ANSWER,
  ADD_CHILD_ANSWER,
  REMOVE_CHILD_ANSWER,
  SURVEY_TEMPLATE,
  ACTIVE_ROUTE,
  PUBLISH_SURVEY,
  CREATE_SURVEY_TEMPLATE,
  SELECT_ACCOUNT,
  GETID,
  LOAD,
  MESSAGE,
  LINK,
  UNLINK,
  REMOVEALL,
  DE_SELECT_ACCOUNT,
  GET_CAT,
  CREATE_ANSWER,
  ADD_ANY,
  ACCOUNT_ANSWERS,
  ACCOUNT_QUESTIONS,
  COMPANIES,
  REORDER,
  REORDER_SUB,
  REORDER_ANSWER,
  CHILD_ANSWER_REORDER,
  CREATE_SURVEY,
  CHANGE_ANSWERTYPE,
  CHANGE_CHILDANSWERTYPE,
  GET_ALL_SURVEYS,
  UPDATE_SURVEY,
  CHANGE_SELECTED_QUESTION,
  CHANGE_SURVEY_UUID,
  SELECTED_ACCOUNT,
  ADD_EMPTY_ANSWER,
  ADD_EMPTY_ANSWER_CHILD,
  CHANGE_LINKING,
} from "./actionTypes";
import axios from "axios";
import { useHistory } from "react-router-dom";
import store from "../store";
import {
  AnswerIdGenerator,
  questionCreator,
  getAnswerIDs,
} from "../../Helper/IdGenerator";
import { account_list } from "../../constants/Account";
// import { push } from "connected-react-router";

const Bearer = `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NzAwMDNjNS1iOTQ2LTQxYmMtODc5OS05MTMyOGI1ODdkMTciLCJqdGkiOiI0MDBmYjk5OTRiYmQyYjgxNDZhMGY1ZjI3MjAxOTM0MDk3OGRmMDA3ZTA4ZDIzM2QyNzk5ODRmMDIwOTM3YWFjZTIwYmYyM2M3NGM2NWI0MyIsImlhdCI6MTY2MjU4MDQyMi43NTA0ODA4OTAyNzQwNDc4NTE1NjI1LCJuYmYiOjE2NjI1ODA0MjIuNzUwNDgyMDgyMzY2OTQzMzU5Mzc1LCJleHAiOjE2OTQxMTY0MjIuNzM1MjE0OTQ4NjU0MTc0ODA0Njg3NSwic3ViIjoiNSIsInNjb3BlcyI6W119.ePdUlDEMRamTvXuCBhiufVv8NeVUVMUoxIUjiG-z6472P4pjTnUsoTRsQIqRzTjTBgjz2mjTh01If7f_mYizKyjXdLfYtsgqUT2ZVq8_4v012A7LN68p1BJnOyG4C0SKiUzpRtpVxaOPnqOmWdtC9gEQIAvAxUq-IKZWCMx5SBmW5pNng3EHBR0vgeWno2x_1W2H3za0U31eUAVNnMcq7CbsUQIUVzyep98qepJcfcBwh3Jl364guqKJLtJ8317AcMxflsUBsVZb-qHJsLAqrM6lvOIXy86k1nzVN_6d8IPOGXlNJ73WsoM8N2zlDAult3QFh_GU-yF985u4YwLFt9qp_Ij3EC5uGLFcPiWNsXOWUAnmWWctUTUZ1NpZF_GwyBgFlack1ipsmCTSIkC6i9IKQJ7p3Q048EjiXy_F_f5waaldVJLOp5hrv-oSv2rNbGeIabtFRgscgErmg4o_KttwKYuXrd6DH0rTZ1_fIlh6G2sge6GNlGk_tql_065-zwU8GMylGcpfIM0TUGYk9IxBCdS9XkSkC5ly1A-p8ClJKXtTzeIT4GtSYwAJBiDBkZsjaA9G7wLvhBMqQ1bozItqqtr5z37XuBbslUaNtZvzaIDodQInfFJpkHNeEdLvcz7C6CRdTuOC2qDSZtII59ML-hveiPBssH0An8BrHcs"}`;

// const Bearer = `Bearer ${window.BearerToken}`;
export const getAllAccounts = (data) => async (dispatch) => {
  // try {
  //   var config = {
  //     method: "get",
  //     url: "https://services.censubledev.com/api/v1/account",
  //     headers: {
  //       Authorization: Bearer,
  //       "Content-Type": "application/json",
  //     },
  //     data: "",
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(response.data, "Accounts");
  //       dispatch({
  //         type: GET_ACCOUNTS,
  //         payload: response.data.data.accounts,
  //       });
  //       dispatch({
  //         type: LOAD,
  //         payload: false,
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // } catch (err) {
  //   console.log(err);
  // }

  dispatch({
    type: GET_ACCOUNTS,
    payload: account_list,
  });
};
export const getAllSurveys = (data) => async (dispatch) => {
  try {
    var config = {
      method: "get",
      url: "https://services.censubledev.com/api/v1/survey",
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "Surveysss");
        dispatch({
          type: GET_ALL_SURVEYS,
          payload: response.data.data.surveys,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};
export const getAllCompanies = (data) => async (dispatch) => {
  try {
    var config = {
      method: "get",
      url: "https://services.censubledev.com/api/v1/company",
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
      },
      data: "",
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "Accounts");
        dispatch({
          type: COMPANIES,
          payload: response.data.data.companies,
        });
        dispatch({
          type: LOAD,
          payload: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

export const getAllCategories = (data) => async (dispatch) => {
  var config = {
    method: "get",
    url: "https://services.censubledev.com/api/v1/category",
    headers: {
      Authorization: Bearer,
      "Content-Type": "application/json",
    },
    data: "",
  };

  axios(config)
    .then((response) => {
      console.log(response, "Categories");
      dispatch({
        type: GET_CAT,
        payload: response.data.data.categories,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getAllQuestions = (payload) => async (dispatch, getState) => {
  var config = {
    method: "get",
    url: `https://services.censubledev.com/api/v1/question?filters[account_uuid][]=${payload}&filters[account_uuid][]=0`,
    headers: {
      Authorization: Bearer,

      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(response, "Questions");
      let newArray = [];
      let linkArray = [];
      response.data.data.questions.map((item) => {
        // item.questionsWithAnswers = []

        if (
          item.answer_type === "selectall" ||
          item.answer_type === "multiplechoice"
        ) {
          // item.questionsWithAnswers = [
          //   { answer: "Any", value: "any", icon: "any" },

          //   { answer: "Service / Hospitality", value: "1", icon: "" },
          //   { answer: "Menu Selection", value: "2", icon: "" },
          //   { answer: "Food Temperature", value: "3", icon: "" },
          //   { answer: "Food Taste", value: "4", icon: "" },
          // ];
          item.categories = null;
          item.answer_type = "";
          newArray.push(item);
        } else {
          // item.questionsWithAnswers = getAnswerIDs(item.answer_type);
          item.categories = null;
          item.answer_type = "";
          newArray.push(item);
        }
      });
      dispatch({
        type: GET_QUESTIONS,
        payload: newArray,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getAllAnswers = () => async (dispatch) => {
  var config = {
    method: "get",
    url: "https://services.censubledev.com/api/v1/answer",
    headers: {
      Authorization: Bearer,

      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then((response) => {
      console.log(response, "Test");
      let newArray = [];
      response.data.data.answers.map((item) => {
        if (
          item.account_uuid === null ||
          item.account_uuid === store.getState().Reducer.SELECTED_ACCOUNT
        ) {
          newArray.push(item);
        }
      });
      dispatch({
        type: GET_ANSWERS,
        payload: newArray,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const createAnswer = (datatosend) => async (dispatch, getState) => {
  dispatch(setLoading(false));
  var data = JSON.stringify(datatosend);

  var config = {
    method: "post",
    url: "https://services.censubledev.com/api/v1/answer",
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      dispatch({
        type: CREATE_ANSWER,
        payload: response.data,
      });
      dispatch(getAllAnswers(""));
      dispatch(setLoading(false));
    })

    .catch(function (error) {
      console.log(error);
      dispatch(setLoading(false));
    });
};

export const createSurvey = (datatosend) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify(datatosend);

    var config = {
      method: "post",
      url: "https://services.censubledev.com/api/v1/survey",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch({
          type: CREATE_SURVEY,
          payload: response.data.survey_uuid,
        });

        resolve(response.data);
      })

      .catch(function (error) {
        reject(error);
        console.log(error);
      });
  });
};
export const updateSurvey = (payload) => async (dispatch) => {
  let questiontomodify = store.getState().Reducer.selectedQuestion;

  let newArray = [];

  questiontomodify.map((item) => {
    console.log(item, "Check Fazzy");
    if (
      item.answer_type === "selectall" ||
      item.answer_type === "multiplechoice"
    ) {
      let itemGenerator = getAnswerIDs("selectall", item.answers);
      dispatch(
        changeLinking({
          parentId: item.id,
          data: itemGenerator,
        })
      );
      console.log(itemGenerator, "FFEERERE");
    }
  });
  console.log(
    questiontomodify,

    "FGALJASLFJASLFJAFSL"
  );
  return new Promise((resolve, reject) => {
    // var data = JSON.stringify(datatosend);
    alert("AAA");
    var configtoGet = {
      method: "get",
      url: `https://services.censubledev.com/api/v1/survey/${
        store.getState().Reducer.surveyUUID
      }`,
      headers: {
        // "Content-Type": "application/json",
        Authorization: Bearer,
      },
      data: "data",
    };
    axios(configtoGet)
      .then((response) => {
        console.log(
          response.data.data.survey,
          "LLLLLLLLLLL",
          store.getState().Reducer.selectedQuestion
        );
        let survey = response.data.data.survey;
        survey.status = payload;
        console.log(survey, "PendingAAAAA", payload);
        // let questions = store.getState().Reducer.selectedQuestion;

        survey.questions = questiontomodify;

        var config = {
          method: "put",
          url: `https://services.censubledev.com/api/v1/survey/${response.data.data.survey.uuid}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: Bearer,
          },
          data: JSON.stringify(survey),
        };

        axios(config)
          .then(function (response) {
            dispatch({
              type: UPDATE_SURVEY,
              payload: response.data.survey_uuid,
            });

            resolve(response.data);
          })

          .catch(function (error) {
            reject(error);
            console.log(error);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

export const createQuestion = (datatosend) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  console.log(getState(), "AFARRRRTR");
  new Promise((resolve, reject) => {
    var data = JSON.stringify(datatosend);
    console.log(data, "FFFFFFFFFF");

    var config = {
      method: "post",
      url: "https://services.censubledev.com/api/v1/question",
      headers: {
        Authorization: Bearer,

        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        resolve(response.data);
        dispatch({
          type: CREATE_QUESTION,
          payload: response.data,
        });
        dispatch(getAllQuestions(getState().Reducer.selectedAccount));
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setLoading(false));

        reject(error);
      });
  });
};

export const addQuestion = (question) => async (dispatch) => {
  console.log(question, "question");
  dispatch({
    type: ADD_QUESTION,
    payload: question,
  });
};
export const changeSelectedQuestions = (question) => async (dispatch) => {
  console.log(question, "question");
  dispatch({
    type: CHANGE_SELECTED_QUESTION,
    payload: question,
  });
};
export const changeLinking = (question) => async (dispatch) => {
  dispatch({
    type: CHANGE_LINKING,
    payload: question,
  });
};
export const changeSurveyUuid = (question) => async (dispatch) => {
  console.log(question, "question");
  dispatch({
    type: CHANGE_SURVEY_UUID,
    payload: question,
  });
};

export const changeAnswerType = (payload) => async (dispatch) => {
  dispatch({
    type: CHANGE_ANSWERTYPE,
    payload: payload,
  });
};
export const addEmptyAnswer = (payload) => async (dispatch) => {
  dispatch({
    type: ADD_EMPTY_ANSWER,
    payload: payload,
  });
};
export const addEmptyAnswerChild = (payload) => async (dispatch) => {
  dispatch({
    type: ADD_EMPTY_ANSWER_CHILD,
    payload: payload,
  });
};
export const changeChildAnswerType = (payload) => async (dispatch) => {
  dispatch({
    type: CHANGE_CHILDANSWERTYPE,
    payload: payload,
  });
};
export const reOrder = (array) => async (dispatch) => {
  // console.log(questin, "question");
  dispatch({
    type: REORDER,
    payload: array,
  });
};
export const reOrderSub = (array) => async (dispatch) => {
  // console.log(questin, "question");
  dispatch({
    type: REORDER_SUB,
    payload: array,
  });
};
export const reOrderSubAnswer = (array) => async (dispatch) => {
  // console.log(questin, "question");
  dispatch({
    type: CHILD_ANSWER_REORDER,
    payload: array,
  });
};
export const reOrderAnswers = (array) => async (dispatch) => {
  // console.log(questin, "question");
  dispatch({
    type: REORDER_ANSWER,
    payload: array,
  });
};
export const accountQuestions = (question) => async (dispatch) => {
  // console.log(question, "question");
  dispatch({
    type: ACCOUNT_QUESTIONS,
    payload: question,
  });
};
export const accountAnswers = (question) => async (dispatch) => {
  // console.log(question, "question");
  dispatch({
    type: ACCOUNT_ANSWERS,
    payload: question,
  });
};

export const getLoading = (payload) => async (dispatch) => {
  dispatch({
    type: LOAD,
    payload: payload,
  });
};
export const setLoading = (payload) => async (dispatch) => {
  dispatch({
    type: LOAD,
    payload: payload,
  });
};
export const selectAccount = (account) => async (dispatch) => {
  dispatch({
    type: SELECT_ACCOUNT,
    payload: account,
  });
};
export const deSelectAccount = (account) => async (dispatch) => {
  dispatch({
    type: DE_SELECT_ACCOUNT,
    payload: account,
  });
};

export const RemoveQuestion = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_QUESTION,
    payload: id,
  });
};

export const UpdateQuestion = (question) => async (dispatch) => {
  dispatch({
    type: UPDATE_QUESTION,
    payload: question,
  });
};

export const getId = (id) => async (dispatch) => {
  dispatch({
    type: GETID,
    payload: id,
  });
};

export const addChildQuestion = (question) => async (dispatch) => {
  console.log(question, "question Add child");
  dispatch({
    type: ADD_CHILD_QUESTION,
    payload: question,
  });
};
export const removeChildQuestion = (question) => async (dispatch) => {
  dispatch({
    type: REMOVE_CHILD_QUESTION,
    payload: question,
  });
};

export const addAnswerParent = (answer) => async (dispatch) => {
  console.log(answer, "question");

  dispatch({
    type: ADD_ANSWER,
    payload: answer,
  });
};

export const removeAnswerParent = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_ANSWER,
    payload: id,
  });
};

export const addChildAnswer = (question) => async (dispatch) => {
  console.log(question, "question");
  dispatch({
    type: ADD_CHILD_ANSWER,
    payload: question,
  });
};
export const addChildLink = (question) => async (dispatch) => {
  console.log(question, "question");
  dispatch({
    type: LINK,
    payload: question,
  });
};
export const addChildLinkAny = (question) => async (dispatch) => {
  console.log(question, "question");
  dispatch({
    type: ADD_ANY,
    payload: question,
  });
};
export const removeAny = (question) => async (dispatch) => {
  dispatch({
    type: REMOVEALL,
    payload: question,
  });
};
export const removeChildLink = (question) => async (dispatch) => {
  dispatch({
    type: UNLINK,
    payload: question,
  });
};
export const removedChildAnswer = (question) => async (dispatch) => {
  console.log(question, "question");
  dispatch({
    type: REMOVE_CHILD_ANSWER,
    payload: question,
  });
};

export const updateMessage = (message) => async (dispatch) => {
  dispatch({
    type: MESSAGE,
    payload: message,
  });
};
export const selectedAccount = (message) => async (dispatch) => {
  dispatch({
    type: SELECTED_ACCOUNT,
    payload: message,
  });
};
export const createSurveyTemplate =
  (selectedArray, templateUuid, route, oldRoute) => async (dispatch) => {
    return new Promise((resolve, reject) => {
      console.log("CAlled", selectedArray, templateUuid, route, oldRoute);
      let newArray = [];
      let subArray = [];
      let questionArray = [];
      let template = {};
      selectedArray.map((item) => {
        dispatch({
          type: CREATE_SURVEY_TEMPLATE,
          payload: {
            data: {},
            msg: "Saving...",
          },
        });
        let defaultAnswer = [];
        let newAnswers = [];
        let forChild = [];

        if (
          item.answer_type === "multiplechoice" ||
          item.answer_type === "selectall"
        ) {
          newAnswers = getAnswerIDs(item.answer_type, item.answers);
          newAnswers.map((iteme) => {
            if (iteme.value === "any") {
            } else {
              defaultAnswer.push({
                // answer: iteme.answer,
                id: iteme.value,
                answer_ref: AnswerIdGenerator(),
              });
            }
          });
        } else {
          newAnswers = getAnswerIDs(item.answer_type);
          newAnswers.map((iteme) => {
            console.log(iteme, "Hello fazzy");
            if (iteme.value === "any") {
            } else {
              defaultAnswer.push({
                // answer: iteme.answer,
                id: iteme.value,
                answer_ref: AnswerIdGenerator(),
              });
            }
          });
        }
        forChild = defaultAnswer;
        let newParentQuestion = {
          ques_ref: item.question_ref,
          id: item.id,
          order_by: "1",
          answer_id_link: "0",
          parent_question_id: "0",
          answers: defaultAnswer,
        };
        console.log(defaultAnswer, "LLLLCCCC", forChild);

        newArray.push(questionCreator(newParentQuestion));
        if (item.subQuestions != undefined && item.subQuestions != null) {
          console.log("Hello item.subQuestions", item.subQuestions);
          for (let i of item.subQuestions) {
            console.log(i.answer_link_id, "GFRRRR");
            let defaultAnswer2 = [];
            let newAnswers = [];

            if (
              i.answer_type === "multiplechoice" ||
              i.answer_type === "selectall"
            ) {
              newAnswers = getAnswerIDs(i.answer_type, i.answers);
              newAnswers.map((iteme) => {
                if (iteme.value === "any") {
                } else {
                  defaultAnswer2.push({
                    // answer: iteme.answer,
                    id: iteme.value,
                    answer_ref: AnswerIdGenerator(),
                  });
                }
              });
            } else {
              newAnswers = getAnswerIDs(i.answer_type);
              console.log(newAnswers, "dddddd");

              newAnswers.map((iteme) => {
                if (iteme.value === "any") {
                } else {
                  defaultAnswer2.push({
                    // answer: iteme.answer,
                    id: iteme.value,
                    answer_ref: AnswerIdGenerator(),
                  });
                }
              });
            }

            let newTest = [];

            forChild.map((you) => {
              for (let hello of i.answer_link_id) {
                console.log("Youtube", you, hello);

                if (hello === "any") {
                  newTest.push(you.answer_ref);
                } else {
                  console.log("FAceBook", hello === Number(you.id));

                  if (hello === Number(you.id)) {
                    newTest.push(you.answer_ref);
                  }
                }
              }
            });
            console.log("FAceBook", newTest);

            let newQuestion = {
              ques_ref: i.question_ref,
              id: i.id,
              order_by: "1",
              parent_ref: i.parent_ref,
              answer_id_link: newTest,
              parent_question_id: i.parent_question_id,
              answers: defaultAnswer2,
            };
            console.log("WWWWWWWW", defaultAnswer2, defaultAnswer);

            subArray.push(questionCreator(newQuestion));
          }
        }
        questionArray = newArray.concat(subArray);
      });
      let templateUid = templateUuid;

      var configtemp = {
        method: "get",
        url: `https://services.censubledev.com/api/v1/survey-template/${templateUuid}`,
        headers: {
          Authorization: Bearer,
          "Content-Type": "application/json",
        },
      };

      axios(configtemp)
        .then((response) => {
          console.log(response.data.data, "PUTTIN");
          template = response.data.data.survey.payload;
          template.questions = questionArray;

          let newTemp = {
            payload: template,
          };

          var config = {
            method: "put",
            url: `https://services.censubledev.com/api/v1/survey-template/${templateUuid}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: Bearer,
            },
            data: newTemp,
          };

          axios(config)
            .then(function (response) {
              console.log(response, "Testing Response");
              resolve(response);
              dispatch({
                type: CREATE_SURVEY_TEMPLATE,
                payload: {
                  data: response.data,
                  msg: "Saved",
                },
              });
              dispatch({
                type: ACTIVE_ROUTE,
                payload: {
                  newRoute: `/${route}`,
                  oldRoute: `${oldRoute}`,
                },
              });
              // browserHistory.push("/publish");

              setTimeout(() => {
                dispatch({
                  type: CREATE_SURVEY_TEMPLATE,
                  payload: {
                    data: response.data,
                    msg: "Survey in Progress",
                  },
                });
              }, 3000);
            })

            .catch(function (error) {
              reject(error);

              dispatch({
                type: CREATE_SURVEY_TEMPLATE,
                payload: {
                  data: {},
                  msg: "Error",
                },
              });
              console.log(error);
            });
        })
        .catch(function (error) {
          reject(error);
          dispatch({
            type: CREATE_SURVEY_TEMPLATE,
            payload: {
              data: {},
              msg: "Error",
            },
          });
        });
    });
  };

export const publishSurveyTemplate =
  (payload, acc, route) => async (dispatch) => {
    console.log(payload.data.data, "Hello Fazzy");

    if (payload.data.survey != null) {
      let uuid = payload.data.survey.uuid;
      console.log(uuid, "TTTT", acc);

      var config = {
        Authorization: Bearer,

        method: "post",
        url: `https://services.censubledev.com/api/v1/publish/${uuid}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer,
        },
        data: {
          account_uuid: acc,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(response);
          dispatch({
            type: PUBLISH_SURVEY,
            payload: response,
          });
          dispatch({
            type: CREATE_SURVEY_TEMPLATE,
            payload: {
              data: {},
              msg: "Survey Published",
            },
          });
          // dispatch(push(route));
          dispatch({
            type: ACTIVE_ROUTE,
            payload: {
              newRoute: `/${route}`,
              oldRoute: route,
            },
          });
          localStorage.clear();

          console.log("SSSSSSSS", response);
          // alert("Survey Created", response.data.survey_uuid);
        })
        .catch(function (error) {
          dispatch({
            type: CREATE_SURVEY_TEMPLATE,
            payload: {
              data: {},
              msg: "Something went wrong",
            },
          });
          console.log(error);
        });
    } else {
      dispatch({
        type: CREATE_SURVEY_TEMPLATE,
        payload: {
          data: {},
          msg: "template id is null.",
        },
      });
    }
  };
export const activeRouteHandler = (payload) => async (dispatch) => {
  dispatch({
    type: ACTIVE_ROUTE,
    payload: payload,
  });
};
