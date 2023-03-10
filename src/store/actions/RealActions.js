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
} from "./actionTypes";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { getAccounts } from "../../Services/Api";
import { BASE_URL } from "../../Services/Url";
import {
  AnswerIdGenerator,
  questionCreator,
  getAnswerIDs,
} from "../../Helper/IdGenerator";
import { push } from "connected-react-router";

const Bearer = `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NlcnZpY2VzLmNlbnN1YmxlLmNvbS9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTY0NTA0MTk1OCwiZXhwIjoxNjc2NTc3OTU4LCJuYmYiOjE2NDUwNDE5NTgsImp0aSI6Ikx3REFyNVVVeVpMZGhmclgiLCJzdWIiOjUsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.B2kSzjom0mpuObGf9DfBP8LyXtMYZajL25KmlW7dp9lIbfPGU4rpHtTNiKC3x5KznFP7c6KL32Dp-X-HY7ESyosRWb1GGmCIKp9H8BNpi22JsN1wDsQM9B2KlnDaqj6X6y-WoSa5O35b8RXgQTRWh9MizS5AmE4cLcIsJQRhHz9ahNbd4xb3TEcGxci14USkevp1F_OpPJTZBqwI7jyvkkPrUSZyrggQMwccO8v71V8ybYDBoRHx5rSJ61oV3JIl_HzbFFlN5iYCnerHBurYP_RgHHtm1eylm6lxBdbyc6kvwHVASQWF8BhjeH-xKuggR_BRRsq5dps9oNAuF-fFNLdwYSnmI2eBJWyXDIGqfOazXlhPszeHR0pLKQyYLT3vFzn9zO0v7ewp1io0mp_hMnz_TnLnzkzHr6EvJNCh8vRCYO0rnRi23f3rNc7fW0dqmfmLEm8KscvSeIxXNbD6Upc5Mj5ro33rs0YEseOKmNFpBRfUkZxGblcydbSDudKJdCSK2P0alYJysa2_fI9u6H96c2AKGOWG-Ks5y97xC25vbiDwyg0oxDozqQ-rPQ1QSLWc73EbOkgy7YqjGzPoQfsa0IG0CmVSeO8w9DDsAR1w7tUebJmFmhhv1l9p89lnLFF6p61L7Y4a2HNUFC5Qlzs3V229V3wc9bhTlsgKd0o"}`;

// const Bearer = `Bearer ${window.BearerToken}`;
export const getAllAccounts = (data) => async (dispatch) => {
  try {
    var data2 = JSON.stringify({
      request: {
        endpoint: "account",
        method: "get",
      },
      payload: {},
    });

    var config = {
      method: "post",
      url: "https://admin.censuble.com/services/middle.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data2,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.data.data, "Accounts");
        dispatch({
          type: GET_ACCOUNTS,
          payload: response.data.data.data.accounts,
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
export const getAllCompanies = (data) => async (dispatch) => {
  var data2 = JSON.stringify({
    request: {
      endpoint: "company",
      method: "get",
    },
    payload: {},
  });

  var config = {
    method: "post",
    url: "https://admin.censuble.com/services/middle.php",
    headers: {
      "Content-Type": "application/json",
    },
    data: data2,
  };

  axios(config)
    .then((response) => {
      console.log(response, "Categories");
      dispatch({
        type: COMPANIES,
        payload: response.data.data.data.companies,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getAllCategories = (data) => async (dispatch) => {
  var data2 = JSON.stringify({
    request: {
      endpoint: "category",
      method: "get",
    },
    payload: {},
  });

  var config = {
    method: "post",
    url: "https://admin.censuble.com/services/middle.php",
    headers: {
      "Content-Type": "application/json",
    },
    data: data2,
  };

  axios(config)
    .then((response) => {
      console.log(response, "Categories");
      dispatch({
        type: GET_CAT,
        payload: response.data.data.data.categories,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getAllQuestions = () => async (dispatch) => {
  var axios = require("axios");
  var data = "";

  var data2 = JSON.stringify({
    request: {
      endpoint: "question",
      method: "get",
    },
    payload: {},
  });

  var config = {
    method: "post",
    url: "https://admin.censuble.com/services/middle.php",
    headers: {
      "Content-Type": "application/json",
    },
    data: data2,
  };

  axios(config)
    .then(function (response) {
      console.log(response, "Questions");
      let newArray = [];
      let linkArray = [];
      response.data.data.data.questions.map((item) => {
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

          newArray.push(item);
        } else {
          // item.questionsWithAnswers = getAnswerIDs(item.answer_type);
          console.log(getAnswerIDs(item.answer_type), "Restttt");
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
  var data2 = JSON.stringify({
    request: {
      endpoint: "answer",
      method: "get",
    },
    payload: {},
  });

  var config = {
    method: "post",
    url: "https://admin.censuble.com/services/middle.php",
    headers: {
      "Content-Type": "application/json",
    },
    data: data2,
  };

  axios(config)
    .then((response) => {
      console.log(response, "Test");
      dispatch({
        type: GET_ANSWERS,
        payload: response.data.data.data.answers,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const createAnswer = (datatosend) => async (dispatch) => {
  var data = JSON.stringify(datatosend);

  var data2 = JSON.stringify({
    request: {
      endpoint: "answer",
      method: "post",
    },
    payload: data,
  });

  var config = {
    method: "post",
    url: "https://admin.censuble.com/services/middle.php",
    headers: {
      "Content-Type": "application/json",
    },
    data: data2,
  };

  axios(config)
    .then(function (response) {
      dispatch({
        type: CREATE_ANSWER,
        payload: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const createQuestion = (datatosend) => async (dispatch) => {
  var data = JSON.stringify(datatosend);

  var data2 = JSON.stringify({
    request: {
      endpoint: "question",
      method: "post",
    },
    payload: data,
  });

  var config = {
    method: "post",
    url: "https://admin.censuble.com/services/middle.php",
    headers: {
      "Content-Type": "application/json",
    },
    data: data2,
  };

  axios(config)
    .then(function (response) {
      dispatch({
        type: CREATE_QUESTION,
        payload: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addQuestion = (question) => async (dispatch) => {
  console.log(question, "question");
  dispatch({
    type: ADD_QUESTION,
    payload: question,
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

export const createSurveyTemplate =
  (selectedArray, templateUuid, route, oldRoute) => async (dispatch) => {
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

    var data2 = JSON.stringify({
      request: {
        endpoint: `survey-template/${templateUid}`,
        method: "get",
      },
      payload: {
        templateUid,
      },
    });

    var configtemp = {
      method: "post",
      url: "https://admin.censuble.com/services/middle.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data2,
    };

    axios(configtemp)
      .then((response) => {
        console.log(response.data.data, "Res");
        template = response.data.data.data.survey.payload;
        template.questions = questionArray;

        let newTemp = {
          payload: template,
        };

        var data2 = JSON.stringify({
          request: {
            endpoint: `survey-template/${templateUid}`,
            method: "put",
          },
          payload: newTemp,
        });

        var config = {
          method: "post",
          url: "https://admin.censuble.com/services/middle.php",
          headers: {
            "Content-Type": "application/json",
          },
          data: data2,
        };

        axios(config)
          .then(function (response) {
            console.log(response, "Testing Response");
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
        dispatch({
          type: CREATE_SURVEY_TEMPLATE,
          payload: {
            data: {},
            msg: "Error",
          },
        });
      });
  };

export const publishSurveyTemplate =
  (payload, acc, route) => async (dispatch) => {
    console.log(payload.data.data, "Hello Fazzy");

    if (payload.data.data.survey != null) {
      let uuid = payload.data.data.survey.uuid;
      console.log(uuid, "TTTT");

      var data2 = JSON.stringify({
        request: {
          endpoint: `publish/${uuid}`,
          method: "post",
        },
        payload: {
          account_uuid: acc,
        },
      });

      var config = {
        method: "post",
        url: "https://admin.censuble.com/services/middle.php",
        headers: {
          "Content-Type": "application/json",
        },
        data: data2,
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
    payload: {
      newRoute: payload.newRoute,
      oldRoute: payload.oldRoute,
    },
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
