import React from "react";
import "./SurveyCard.css";
import { GoPrimitiveDot } from "react-icons/go";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { IoDocumentText } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { AiFillCopy } from "react-icons/ai";

import { BsFillEyeFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GetCategory } from "../../Helper/GetCategory";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { USER_UUID } from "../../constants/User_uuid";
export default function SurveyCard() {
  const surveys = useSelector((state) => state.Reducer.surveys);
  const history = useHistory();
  const categories = useSelector((state) => state.Reducer.categories);
  const accounts = useSelector((state) => state.Reducer.accounts);

  const activeSurveys = surveys.filter(
    (item) => item.status === "active" || item.status === "inactive"
  );

  console.log(activeSurveys, "LLLLLLLL");
  return (
    <>
      <div className="survey-card-container">
        {activeSurveys.slice(0, 4).map((item) => {
          return (
            <div className="survey-card">
              <div className="card-rating">
                <span className="rating-text">{item.name}</span>
                <span className="active-icon">
                  <GoPrimitiveDot
                    color={item.status === "active" ? "#3af252" : "#ffcc00"}
                  />
                </span>
              </div>
              <div className="survey-holder-divider2"></div>

              <h3 className="desc-heading">Description:</h3>

              <div className="readmore-text">
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

              {item.categories != undefined &&
              item.categories != null &&
              item.categories.length ? (
                <>
                  <h3 className="tags-heading">Categories</h3>

                  <div className="selected-tag">
                    {item.categories.map((item) => (
                      <p className="tag-text">
                        {GetCategory(categories, item.id)}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="tags-heading">Categories</h3>
                  <div className="selected-tag">
                    <p className="tag-text">not found</p>
                  </div>
                </>
              )}

              <div className="survey-holder-divider3"></div>

              <div className="card-footer">
                <ul className="icons-list">
                  <li>
                    <span style={{ color: "#3D6AB8" }}>
                      <AiFillCopy
                        onClick={() => {
                          history.push({
                            pathname: "CreateSurvey",
                            state: {
                              survey: item,
                              copy: true,
                            },
                          });
                        }}
                      />
                    </span>
                  </li>
                  <li>
                    <RiPencilFill
                      onClick={() => {
                        if (
                          item.created_by === USER_UUID ||
                          accounts.some((e) => e.role_type.role_id === 8) ||
                          accounts.some((e) => e.role_type.role_id === 5) ||
                          accounts.some((e) => e.role_type.role_id === 7)
                        ) {
                          history.push({
                            pathname: "CreateSurvey",
                            state: {
                              survey: item,
                              copy: false,
                            },
                          });
                        } else {
                          confirmAlert({
                            title: "Alert",
                            message:
                              "You dont have the permission to edit this survey",
                            buttons: [
                              {
                                label: "Okay",
                                onClick: () => {},
                              },
                            ],
                          });
                        }
                      }}
                    />
                  </li>
                  <li>
                    <BsFillEyeFill
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
                    />
                  </li>
                </ul>
                <p
                  className="details-btn"
                  onClick={() => {
                    history.push({
                      pathname: "SeeDetails",
                      state: item,
                    });
                  }}
                >
                  See Details
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
