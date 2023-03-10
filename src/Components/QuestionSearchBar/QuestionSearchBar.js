import React, { useState } from "react";
import "./QuestionSearchBar.css";
import { BsSearch } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createQuestion } from "../../store/actions/actions";

function SearchBar({ placeholder, data, handlerClick, addQuestionHandler }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [addQuestion, setAddQuestion] = useState(false);
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    console.log(data);
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    let newFilter = data.filter((value) => {
      return value.question_text
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      if (newFilter.length === 0) {
        setFilteredData([]);

        newFilter.push({
          id: "new",
          question_text: "Click to add new Question",
        });
        setFilteredData(newFilter);
        setAddQuestion(true);
      } else {
        setFilteredData(newFilter);
        setAddQuestion(false);
      }
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="searchQuestion">
      <div className="searchInputsQuestion">
        <input
          className="seachInput2Question"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        {/* <div className="searchIcon">
          {filteredData.length === 0 ? (
            <BsSearch />
          ) : (
            <AiFillCloseCircle id="clearBtn" onClick={clearInput} />
          )}
        </div> */}
        <button
          onClick={() => {
            addQuestionHandler();
            setWordEntered("");
          }}
          className="addQuestionButtonQuestion"
        >
          Add Question +
        </button>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResultQuestion">
          {filteredData.map((value, key) => {
            return (
              <a
                className="dataItemQuestion"
                onClick={() => {
                  if (addQuestion) {
                    dispatch(
                      createQuestion({
                        question_text: wordEntered,
                        status: "active",
                      })
                    ).then((res) => {
                      console.log(res);
                      alert("Done");
                    });
                  } else {
                    setWordEntered(value.question_text);
                    setFilteredData([]);
                    handlerClick(value);
                  }
                }}
              >
                <p>{value.question_text} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
