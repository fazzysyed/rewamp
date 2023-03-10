import React, { useEffect, useState } from "react";
import "./WorkingCard.css";

import { useDispatch, useSelector } from "react-redux";
import Paginate from "react-paginate";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import Placeholder from "../../Assets/Images/placeholder.png";
import { useHistory } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import ReactReadMoreReadLess from "react-read-more-read-less";

import {
  changeSurveyUuid,
  getAllSurveys,
  updateSurvey,
} from "../../store/actions/actions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { USER_UUID } from "../../constants/User_uuid";
export default function SurveyCardAllAvaiable() {
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.Reducer.surveys);
  const accounts = useSelector((state) => state.Reducer.accounts);
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(0);
  const questionsPerPage = 10;
  const pagesVisited = pageNumber * questionsPerPage;
  const pageCount = Math.ceil(
    surveys.filter((item) => item.status === "pending").length /
      questionsPerPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(surveys.filter((item) => item.status === "pending"));
  }, []);

  const changePage = ({ selected }) => {
    window.scrollTo(0, 0);

    setPageNumber(selected);
  };

  let filteredSurveys = surveys.filter((item) => item.status === "pending");

  const DisplayPages = filteredSurveys

    .slice(pagesVisited, pagesVisited + questionsPerPage)

    .map((item) => {
      if (item.status === "pending") {
        return (
          <div className="working-card">
            <div className="working-text-section">
              <div>
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
                <span className="working-text">{item.name}</span>
              </div>

              <span className="pending-icon">
                <GoPrimitiveDot />
              </span>
            </div>

            <div className="working-holder-divider2"></div>

            {/* <img
            className="image-placeholder"
            src={Placeholder}
            alt="Image Placeholder"
          /> */}
            <h3 className="desc-heading">Description:</h3>

            <div className="readmore-text" style={{ height: 50 }}>
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
            <div className="survey-holder-divider2"></div>

            <div className="options-text">
              <ul className="options-list">
                <li
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
                >
                  <span className="edit-option">
                    <RiPencilFill /> Edit
                  </span>
                </li>
                <li
                  onClick={() => {
                    if (
                      item.created_by === USER_UUID ||
                      accounts.some((e) => e.role_type.role_id === 8) ||
                      accounts.some((e) => e.role_type.role_id === 5) ||
                      accounts.some((e) => e.role_type.role_id === 7)
                    ) {
                      confirmAlert({
                        title: "Confirm to delete",
                        message: "Are you sure to delete this survey.",
                        buttons: [
                          {
                            label: "Yes",
                            onClick: () => {
                              console.log("You click yes!");
                              dispatch(changeSurveyUuid(item.uuid));
                              dispatch(updateSurvey("deleted"));
                              dispatch(getAllSurveys());
                            },
                          },
                          {
                            label: "No",
                            // onClick: () => alert("Click No")
                          },
                        ],
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
                >
                  <span className="del-option">
                    <FaTrash className="trash-icon" /> Delete
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    });

  const isEven = (number) => {
    // Your code goes here!
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="survey-container">
      <div className="survey-holder">
        <div className="survey-holder-header">
          <span className="survey-primary-heading">All Pending Surveys</span>
        </div>
        <div className="survey-holder-divider"></div>
        <div className="working-card-containerGrid">
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
