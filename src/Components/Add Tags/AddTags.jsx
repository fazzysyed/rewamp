import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./AddTags.css";
import { Tag, X } from "react-feather";

function AddTags() {
  const [tags, setTags] = useState(["Lorem Ipsum", "Lorem Ipsum"]);

  return (
    <div className="App">
      <div className="Form">
      <ul className="TagList">
          {tags.map(tag => (
            <li className="Tag">
              {tag}
              {/* <X
                className="TagIcon"
                size="16"
                onClick={() => {
                  setTags([...tags.filter(word => word !== tag)]);
                }}
              /> */}
            </li>
          ))}
        </ul>
        <div className="TagForm">
          <input
            type="text"
            placeholder="Add a tag..."
            onKeyPress={event => {
              if (event.key === "Enter") {
                setTags([...tags, event.target.value]);
                event.target.value = "";
              }
            }}
            autofocus
            
          />
                    <button className="tag-add-btn">Add</button>

        </div>
        
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AddTags />, rootElement);

export default AddTags;