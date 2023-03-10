export const IdGenerator = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const AnswerIdGenerator = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const questionCreator = (question) => {
  let questionlet;
  questionlet = {
    question_ref: question.ques_ref,
    question_id: question.id,

    order_by: question.order_by,
    answer_id_link: question.answer_id_link,
    parent_question_id: question.parent_question_id,
    parent_ref: question.parent_ref,
    answers: question.answers,
  };
  return questionlet;
};
export const getAnswerIDs = (answer_type, answers) => {
  var answer_body = [];
  switch (answer_type) {
    case "faces":
      answer_body.push(
        { answer_text: "Any", answer_id: "any" },

        { answer_text: "happy", answer_id: "3" },
        { answer_text: "okay", answer_id: "2" },
        { answer_text: "poor", answer_id: "1" }
      );
      break;

    case "yesno":
      answer_body.push(
        { answer_text: "Any", answer_id: "any" },

        { answer_text: "yes", answer_id: "7" },
        { answer_text: "maybe", answer_id: "8" },
        { answer_text: "no", answer_id: "9" }
      );
      break;

    case "thumbs":
      answer_body.push(
        { answer_text: "Any", answer_id: "any" },

        { answer_text: "thumbs up", answer_id: "4" },
        { answer_text: "okay", answer_id: "5" },
        {
          answer_text: "thumbs down",
          answer_id: "6",
        }
      );
      break;

    case "stars":
      answer_body.push(
        { answer_text: "Any", answer_id: "any" },
        { answer_text: "1 star", answer_id: "10" },
        { answer_text: "2 stars", answer_id: "11" },
        { answer_text: "3 stars", answer_id: "12" },
        { answer_text: "4 stars", answer_id: "13" },

        { answer_text: "5 stars", answer_id: "14" }
      );
      break;

    case "hearts":
      answer_body.push(
        { answer_text: "Any", answer_id: "any" },

        { answer_text: "1 heart", answer_id: "15" },
        { answer_text: "2 hearts", answer_id: "16" },
        { answer_text: "3 hearts", answer_id: "17" },
        { answer_text: "4 hearts", answer_id: "18" },

        { answer_text: "5 hearts", answer_id: "19" }
      );
      break;

    case "likert":
      answer_body.push(
        { answer_text: "Strongly Agree", answer_id: "24" },
        { answer_text: "Agree", answer_id: "23" },
        {
          answer_text: "Neither Agree or Disagree",
          answer_id: "22",
        },
        { answer_text: "Disagree", answer_id: "21" },
        { answer_text: "Strongly Disagree", answer_id: "20" }
      );
      break;

    case "multiplechoice":
      answers.map((item, index) => {
        answer_body.push({
          answer_text: item.answer_text,
          answer_id: item.id,
        });
      });
      break;

    case "selectall":
      answer_body.push({ answer_text: "Any", answer_id: "any" });
      console.log("FAzzy is right");
      answers.map((item, index) => {
        answer_body.push({
          answer_text: item.answer_text,
          answer_id: item.id,
        });
      });
      break;

    case "suggestion":
      break;

    case "type":
      break;
  }
  console.log(answer_body, "BBBBBB");
  return answer_body;
};
