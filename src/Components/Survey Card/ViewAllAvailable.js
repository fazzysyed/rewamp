import React, { useState, useEffect } from "react";
import "./SurveyCard.css";
import { GoPrimitiveDot } from "react-icons/go";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { IoDocumentText } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import Paginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { AiFillCopy } from "react-icons/ai";
import { GetCategory } from "../../Helper/GetCategory";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { USER_UUID } from "../../constants/User_uuid";
export default function SurveyCardAllAvaiable() {
  const surveys = useSelector((state) => state.Reducer.surveys);
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(0);
  const accounts = useSelector((state) => state.Reducer.accounts);

  const questionsPerPage = 10;
  const pagesVisited = pageNumber * questionsPerPage;
  const categories = useSelector((state) => state.Reducer.categories);
  const pageCount = Math.ceil(
    surveys.filter((item) => item.status === "active").length / questionsPerPage
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isEven = (number) => {
    // Your code goes here!
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };

  let filteredSurveys = surveys.filter(
    (item) => item.status === "active" || item.status === "inactive"
  );

  const changePage = ({ selected }) => {
    window.scrollTo(0, 0);

    setPageNumber(selected);
  };
  const DisplayPages = filteredSurveys

    .slice(pagesVisited, pagesVisited + questionsPerPage)

    .map((item, index) => {
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
            {/* <ReactReadMoreReadLess
              charLimit={100}
              readMoreText={"Read more"}
              readLessText={"Read less"}
              readMoreClassName="read-more-less--more"
              readLessClassName="read-more-less--less"
            > */}
            {item.description}
            {/* </ReactReadMoreReadLess> */}
          </div>

          {item.categories != undefined &&
          item.categories != null &&
          item.categories.length ? (
            <>
              <h3 className="tags-heading">Categories</h3>

              <div className="selected-tag">
                {item.categories.map((item) => (
                  <p className="tag-text">{GetCategory(categories, item.id)}</p>
                ))}
              </div>
            </>
          ) : null}

          <div className="survey-holder-divider3"></div>

          <div className="card-footer">
            <ul className="icons-list">
              <li>
                <span style={{ color: "#3D6AB8" }}>
                  <AiFillCopy
                    onClick={() => {
                      history.push({
                        pathname: "AddQuestions",
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
              onClick={() => {
                history.push({
                  pathname: "SeeDetails",
                  state: item,
                });
              }}
              className="details-btn"
            >
              See Details
            </p>
          </div>
        </div>
      );
    });

  return (
    <div className="survey-container">
      <div className="survey-holder">
        <div className="survey-holder-header">
          <span className="survey-primary-heading">All Available Surveys</span>
        </div>
        <div className="survey-holder-divider"></div>
        <div className="survey-card-containerGrid ">
          {DisplayPages}
          {/* {isEven(pageCount) ? null : <div style={{ height: 220 }}></div>} */}
        </div>

        <Paginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns col-md-9"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}
