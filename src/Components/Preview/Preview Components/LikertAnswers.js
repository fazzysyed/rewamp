import React, { useState } from "react";
import Likert from "./Likert";
import { LikertAnswerTypes } from "../Preview Helper/AnswersType";

const LikertsAnswers = ({ answerTypes, onPress, value, minimize }) => {
  const [selected, setSelected] = useState(value);
  const handleSelection = (item) => {
    // console.log(item);
    var selectedId = selected;

    if (selectedId === item.id) setSelected(item.id);
    else setSelected(item.id);
    onPress(item);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {LikertAnswerTypes.map((item, index) => {
        return (
          // <div>
          //   <Likert
          //     minimize={minimize}
          //     text={item.answer}
          //     image={selected === item.id ? item.selected : item.un}
          //     onPress={() => {
          //       handleSelection(item);
          //     }}
          //   />
          // </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            key={item.id}
            onClick={() => {
              handleSelection(item);
            }}
          >
            <div>
              <p
                className={
                  minimize ? "best-stars-tabPreview" : "best-starsPreview"
                }
                style={{
                  color: "#122838",
                  height: 40,
                  marginTop: 10,
                  fontSize: 12,

                  marginRight: minimize ? 0 : 10,
                  textAlign: "center",
                }}
              >
                {item.answer}
              </p>
              <img
                className={
                  minimize ? "stars-image-tabPreview" : "stars-imagePreview"
                }
                resizeMode="contain"
                src={item.id === selected ? item.selected : item.un}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LikertsAnswers;
