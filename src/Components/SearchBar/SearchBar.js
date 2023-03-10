import React, { useState } from "react";
import "./SearchBar.css";
import { BsSearch } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { createAnswer } from "../../store/actions/actions";
import { useDispatch } from "react-redux";

function SearchBar({ placeholder, data, handlerClick, addAnswerHandler }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [addAnswer, setAddAnswer] = useState(false);
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.answer.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      if (newFilter.length === 0) {
        setFilteredData([]);

        newFilter.push({
          id: "new",
          answer: "Click to add new Answer",
        });
        setFilteredData(newFilter);
        setAddAnswer(true);
      } else {
        setFilteredData(newFilter);
        setAddAnswer(false);
      }
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <p className="new-answer">Answer:</p>
        <input
          className="seachInput2"
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
            addAnswerHandler();
            setWordEntered("");
          }}
          className="addQuestionButton"
        >
          Add Answer +
        </button>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                className="dataItem"
                onClick={() => {
                  if (addAnswer) {
                    dispatch(
                      createAnswer({
                        answer: wordEntered,
                        status: "active",
                      })
                    );
                  } else {
                    setWordEntered(value.answer);
                    setFilteredData([]);
                    handlerClick(value);
                  }
                }}
              >
                <p>{value.answer} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
