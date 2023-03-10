import React, { useState, useEffect } from "react";
import "../Survey Card/SurveyCard.css";
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
import { HiTemplate } from "react-icons/hi";

export default function SurveyCardAllAvaiable() {
  const surveys = useSelector((state) => state.Reducer.surveys);
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(0);
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

  let filteredSurveys = surveys.filter((item) => item.status === "deleted");

  const changePage = ({ selected }) => {
    window.scrollTo(0, 0);

    setPageNumber(selected);
  };
  const DisplayPages = filteredSurveys

    .slice(pagesVisited, pagesVisited + questionsPerPage)

    .map((item, index) => {
      return (
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
      );
    });

  return (
    <div className="survey-container">
      <div className="survey-holder">
        <div className="survey-holder-header">
          <span className="survey-primary-heading">All Surveys</span>
        </div>
        <div className="survey-holder-divider"></div>
        <div
          className="survey-card-containerGrid"
          style={{ gridTemplateColumns: "auto auto auto auto" }}
        >
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
