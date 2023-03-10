import { AnswerIdGenerator, getAnswerIDs } from "../../Helper/IdGenerator";
import {
  ACTIVE_ROUTE,
  ADD_ANSWER,
  ADD_ASNWERS,
  ADD_CHILD_ANSWER,
  ADD_CHILD_QUESTION,
  ADD_QUESTION,
  CREATE_SURVEY_TEMPLATE,
  GETID,
  GET_ACCOUNTS,
  GET_ANSWERS,
  GET_QUESTIONS,
  LOAD,
  PUBLISH_SURVEY,
  REMOVE_ANSWER,
  REMOVE_CHILD_ANSWER,
  REMOVE_CHILD_QUESTION,
  REMOVE_QUESTION,
  SELECT_ACCOUNT,
  SURVEY_TEMPLATE,
  UPDATE_QUESTION,
  MESSAGE,
  LINK,
  UNLINK,
  REMOVEALL,
  DE_SELECT_ACCOUNT,
  GET_CAT,
  ADD_ANY,
  ACCOUNT_ANSWERS,
  ACCOUNT_QUESTIONS,
  COMPANIES,
  REORDER,
  REORDER_SUB,
  REORDER_ANSWER,
  CHILD_ANSWER_REORDER,
  CHANGE_ANSWERTYPE,
  CHANGE_CHILDANSWERTYPE,
  CREATE_SURVEY,
  GET_ALL_SURVEYS,
  CHANGE_SELECTED_QUESTION,
  CHANGE_SURVEY_UUID,
  SELECTED_ACCOUNT,
  ADD_EMPTY_ANSWER,
  ADD_EMPTY_ANSWER_CHILD,
  CHANGE_LINKING,
} from "../actions/actionTypes";

const initialState = {
  accounts: [],
  questions: [],
  answers: [],
  selectedQuestion: [],
  surveyTemplate: {},
  publishedSurvey: {},
  activeRoute: "/",
  selectedAccounts: [],
  templateId: "",
  loading: true,
  message: "Survey in Progress",
  categories: [],
  companies: [],
  surveyUUID: "",
  oldRoute: "/",
  surveys: [],
  selectedAccount: [],
};

const Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(payload, "PPPPPPP");
  switch (type) {
    case ACTIVE_ROUTE:
      return {
        ...state,
        activeRoute: payload,
      };
    case CHANGE_SURVEY_UUID:
      return {
        ...state,
        surveyUUID: payload,
      };
    case CHANGE_SELECTED_QUESTION:
      return {
        ...state,
        selectedQuestion: payload,
      };
    case SELECTED_ACCOUNT:
      return {
        ...state,
        selectedAccount: payload,
      };
    case GET_ALL_SURVEYS:
      return {
        ...state,
        surveys: payload,
      };
    case CREATE_SURVEY:
      return {
        ...state,
        surveyUUID: payload,
      };
    case ACCOUNT_QUESTIONS:
      return {
        ...state,
        questions: payload,
      };
    case ACCOUNT_ANSWERS:
      return {
        ...state,
        answers: payload,
      };
    case MESSAGE:
      return {
        ...state,
        message: payload,
      };
    case CREATE_SURVEY_TEMPLATE:
      return {
        ...state,
        surveyTemplate: payload.data,
        message: payload.msg,
      };

    case PUBLISH_SURVEY:
      return {
        ...state,
        publishedSurvey: payload,
      };

    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: payload,
      };
    case COMPANIES:
      return {
        ...state,
        companies: payload,
      };
    case GET_CAT:
      return {
        ...state,
        categories: payload,
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: payload,
      };
    case LOAD:
      return {
        ...state,
        loading: payload,
      };
    case GET_ANSWERS:
      return {
        ...state,
        answers: payload,
      };

    case ADD_QUESTION:
      return {
        ...state,
        selectedQuestion: state.selectedQuestion.concat(payload),
      };
    case REORDER:
      return {
        ...state,
        selectedQuestion: payload,
      };
    case SELECT_ACCOUNT:
      return {
        ...state,
        selectedAccounts: state.selectedAccounts.concat(payload),
      };
    case DE_SELECT_ACCOUNT:
      return {
        ...state,

        selectedAccounts: state.selectedAccounts.filter(
          (ques) => ques !== payload
        ),
      };
    case GETID:
      return {
        ...state,
        templateId: payload,
      };

    case REMOVE_QUESTION:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.filter(
          (ques) => ques.id !== payload
        ),
      };

    case UPDATE_QUESTION:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload ? { ...ques, hasChild: !ques.hasChild } : ques
        ),
      };

    case CHANGE_CHILDANSWERTYPE:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) => {
          let answer_body = getAnswerIDs(
            payload.answer_type === "selectall" ||
              payload.answer_type === "multiplechoice"
              ? ques.answers
              : payload.answer_type
          );

          let newArray = [
            {
              id: 0,
              answer_text: "",
              answer_ref: AnswerIdGenerator(),
            },
            {
              id: 1,
              answer_text: "",
              answer_ref: AnswerIdGenerator(),
            },
          ];
          return 1 === 1
            ? {
                ...ques,
                subquestions: ques.subquestions.map((item) =>
                  item.parent_question_id === payload.parentId &&
                  item.id === payload.childId
                    ? {
                        ...item,
                        answer_type: payload.answer_type,
                        answers: newArray,
                        questionsWithAnswers: answer_body,
                      }
                    : item
                ),
              }
            : ques;
        }),
      };
    case CHANGE_ANSWERTYPE:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) => {
          let answer_body =
            payload.answer_type === "selectall" ||
            payload.answer_type === "multiplechoice"
              ? []
              : getAnswerIDs(
                  payload.answer_type === "selectall" ||
                    payload.answer_type === "multiplechoice"
                    ? ques.answers
                    : payload.answer_type
                );

          let newArray = [
            {
              id: 0,
              answer_text: "",
              answer_ref: AnswerIdGenerator(),
            },
            {
              id: 1,
              answer_text: "",
              answer_ref: AnswerIdGenerator(),
            },
          ];
          for (let i of answer_body) {
            if (i.answer_id != "any") {
              newArray.push(i);
            }
          }

          return ques.id === payload.id
            ? {
                ...ques,
                answer_type: payload.answer_type,
                answers: newArray,
                questionsWithAnswers: answer_body,
              }
            : ques;
        }),
      };

    case ADD_EMPTY_ANSWER:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) => {
          let newArray = ques.answers;

          console.log(newArray, "FAJFJAFJAJFAJFJ");
          return ques.id === payload.id
            ? {
                ...ques,

                answers: ques.answers.concat({
                  id: ques.answers.length - 1,
                  answer_text: "",
                  answer_ref: AnswerIdGenerator(),
                }),
              }
            : ques;
        }),
      };

    case ADD_CHILD_QUESTION:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload.id
            ? { ...ques, subquestions: ques.subquestions.concat(payload.item) }
            : ques
        ),
      };
    case REORDER_SUB:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload.id
            ? { ...ques, subquestions: payload.item }
            : ques
        ),
      };
    case REMOVE_CHILD_QUESTION:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload.parentId
            ? {
                ...ques,
                subquestions: ques.subquestions.filter(
                  (ques) => ques.id !== payload.childId
                ),
              }
            : ques
        ),
      };
    case ADD_ANSWER:
      return {
        ...state,
        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload.parentId
            ? {
                ...ques,
                answers: ques.answers.map((item) =>
                  item.answer_ref === payload.answer_ref
                    ? {
                        ...item,
                        answer_text: payload.answer_text,
                        id: payload.id,
                      }
                    : item
                ),
              }
            : ques
        ),
      };
    case CHANGE_LINKING:
      return {
        ...state,
        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload.parentId
            ? {
                ...ques,
                questionsWithAnswers: payload.data,
              }
            : ques
        ),
      };
    case REORDER_ANSWER:
      return {
        ...state,
        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload.id ? { ...ques, answers: payload.item } : ques
        ),
      };
    case REMOVE_ANSWER:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload.parentId
            ? {
                ...ques,
                answers: ques.answers.filter(
                  (ques) => ques.id !== payload.childId
                ),
              }
            : ques
        ),
      };
    case CHILD_ANSWER_REORDER:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map(
          (ques) =>
            1 === 1 && {
              ...ques,
              subquestions: ques.subquestions.map((item) =>
                item.id === payload.parentId
                  ? {
                      ...item,
                      answers: payload.items,
                    }
                  : item
              ),
            }
        ),
      };
    case ADD_CHILD_ANSWER:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload.parentId
            ? {
                ...ques,
                subquestions: ques.subquestions.map((item) =>
                  item.id === payload.childId
                    ? {
                        ...item,
                        answers: item.answers.map((items) =>
                          items.answer_ref === payload.answer_ref
                            ? {
                                ...items,
                                answer_text: payload.answer_text,
                                id: payload.id,
                              }
                            : items
                        ),
                      }
                    : item
                ),
              }
            : ques
        ),
      };
    case ADD_EMPTY_ANSWER_CHILD:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          ques.id === payload.parentId
            ? {
                ...ques,
                subquestions: ques.subquestions.map((item) =>
                  item.id === payload.childId
                    ? {
                        ...item,
                        answers: item.answers.concat({
                          id: item.answers.length - 1,
                          answer_text: "",
                          answer_ref: AnswerIdGenerator(),
                        }),
                      }
                    : item
                ),
              }
            : ques
        ),
      };
    case UNLINK:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          1 === 1
            ? {
                ...ques,

                subquestions: ques.subquestions.map((item) =>
                  item.id === payload.parentId
                    ? {
                        ...item,
                        answer_link_id: item.answer_link_id.filter(
                          (quess) => quess !== payload.item
                        ),
                      }
                    : item
                ),
              }
            : ques
        ),
      };
    case LINK:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          1 === 1
            ? {
                ...ques,
                subquestions: ques.subquestions.map((item) =>
                  item.id === payload.parentId
                    ? {
                        ...item,

                        answer_link_id: item.answer_link_id.concat(
                          payload.item
                        ),
                      }
                    : item
                ),
              }
            : ques
        ),
      };

    case REMOVEALL:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          1 === 1
            ? {
                ...ques,
                subquestions: ques.subquestions.map((item) =>
                  item.id === payload.parentId
                    ? {
                        ...item,

                        answer_link_id: [],
                      }
                    : item
                ),
              }
            : ques
        ),
      };

    case REMOVE_CHILD_ANSWER:
      return {
        ...state,

        selectedQuestion: state.selectedQuestion.map((ques) =>
          1 === 1
            ? {
                ...ques,

                subquestions: ques.subquestions.map((item) =>
                  item.id === payload.parentId
                    ? {
                        ...item,
                        answers: item.answers.filter(
                          (quess) => quess.id !== payload.childId
                        ),
                      }
                    : item
                ),
              }
            : ques
        ),
      };
    default:
      return state;
  }
};

export default Reducer;
