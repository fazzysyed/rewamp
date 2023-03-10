import React from "react";
import "./CreateSurveyCard.css";
import { HiTemplate } from "react-icons/hi";
import { BsFillEyeFill } from "react-icons/bs";
import Placeholder from "../../Assets/Images/placeholder.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import ReactReadMoreReadLess from "react-read-more-read-less";

export default function CreateSurveyCard() {
  const history = useHistory();
  const surveys = useSelector((state) => state.Reducer.surveys);

  const activeSurveys = surveys.filter(
    (item) =>
      item.status != "deleted" ||
      item.account_id === null ||
      item.account_uuid === null ||
      item.account_id === 0
  );
  return (
    <>
      <div className="create-surveycard-container">
        {activeSurveys.slice(0, 3).map((item) => (
          <div className="create-surveycard">
            {/* <img
              className="image-placeholder2"
              src={Placeholder}
              alt="Image Placeholder"
            /> */}

            <div className="create-text-section">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="22"
                viewBox="0 0 24 22"
              >
                <g id="icon" transform="translate(-147 -400)">
                  <rect
                    id="Rectangle_27"
                    data-name="Rectangle 27"
                    width="24"
                    height="22"
                    transform="translate(147 400)"
                    fill="#cecece"
                  />
                  <path
                    id="chart-column-solid"
                    d="M1,32a1,1,0,0,1,1,1V43.5a.5.5,0,0,0,.5.5H15a1,1,0,0,1,0,2H2.5A2.5,2.5,0,0,1,0,43.5V33A1,1,0,0,1,1,32Zm4,6a1,1,0,0,1,1,1v2a1,1,0,0,1-2,0V39A1,1,0,0,1,5,38Zm4,3a1,1,0,0,1-2,0V36a1,1,0,1,1,2,0Zm2-4a1,1,0,0,1,1,1v3a1,1,0,0,1-2,0V38A1,1,0,0,1,11,37Zm4,4a1,1,0,0,1-2,0V34a1,1,0,0,1,2,0Z"
                    transform="translate(151 372)"
                    fill="#1c3b71"
                  />
                </g>
              </svg> */}
              <span className="create-text">{item.name}</span>
            </div>

            <div className="divider-padd">
              <div className="add-survey-divider"></div>

              <h3 className="desc-heading">Description:</h3>

              <div
                className="readmore-text"
                style={{ height: 50, marginBottom: 40 }}
              >
                <ReactReadMoreReadLess
                  charLimit={100}
                  readMoreText={"Read more"}
                  readLessText={"Read less"}
                  readMoreClassName="read-more-less--more"
                  readLessClassName="read-more-less--less"
                >
                  {item.description}
                </ReactReadMoreReadLess>
              </div>
              <div className="add-survey-divider"></div>

              <div>
                <ul className="preview-list">
                  <li
                    onClick={() => {
                      history.push({
                        pathname: "CreateSurvey",
                        state: {
                          survey: item,
                          copy: true,
                        },
                      });
                    }}
                  >
                    <HiTemplate className="temp-icon" /> Use Template
                  </li>
                  <li
                    onClick={() => {
                      if (item.questions) {
                        history.push({
                          pathname: "LiveSurveyPreview",
                          state: item,
                        });
                      } else {
                        alert("This Survey has no questions");
                      }
                    }}
                  >
                    <span className="preview-icon">
                      <BsFillEyeFill className="temp-icon" /> Preview
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
