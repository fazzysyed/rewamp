import React from "react";
import "./SearchAnswers.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Thumb from "../../Assets/Images/thumb.png";
import Heart from "../../Assets/Images/heart.png";
import Star from "../../Assets/Images/star.png";

function SearchAnswers({
  items,
  handleOnSearch,
  handleOnHover,
  handleOnFocus,
  handleOnSelect,
  addAnswer,
  search,
}) {
  const formatResult = (item) => {
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
    <div className="App">
      <div
        className="type-answer-section2-search"
        style={{
          display: "flex",
          padding: "1.1rem 3rem",
          // justifyContent: "space-between",
          alignItems: "center",
          height: "8vh",

          // padding: 10,
        }}
      >
        <p className="new-answer" style={{}}>
          Answer:
        </p>

        <div
          style={{
            width: "80%",
            borderBottom: "1px solid #d8d8d8",
          }}
        >
          <ReactSearchAutocomplete
            showClear={false}
            placeholder="Type your Answer"
            inputSearchString={search}
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{
              border: "0px",

              height: "50px",
              // placeholderColor: "#3d6ab8",
              width: "100%",
              borderRadius: "2px",
              boxShadow: "rgba(32, 33, 36, 0.28) 0px 0px 0px 0px",
            }}
            showNoResultsText={"Click Add Answer to add a new answer"}
          />
        </div>

        <button onClick={addAnswer} className="add-search-btnS">
          Add Answer +
        </button>
      </div>
    </div>
  );
}

export default SearchAnswers;
