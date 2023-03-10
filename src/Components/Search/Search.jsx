import React from "react";
import "./Search.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Thumb from "../../Assets/Images/thumb.png";
import Heart from "../../Assets/Images/heart.png";
import Star from "../../Assets/Images/star.png";
import { useSelector } from "react-redux";

import Popup from "../Popup/Popup";

function Search({
  itemToshow,
  handleOnFocus,
  handleOnHover,
  handleOnSearch,
  handleOnSelect,
  addQuestion,
  isOpen,
  setIsOpen,
  categories,
  handleCategorySelect,
  selectedCat,
  types,
  status,
  search,
}) {
  const formatResult = (item) => {
    console.log(item, "AAAAA");
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img style={{ marginRight: "1.5rem" }} src={item.icon} />
          <span className="suggestion-text">{item.question_text}</span>
        </div>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: "100%", marginTop: "5rem", position: "relative" }}>
          <ReactSearchAutocomplete
            inputSearchString={search}
            items={itemToshow}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            showNoResultsText={"Click Add Question to add a new question"}
            styling={{}}
          />
          <button onClick={addQuestion} className="add-search-btn">
            Add Question +
          </button>
        </div>
      </header>
      {isOpen && (
        <Popup
          handleClose={setIsOpen}
          content={
            <>
              <h1 className="question-heading">
                <span style={{ fontWeight: "500" }}>Let's Create Question</span>
              </h1>
              <div className="question-field">
                <h3>Select Categories:</h3>
              </div>
              <div
                style={{
                  display: "flex",

                  width: "100%",
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                {categories.map((item) => (
                  <p
                    onClick={() => {
                      handleCategorySelect(item);
                    }}
                    className="tag-text-createCategories"
                    style={{
                      background: selectedCat.includes(item.id)
                        ? "#3d6ab8"
                        : "#fff",
                      color: selectedCat.includes(item.id) ? "#fff" : "#3d6ab8",
                    }}
                  >
                    {item.name}
                  </p>
                ))}
              </div>

              <div className="survey-name-field">
                <div className="question-field">
                  <h3>Select Type:</h3>
                </div>
                <select
                  className="survey-account-select"
                  style={{ width: "100%", marginTop: 10 }}
                >
                  {types.map((item) => (
                    <option style={{ fontSize: 20 }} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="survey-name-field">
                <div className="question-field">
                  <h3>Status:</h3>
                </div>
                <select
                  className="survey-account-select"
                  style={{ width: "100%", marginTop: 10 }}
                >
                  {status.map((item) => (
                    <option style={{ fontSize: 20 }} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="btn-container-search">
                <button className="question-next-btn">Create</button>
              </div>
            </>
          }
        />
      )}
    </div>
  );
}

export default Search;
